import { useEffect } from 'react';

export function WaitlistModal() {
  useEffect(() => {
    const modal = document.getElementById('waitlistModal');
    if (!modal) return;

    const openButtons = Array.from(
      document.querySelectorAll('[data-open-waitlist]')
    );
    const closeButtons = Array.from(
      document.querySelectorAll('[data-close-waitlist]')
    );

    const openModal = () => {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      const firstInput = modal.querySelector<HTMLInputElement>(
        'input[name="name"]'
      );
      firstInput?.focus();
    };

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    openButtons.forEach((btn) => btn.addEventListener('click', openModal));
    closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      openButtons.forEach((btn) =>
        btn.removeEventListener('click', openModal)
      );
      closeButtons.forEach((btn) =>
        btn.removeEventListener('click', closeModal)
      );
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="modal" id="waitlistModal" aria-hidden="true">
      <div className="modal-backdrop" data-close-waitlist />
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlistModalTitle"
      >
        <button
          className="modal-close"
          type="button"
          data-close-waitlist
          aria-label="Close"
        >
          ×
        </button>

        <h3 id="waitlistModalTitle">Get early access</h3>
        <p className="modal-copy">
          Early access is rolling out now. Join the waitlist to get priority when we launch.
        </p>

        <form
          className="waitlist-form"
          data-waitlist-form
          data-source="landing-modal"
          noValidate
        >
          <label>
            Full Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              maxLength={90}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={200}
            />
          </label>

          <label>
            Role
            <select name="role" required>
              <option value="">Select role</option>
              <option>Founder</option>
              <option>Hardware Engineer</option>
              <option>Embedded Developer</option>
              <option>Student Builder</option>
              <option>Educator</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Use Case
            <select name="projectType" required>
              <option value="">Select use case</option>
              <option>Product prototyping</option>
              <option>Education / labs</option>
              <option>Robotics projects</option>
              <option>IoT deployment</option>
              <option>Personal experiments</option>
            </select>
          </label>

          <label>
            Notes (optional)
            <textarea
              name="notes"
              rows={2}
              maxLength={500}
              placeholder="What are you building?"
            />
          </label>

          <label className="hp-field" aria-hidden="true">
            Company
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary"
            data-submit-label="Join Waitlist"
          >
            Join Waitlist
          </button>
          <p
            className="form-status"
            data-form-status
            role="status"
            aria-live="polite"
          />
        </form>
      </div>
    </div>
  );
}
