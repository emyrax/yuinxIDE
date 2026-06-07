import { useEffect, useRef } from 'react';
import { ref, push, query, orderByChild, equalTo, get, runTransaction } from 'firebase/database';
import { db } from '../lib/firebase';
import { setCount } from '../lib/countUtils';
import {
  parseForm,
  validateForm,
  clearFields,
  markField,
  setFormStatus,
  classifyError,
  resetSubmitButton,
  withTimeout,
  FIREBASE_TIMEOUT_MS,
} from '../lib/formUtils';

export function useWaitlistForm(): void {
  const submitting = useRef(false);

  useEffect(() => {
    const forms = Array.from(
      document.querySelectorAll<HTMLFormElement>('[data-waitlist-form]')
    );
    if (forms.length === 0) return;

    const form = forms[0];

    const handleInput = () => {
      setFormStatus(form, '');
      clearFields(form);
    };
    form.addEventListener('input', handleInput);

    const handleSubmit = async (event: Event) => {
      event.preventDefault();
      if (submitting.current) return;

      setFormStatus(form, '');
      clearFields(form);

      const submitBtn = form.querySelector<HTMLButtonElement>(
        'button[type="submit"]'
      );
      const submitLabel = submitBtn?.dataset.submitLabel || 'Submit';

      const payload = parseForm(form);

      const errors = validateForm(payload);
      if (errors.length > 0) {
        errors.forEach((e) => markField(form, e.name));
        setFormStatus(
          form,
          errors.map((e) => e.msg).join(' '),
          'error'
        );
        return;
      }

      // Honeypot
      if (payload.company) {
        setFormStatus(form, 'Thank you!', 'success');
        form.reset();
        return;
      }

      submitting.current = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }

      try {
        // --- Step 1: Atomic email lock via /waitlistEmails ---
        // Transaction ensures only the first submission for a given
        // (lowercased) email wins the race.
        try {
          const emailKey = payload.emailLower.replace(/[.#$\[\]]/g, ',');
          const emailRef = ref(db, `waitlistEmails/${emailKey}`);
          const emailResult = await runTransaction(emailRef, (current) => {
            if (current === true) return; // abort — already claimed
            return true;
          });

          if (!emailResult.committed) {
            setFormStatus(form, 'You are already on the waitlist.', 'info');
            form.reset();
            return;
          }
        } catch (lockError) {
          // Atomic lock unavailable (e.g. rules block /waitlistEmails).
          // Fall through to the duplicate query below.
          console.warn('Atomic email lock skipped:', lockError);
        }

        // --- Step 2: Duplicate query (belt-and-suspenders) ---
        const waitlistRef = ref(db, 'waitlist');
        const dupSnap = await withTimeout(
          get(query(waitlistRef, orderByChild('email'), equalTo(payload.emailLower))),
          FIREBASE_TIMEOUT_MS,
        );

        if (dupSnap.exists()) {
          setFormStatus(form, 'You are already on the waitlist.', 'info');
          form.reset();
          return;
        }

        // --- Step 3: Push entry ---
        await withTimeout(
          push(waitlistRef, {
            name: payload.name,
            email: payload.emailLower,
            role: payload.role,
            projectType: payload.projectType,
            notes: payload.notes,
            source: payload.source,
            timestamp: Date.now(),
          }),
          FIREBASE_TIMEOUT_MS,
        );

        // --- Step 4: Atomic count increment ---
        const countRef = ref(db, 'waitlistCount');
        const countResult = await withTimeout(
          runTransaction(countRef, (current) => ((current as number) || 0) + 1),
          FIREBASE_TIMEOUT_MS,
        );

        if (countResult.committed && countResult.snapshot.val() != null) {
          setCount(countResult.snapshot.val() as number, { animate: true });
        }

        setFormStatus(form, 'You are on the waitlist.', 'success');
        form.reset();
      } catch (error) {
        const err = error as { code?: string; message?: string; name?: string };
        console.error(
          'Waitlist submit error:',
          err.name || '(no name)',
          err.code || '(no code)',
          err.message || '(no message)',
        );
        setFormStatus(form, classifyError(error), 'error');
      } finally {
        submitting.current = false;
        resetSubmitButton(form, submitLabel);
      }
    };
    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('input', handleInput);
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);
}
