import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '../lib/authUtils';

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const emailId = useId();
  const passwordId = useId();

  const handleGoogle = async () => {
    setError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('/ide');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
      navigate('/ide');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <img
            src="./assests/brandYuinxTrans.jpg"
            alt="Yuinx logo"
            className="auth-logo"
          />
          <h1>Sign in to Yuinx IDE</h1>
          <p className="auth-sub">
            {mode === 'signin'
              ? 'Welcome back — pick up where you left off.'
              : 'Create an account to start building.'}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-google"
          onClick={handleGoogle}
          disabled={submitting}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form className="auth-form" onSubmit={handleEmailSubmit}>
          <label htmlFor={emailId}>
            Email
            <input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label htmlFor={passwordId}>
            Password
            <input
              id={passwordId}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              placeholder="At least 6 characters"
            />
          </label>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting
              ? 'Please wait...'
              : mode === 'signin'
                ? 'Sign In'
                : 'Create Account'}
          </button>
        </form>

        <p className="auth-toggle">
          {mode === 'signin' ? (
            <>
              No account?{' '}
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => { setMode('signup'); setError(''); }}
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="auth-toggle-btn"
                onClick={() => { setMode('signin'); setError(''); }}
              >
                Sign in
              </button>
            </>
          )}
        </p>

        <a href="/" className="auth-back">
          &larr; Back to landing
        </a>
      </div>
    </div>
  );
}
