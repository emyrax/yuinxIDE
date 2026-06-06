'use strict';

const firebaseConfig = {
  apiKey: "AIzaSyDUGwz1YOgCRVYK6n73BY9NWCAdkXlEpns",
  authDomain: "yuinx-waitlist.firebaseapp.com",
  databaseURL: "https://yuinx-waitlist-default-rtdb.firebaseio.com",
  projectId: "yuinx-waitlist",
  storageBucket: "yuinx-waitlist.firebasestorage.app",
  messagingSenderId: "1075761613808",
  appId: "1:1075761613808:web:f0df774d97deb974acab35",
  measurementId: "G-J1B16VH3L0"
};

firebase.initializeApp(firebaseConfig);

function randomDigitExcept(excludedDigit) {
  let digit = Math.floor(Math.random() * 10);
  if (digit === excludedDigit) {
    digit = (digit + 3) % 10;
  }
  return digit;
}

function buildDigitStack(targetDigit, startDigit, shouldAnimate, digitIndex) {
  const digit = document.createElement('span');
  digit.className = 'waitlist-count-digit';
  digit.setAttribute('aria-hidden', 'true');

  const stack = document.createElement('span');
  stack.className = 'waitlist-count-digit-stack';
  const sequence = shouldAnimate
    ? [
        startDigit,
        ...Array.from({ length: 14 + digitIndex * 2 }, () => randomDigitExcept(targetDigit)),
        targetDigit
      ]
    : [targetDigit];

  sequence.forEach((value) => {
    const row = document.createElement('span');
    row.textContent = String(value);
    stack.append(row);
  });

  stack.style.transform = 'translateY(0)';
  stack.style.setProperty('--roll-duration', `${980 + digitIndex * 120}ms`);
  digit.append(stack);

  if (shouldAnimate) {
    window.requestAnimationFrame(() => {
      stack.style.transform = `translateY(-${sequence.length - 1}em)`;
    });
  }

  return digit;
}

function renderCount(el, count, options = {}) {
  const animate = options.animate !== false;
  const formattedCount = new Intl.NumberFormat().format(count);
  const previousValue = Number(el.dataset.waitlistValue);
  const previousDigits = Number.isInteger(previousValue)
    ? new Intl.NumberFormat().format(previousValue).replace(/\D/g, '')
    : '';
  const nextDigits = formattedCount.replace(/\D/g, '');
  const shouldAnimate = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let digitIndex = 0;

  el.textContent = '';
  el.setAttribute('aria-label', `${formattedCount} builders joined`);

  formattedCount.split('').forEach((character) => {
    if (!/\d/.test(character)) {
      const separator = document.createElement('span');
      separator.className = 'waitlist-count-separator';
      separator.setAttribute('aria-hidden', 'true');
      separator.textContent = character;
      el.append(separator);
      return;
    }

    const targetDigit = Number(character);
    const alignedPreviousDigit = previousDigits[previousDigits.length - nextDigits.length + digitIndex];
    const startDigit = /\d/.test(alignedPreviousDigit) ? Number(alignedPreviousDigit) : 0;
    el.append(buildDigitStack(targetDigit, startDigit, shouldAnimate, digitIndex));
    digitIndex += 1;
  });

  el.dataset.waitlistValue = String(count);
}

function setCount(count, options = {}) {
  const safeCount = Number.isFinite(count) ? count : null;
  document.querySelectorAll('[data-waitlist-count]').forEach((el) => {
    if (safeCount === null) {
      el.textContent = '';
      el.classList.add('waitlist-count-loading');
      el.setAttribute('aria-label', 'Loading waitlist count');
      return;
    }

    el.classList.remove('waitlist-count-loading');
    renderCount(el, safeCount, options);
  });
}

function setFormStatus(form, message, type = '') {
  const statusEl = form.querySelector('[data-form-status]');
  if (!statusEl) {
    return;
  }

  statusEl.textContent = message;
  statusEl.classList.remove('success', 'error');
  if (type) {
    statusEl.classList.add(type);
  }
}

function setupNavState() {
  const nav = document.getElementById('topNav');
  if (!nav) {
    return;
  }

  const sync = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };

  sync();
  window.addEventListener('scroll', sync, { passive: true });
}

function setupReveal() {
  const items = Array.from(document.querySelectorAll('.reveal'));
  if (items.length === 0) {
    return;
  }

  items.forEach((item) => {
    const delay = Number(item.dataset.revealDelay || 0);
    if (Number.isFinite(delay) && delay > 0) {
      item.style.transitionDelay = `${delay}ms`;
    }
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -12% 0px' }
  );

  items.forEach((item) => observer.observe(item));
}

function setupBuilderShowcase() {
  const typedEl = document.querySelector('[data-builder-typed]');
  const sendButton = document.querySelector('.builder-send');
  const actionPills = Array.from(document.querySelectorAll('[data-builder-action]'));
  const stagePanels = Array.from(document.querySelectorAll('[data-builder-panel]'));

  if (!typedEl) {
    return;
  }

  const prompts = [
    'smart planter parts list',
    'build a line following robot',
    'fix my breadboard wiring',
    'why isn’t my led turning on',
    'generate code and wiring for a soil sensor',
    'make a robotic arm with servos',
    'debug my circuit',
    'connect arduino to laptop',
    'create a temperature monitor',
    'my resistor is overheating'
  ];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const holdDelayMs = 1850;
  const fadeDelayMs = 260;
  const reducedMotionDelayMs = 2600;
  let activePromptIndex = 0;
  let activeAction = 'generate';
  let rotateTimer = 0;
  let stepTimer = 0;
  let runToken = 0;

  function clearTimers() {
    window.clearTimeout(rotateTimer);
    window.clearTimeout(stepTimer);
  }

  function pulseSendButton() {
    if (!sendButton) {
      return;
    }

    sendButton.classList.remove('pulse');
    void sendButton.offsetWidth;
    sendButton.classList.add('pulse');
  }

  function syncStage(actionKey) {
    if (actionPills.length === 0 || stagePanels.length === 0) {
      return;
    }

    activeAction = actionKey;
    if (activeAction !== 'generate') {
      clearTimers();
      runToken += 1;
    }

    actionPills.forEach((pill) => {
      const isActive = pill.dataset.builderAction === activeAction;
      pill.classList.toggle('is-active', isActive);
      pill.classList.toggle('builder-action-pill-accent', isActive);
    });

    stagePanels.forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.builderPanel === activeAction);
    });
  }

  function typePrompt(text, instant, token, onDone) {
    if (instant || prefersReducedMotion) {
      typedEl.classList.remove('is-fading');
      typedEl.textContent = text;
      onDone();
      return;
    }

    let charIndex = 0;
    typedEl.classList.remove('is-fading');
    typedEl.textContent = '';

    const tick = () => {
      if (token !== runToken) {
        return;
      }

      charIndex += 1;
      typedEl.textContent = text.slice(0, charIndex);
      if (charIndex < text.length) {
        const currentChar = text.charAt(charIndex - 1);
        const delay = currentChar === ' ' ? 42 : 28;
        stepTimer = window.setTimeout(tick, delay);
        return;
      }

      onDone();
    };

    tick();
  }

  function fadePrompt(token, onDone) {
    if (prefersReducedMotion) {
      onDone();
      return;
    }

    typedEl.classList.add('is-fading');
    stepTimer = window.setTimeout(() => {
      if (token !== runToken) {
        return;
      }

      typedEl.textContent = '';
      typedEl.classList.remove('is-fading');
      onDone();
    }, fadeDelayMs);
  }

  function renderPrompt(index, instant = false) {
    activePromptIndex = index;
    runToken += 1;
    clearTimers();

    const token = runToken;
    const prompt = prompts[index] || '';

    typePrompt(prompt, instant, token, () => {
      if (token !== runToken) {
        return;
      }

      pulseSendButton();
      rotateTimer = window.setTimeout(() => {
        if (token !== runToken) {
          return;
        }

        if (prefersReducedMotion) {
          renderPrompt((activePromptIndex + 1) % prompts.length, true);
          return;
        }

        fadePrompt(token, () => {
          if (token !== runToken) {
            return;
          }

          renderPrompt((activePromptIndex + 1) % prompts.length);
        });
      }, instant || prefersReducedMotion ? reducedMotionDelayMs : holdDelayMs);
    });
  }

  if (sendButton) {
    sendButton.addEventListener('click', () => {
      syncStage('generate');
      renderPrompt((activePromptIndex + 1) % prompts.length);
    });
  }

  actionPills.forEach((pill) => {
    const actionKey = pill.dataset.builderAction;

    pill.addEventListener('click', () => {
      syncStage(actionKey);
      if (actionKey === 'generate') {
        renderPrompt(activePromptIndex, true);
      }
    });

    pill.addEventListener('mouseenter', () => {
      syncStage(actionKey);
      if (actionKey === 'generate') {
        renderPrompt(activePromptIndex, true);
      }
    });
  });

  syncStage(activeAction);
  renderPrompt(activePromptIndex, true);
}

function setupWaitlistModal() {
  const modal = document.getElementById('waitlistModal');
  if (!modal) {
    return;
  }

  const openButtons = Array.from(document.querySelectorAll('[data-open-waitlist]'));
  const closeButtons = Array.from(document.querySelectorAll('[data-close-waitlist]'));

  const openModal = () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const firstInput = modal.querySelector('input[name="name"]');
    if (firstInput) {
      firstInput.focus();
    }
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function setupWaitlistForms() {
  const forms = Array.from(document.querySelectorAll('[data-waitlist-form]'));
  if (forms.length === 0) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let submitting = false;

  function clearFields(form) {
    form.querySelectorAll('.field-error').forEach((el) => el.classList.remove('field-error'));
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  }

  function markField(form, name) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return;
    const label = field.closest('label');
    if (label) label.classList.add('field-error');
    field.setAttribute('aria-invalid', 'true');
  }

  function classifyError(error) {
    if (!navigator.onLine) return 'No internet connection.';
    const code = error.code || '';
    if (code === 'PERMISSION_DENIED') return 'Server error. Please try again.';
    if (code === 'NETWORK_ERROR') return 'No internet connection.';
    if (error.message && error.message.includes('quota')) return 'Too many signups right now. Please wait.';
    return 'Something went wrong. Please try again.';
  }

  forms.forEach((form) => {
    // Live validation: clear errors on input
    form.addEventListener('input', () => {
      setFormStatus(form, '');
      clearFields(form);
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (submitting) return;

      setFormStatus(form, '');
      clearFields(form);

      const submitBtn = form.querySelector('button[type="submit"]');
      const submitLabel = (submitBtn && submitBtn.dataset.submitLabel) || 'Submit';

      const formData = new FormData(form);
      const payload = {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        role: String(formData.get('role') || '').trim(),
        projectType: String(formData.get('projectType') || '').trim(),
        notes: String(formData.get('notes') || '').trim(),
        company: String(formData.get('company') || '').trim(),
        source: String(form.dataset.source || '').trim() || `waitlist-${window.location.pathname}`
      };

      // Validation
      const errors = [];
      if (payload.name.length < 2) errors.push({ name: 'name', msg: 'Name is required (at least 2 characters).' });
      if (!EMAIL_RE.test(payload.email)) errors.push({ name: 'email', msg: 'Enter a valid email address.' });
      if (!payload.role || payload.role === 'Select role') errors.push({ name: 'role', msg: 'Select your role.' });
      if (!payload.projectType || payload.projectType === 'Select use case') errors.push({ name: 'projectType', msg: 'Select a use case.' });

      if (errors.length > 0) {
        errors.forEach((e) => markField(form, e.name));
        setFormStatus(form, errors.map((e) => e.msg).join(' '), 'error');
        return;
      }

      // Honeypot: silently accept if bot filled hidden company field
      if (payload.company) {
        setFormStatus(form, 'Thank you!', 'success');
        form.reset();
        return;
      }

      submitting = true;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }

      try {
        const db = firebase.database();

        // Duplicate email check
        const snap = await db.ref('waitlist')
          .orderByChild('email')
          .equalTo(payload.email)
          .once('value');

        if (snap.exists()) {
          setFormStatus(form, 'You are already on the waitlist.', 'success');
          return;
        }

        // Push new entry
        await db.ref('waitlist').push({
          name: payload.name,
          email: payload.email,
          role: payload.role,
          projectType: payload.projectType,
          notes: payload.notes,
          source: payload.source,
          timestamp: Date.now()
        });

        // Atomic count increment
        await db.ref('waitlistCount').transaction((current) => (current || 0) + 1, (error, committed, snap) => {
          if (committed && snap.val() != null) {
            setCount(snap.val(), { animate: true });
          }
        });

        setFormStatus(form, 'You are on the waitlist.', 'success');
        form.reset();
      } catch (error) {
        console.error('Waitlist submit error:', error);
        setFormStatus(form, classifyError(error), 'error');
      } finally {
        submitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('is-loading');
          submitBtn.textContent = submitLabel;
        }
      }
    });
  });
}

function loadCount() {
  setCount(null);

  return firebase.database().ref('waitlistCount').once('value')
    .then((snap) => {
      setCount(snap.val() || 0, { animate: true });
    })
    .catch(() => {
      setCount(null);
    });
}

async function init() {
  setupNavState();
  setupReveal();
  setupBuilderShowcase();
  setupWaitlistModal();
  setupWaitlistForms();
  await loadCount();
}

init();
