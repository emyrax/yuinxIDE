const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const FIREBASE_TIMEOUT_MS = 15000;

export interface ValidationError {
  name: string;
  msg: string;
}

export interface FormPayload {
  name: string;
  email: string;
  emailLower: string;
  role: string;
  projectType: string;
  notes: string;
  company: string;
  source: string;
}

export function parseForm(form: HTMLFormElement): FormPayload {
  const data = new FormData(form);
  const email = String(data.get('email') || '').trim();
  return {
    name: String(data.get('name') || '').trim(),
    email,
    emailLower: email.toLowerCase(),
    role: String(data.get('role') || '').trim(),
    projectType: String(data.get('projectType') || '').trim(),
    notes: String(data.get('notes') || '').trim(),
    company: String(data.get('company') || '').trim(),
    source:
      String(form.dataset.source || '').trim() ||
      `waitlist-${window.location.pathname}`,
  };
}

export function validateForm(payload: FormPayload): ValidationError[] {
  const errors: ValidationError[] = [];
  if (payload.name.length < 2)
    errors.push({
      name: 'name',
      msg: 'Name is required (at least 2 characters).',
    });
  if (!EMAIL_RE.test(payload.email))
    errors.push({ name: 'email', msg: 'Enter a valid email address.' });
  if (!payload.role || payload.role === 'Select role')
    errors.push({ name: 'role', msg: 'Select your role.' });
  if (!payload.projectType || payload.projectType === 'Select use case')
    errors.push({ name: 'projectType', msg: 'Select a use case.' });
  return errors;
}

export function clearFields(form: HTMLFormElement): void {
  form
    .querySelectorAll('.field-error')
    .forEach((el) => el.classList.remove('field-error'));
  form
    .querySelectorAll('[aria-invalid]')
    .forEach((el) => el.removeAttribute('aria-invalid'));
}

export function markField(form: HTMLFormElement, name: string): void {
  const field = form.querySelector(`[name="${name}"]`);
  if (!field) return;
  const label = (field as HTMLElement).closest('label');
  if (label) label.classList.add('field-error');
  field.setAttribute('aria-invalid', 'true');
}

export type StatusType = '' | 'success' | 'error' | 'info';

export function setFormStatus(
  form: HTMLFormElement,
  message: string,
  type: StatusType = ''
): void {
  const statusEl = form.querySelector('[data-form-status]');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.classList.remove('success', 'error', 'info');
  if (type) statusEl.classList.add(type);
}

export function classifyError(error: unknown): string {
  if (typeof navigator !== 'undefined' && !navigator.onLine)
    return 'No internet connection.';
  const err = error as { code?: string; message?: string };
  const code = (err.code || '').toLowerCase();
  if (code.includes('permission-denied')) return 'Server error. Please try again.';
  if (code.includes('network')) return 'No internet connection.';
  if (err.message && err.message.includes('quota'))
    return 'Too many signups right now. Please wait.';
  return 'Something went wrong. Please try again.';
}

export function resetSubmitButton(
  form: HTMLFormElement,
  label?: string
): void {
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!btn) return;
  btn.disabled = false;
  btn.classList.remove('is-loading');
  if (label) btn.textContent = label;
}

export function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out.')), ms);
  });
}

export function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Request timed out.')), ms);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}
