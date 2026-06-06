import { useEffect, useRef } from 'react';

const PROMPTS = [
  'smart planter parts list',
  'build a line following robot',
  'fix my breadboard wiring',
  'why isn\u2019t my led turning on',
  'generate code and wiring for a soil sensor',
  'make a robotic arm with servos',
  'debug my circuit',
  'connect arduino to laptop',
  'create a temperature monitor',
  'my resistor is overheating',
];

const HOLD_DELAY = 1850;
const FADE_DELAY = 260;
const REDUCED_MOTION_DELAY = 2600;

export function useBuilderShowcase(): void {
  const runToken = useRef(0);
  const activeIndex = useRef(0);

  useEffect(() => {
    const typedEl = document.querySelector<HTMLElement>('[data-builder-typed]');
    const sendButton = document.querySelector('.builder-send');
    const actionPills = Array.from(
      document.querySelectorAll('[data-builder-action]')
    );
    const stagePanels = Array.from(
      document.querySelectorAll('[data-builder-panel]')
    );

    if (!typedEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let rotateTimer = 0;
    let stepTimer = 0;
    let activeAction = 'generate';

    function clearTimers() {
      window.clearTimeout(rotateTimer);
      window.clearTimeout(stepTimer);
    }

    function pulseSendButton() {
      if (!sendButton) return;
      sendButton.classList.remove('pulse');
      void (sendButton as HTMLElement).offsetWidth;
      sendButton.classList.add('pulse');
    }

    function syncStage(actionKey: string) {
      if (actionPills.length === 0 || stagePanels.length === 0) return;
      activeAction = actionKey;
      if (activeAction !== 'generate') {
        clearTimers();
        runToken.current += 1;
      }
      actionPills.forEach((pill) => {
        const isActive =
          (pill as HTMLElement).dataset.builderAction === activeAction;
        pill.classList.toggle('is-active', isActive);
        pill.classList.toggle('builder-action-pill-accent', isActive);
      });
      stagePanels.forEach((panel) => {
        panel.classList.toggle(
          'is-active',
          (panel as HTMLElement).dataset.builderPanel === activeAction
        );
      });
    }

    function typePrompt(
      text: string,
      instant: boolean,
      token: number,
      onDone: () => void
    ) {
      const el = typedEl!;
      if (instant || prefersReducedMotion) {
        el.classList.remove('is-fading');
        el.textContent = text;
        onDone();
        return;
      }
      let charIndex = 0;
      el.classList.remove('is-fading');
      el.textContent = '';
      const tick = () => {
        if (token !== runToken.current) return;
        charIndex += 1;
        el.textContent = text.slice(0, charIndex);
        if (charIndex < text.length) {
          const ch = text.charAt(charIndex - 1);
          stepTimer = window.setTimeout(tick, ch === ' ' ? 42 : 28);
          return;
        }
        onDone();
      };
      tick();
    }

    function fadePrompt(token: number, onDone: () => void) {
      const el = typedEl!;
      if (prefersReducedMotion) {
        onDone();
        return;
      }
      el.classList.add('is-fading');
      stepTimer = window.setTimeout(() => {
        if (token !== runToken.current) return;
        el.textContent = '';
        el.classList.remove('is-fading');
        onDone();
      }, FADE_DELAY);
    }

    function renderPrompt(index: number, instant = false) {
      activeIndex.current = index;
      runToken.current += 1;
      clearTimers();
      const token = runToken.current;
      const prompt = PROMPTS[index] || '';

      typePrompt(prompt, instant, token, () => {
        if (token !== runToken.current) return;
        pulseSendButton();
        rotateTimer = window.setTimeout(() => {
          if (token !== runToken.current) return;
          if (prefersReducedMotion) {
            renderPrompt((activeIndex.current + 1) % PROMPTS.length, true);
            return;
          }
          fadePrompt(token, () => {
            if (token !== runToken.current) return;
            renderPrompt((activeIndex.current + 1) % PROMPTS.length);
          });
        }, instant || prefersReducedMotion ? REDUCED_MOTION_DELAY : HOLD_DELAY);
      });
    }

    if (sendButton) {
      sendButton.addEventListener('click', () => {
        syncStage('generate');
        renderPrompt((activeIndex.current + 1) % PROMPTS.length);
      });
    }

    actionPills.forEach((pill) => {
      const actionKey = (pill as HTMLElement).dataset.builderAction!;
      pill.addEventListener('click', () => {
        syncStage(actionKey);
        if (actionKey === 'generate') renderPrompt(activeIndex.current, true);
      });
      pill.addEventListener('mouseenter', () => {
        syncStage(actionKey);
        if (actionKey === 'generate') renderPrompt(activeIndex.current, true);
      });
    });

    syncStage(activeAction);
    renderPrompt(activeIndex.current, true);

    return () => {
      clearTimers();
    };
  }, []);
}
