import { useRef, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

const demoCode = `# YUINX — Blink LED on breadboard
import board
import digitalio
import time

led = digitalio.DigitalInOut(board.D13)
led.direction = digitalio.Direction.OUTPUT

while True:
    led.value = True
    time.sleep(0.5)
    led.value = False
    time.sleep(0.5)
`;

export function CircuitEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: demoCode,
        extensions: [
          basicSetup,
          python(),
          oneDark,
          EditorView.editable.of(false),
          EditorView.theme({
            '&': { backgroundColor: 'transparent' },
            '.cm-content': { fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85rem', padding: '12px 0' },
          }),
        ],
      });

      viewRef.current = new EditorView({
        state: startState,
        parent: editorRef.current,
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  return (
    <section className="circuit-editor-section" id="editor">
      <div className="glass-lens">
        <div className="circuit-editor-container">
          <div className="code-panel" ref={editorRef} />
          <div className="circuit-panel">
            <div className="circuit-visualizer">
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Central chip */}
                <rect className="circuit-chip" x="160" y="160" width="80" height="80" rx="4" />
                <text className="circuit-label" x="200" y="200">YUINX</text>

                {/* Trace: top-left to chip */}
                <path className="circuit-trace animated" d="M40 40 L120 40 L120 160 L160 160" />
                <circle className="circuit-node" cx="40" cy="40" r="3" />

                {/* Trace: top-right to chip */}
                <path className="circuit-trace animated-delayed cobalt" d="M360 40 L280 40 L280 160 L240 160" />
                <circle className="circuit-node cobalt" cx="360" cy="40" r="3" />

                {/* Trace: bottom-left to chip */}
                <path className="circuit-trace animated cobalt" d="M40 360 L120 360 L120 240 L160 240" />
                <circle className="circuit-node cobalt small" cx="40" cy="360" r="3" />

                {/* Trace: bottom-right to chip */}
                <path className="circuit-trace animated-delayed" d="M360 360 L280 360 L280 240 L240 240" />
                <circle className="circuit-node small" cx="360" cy="360" r="3" />

                {/* Trace: horizontal center */}
                <path className="circuit-trace glow" d="M0 200 L160 200" />
                <path className="circuit-trace glow" d="M240 200 L400 200" />

                {/* Trace: vertical center */}
                <path className="circuit-trace glow" d="M200 0 L200 160" />
                <path className="circuit-trace glow" d="M200 240 L200 400" />

                {/* Extra nodes */}
                <circle className="circuit-node" cx="80" cy="200" r="2" />
                <circle className="circuit-node cobalt" cx="320" cy="200" r="2" />
                <circle className="circuit-node small" cx="200" cy="80" r="2" />
                <circle className="circuit-node cobalt small" cx="200" cy="320" r="2" />

                {/* Resistor symbol top */}
                <path className="circuit-trace" d="M140 80 L145 70 L155 90 L165 70 L175 90 L180 80" />
                <circle className="circuit-node small" cx="160" cy="80" r="2" />

                {/* Capacitor symbol bottom */}
                <path className="circuit-trace" d="M220 320 L220 330 M220 340 L220 350" strokeWidth="2" />
                <circle className="circuit-node small" cx="220" cy="320" r="2" />

                {/* LED symbol right */}
                <path className="circuit-trace cobalt" d="M340 180 L350 190 L350 210 L340 220" />
                <path className="circuit-trace cobalt" d="M340 220 L355 205" />
                <path className="circuit-trace cobalt" d="M345 215 L355 220" />
                <circle className="circuit-node cobalt" cx="340" cy="200" r="2" />

                {/* Animated particles (orbiting) */}
                <circle className="circuit-particle" cx="200" cy="0" r="2">
                  <animateMotion dur="6s" repeatCount="indefinite"
                    path="M0,200 C0,0 400,0 400,200 C400,400 0,400 0,200" />
                </circle>
                <circle className="circuit-particle cobalt" cx="400" cy="200" r="2">
                  <animateMotion dur="8s" repeatCount="indefinite"
                    path="M200,0 C400,0 400,400 200,400 C0,400 0,0 200,0" />
                </circle>
                <circle className="circuit-particle dim" cx="0" cy="200" r="1.5">
                  <animateMotion dur="10s" repeatCount="indefinite"
                    path="M200,400 C400,400 400,0 200,0 C0,0 0,400 200,400" />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
