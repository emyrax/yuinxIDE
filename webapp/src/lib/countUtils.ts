function randomDigitExcept(excludedDigit: number): number {
  let digit = Math.floor(Math.random() * 10);
  if (digit === excludedDigit) {
    digit = (digit + 3) % 10;
  }
  return digit;
}

function buildDigitStack(
  targetDigit: number,
  startDigit: number,
  shouldAnimate: boolean,
  digitIndex: number
): HTMLSpanElement {
  const digit = document.createElement('span');
  digit.className = 'waitlist-count-digit';
  digit.setAttribute('aria-hidden', 'true');

  const stack = document.createElement('span');
  stack.className = 'waitlist-count-digit-stack';
  const sequence = shouldAnimate
    ? [
        startDigit,
        ...Array.from({ length: 14 + digitIndex * 2 }, () => randomDigitExcept(targetDigit)),
        targetDigit,
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

function renderCount(
  el: HTMLElement,
  count: number,
  options: { animate?: boolean } = {}
): void {
  const animate = options.animate !== false;
  const formattedCount = new Intl.NumberFormat().format(count);
  const previousValue = Number(el.dataset.waitlistValue);
  const previousDigits = Number.isInteger(previousValue)
    ? new Intl.NumberFormat().format(previousValue).replace(/\D/g, '')
    : '';
  const nextDigits = formattedCount.replace(/\D/g, '');
  const shouldAnimate =
    animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
    const alignedPreviousDigit =
      previousDigits[previousDigits.length - nextDigits.length + digitIndex];
    const startDigit = /\d/.test(alignedPreviousDigit)
      ? Number(alignedPreviousDigit)
      : 0;
    el.append(
      buildDigitStack(targetDigit, startDigit, shouldAnimate, digitIndex)
    );
    digitIndex += 1;
  });

  el.dataset.waitlistValue = String(count);
}

export function setCount(
  count: number | null,
  options: { animate?: boolean } = {}
): void {
  const safeCount = Number.isFinite(count) ? count : null;
  document.querySelectorAll('[data-waitlist-count]').forEach((el) => {
    if (safeCount === null) {
      el.textContent = '';
      el.classList.add('waitlist-count-loading');
      el.setAttribute('aria-label', 'Loading waitlist count');
      return;
    }
    el.classList.remove('waitlist-count-loading');
    renderCount(el as HTMLElement, safeCount, options);
  });
}
