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
      const submitLabel =
        submitBtn?.dataset.submitLabel || 'Submit';

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
        const waitlistRef = ref(db, 'waitlist');

        // Duplicate check
        const dupSnap = await get(
          query(waitlistRef, orderByChild('email'), equalTo(payload.email))
        );
        if (dupSnap.exists()) {
          setFormStatus(form, 'You are already on the waitlist.', 'success');
          return;
        }

        // Push
        await push(waitlistRef, {
          name: payload.name,
          email: payload.email,
          role: payload.role,
          projectType: payload.projectType,
          notes: payload.notes,
          source: payload.source,
          timestamp: Date.now(),
        });

        // Count transaction
        const countRef = ref(db, 'waitlistCount');
        await runTransaction(countRef, (current) => (current || 0) + 1).then((result) => {
          if (result.committed && result.snapshot.val() != null) {
            setCount(result.snapshot.val(), { animate: true });
          }
        });

        setFormStatus(form, 'You are on the waitlist.', 'success');
        form.reset();
      } catch (error) {
        console.error('Waitlist submit error:', error);
        setFormStatus(form, classifyError(error), 'error');
      } finally {
        submitting.current = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.textContent = submitLabel;
        }
      }
    };
    form.addEventListener('submit', handleSubmit);

    return () => {
      form.removeEventListener('input', handleInput);
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);
}
