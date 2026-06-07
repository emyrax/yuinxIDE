import { useRef, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const demoCode = `// Yuinx IDE — Blink LED on breadboard
#define LED_PIN 13

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Board ready");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}
`;

export function IDECodePanel() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: demoCode,
        extensions: [
          basicSetup,
          javascript(),
          oneDark,
          EditorView.theme({
            '&': { backgroundColor: 'transparent' },
            '.cm-content': {
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.85rem',
              padding: '12px 14px',
              caretColor: '#00F2FF',
            },
            '.cm-cursor': { borderLeftColor: '#00F2FF' },
            '.cm-gutters': { backgroundColor: 'transparent', border: 'none' },
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
    <div className="ide-code-panel">
      <div className="ide-code-header">
        <span className="ide-panel-label">main.ino</span>
        <span className="ide-panel-status">Ready</span>
      </div>
      <div className="ide-code-editor" ref={editorRef} />
      <div className="ide-ai-bar">
        <div className="ide-ai-bar-inner">
          <span className="ide-ai-bar-icon" aria-hidden="true">✦</span>
          <input
            type="text"
            className="ide-ai-bar-input"
            placeholder="Ask AI to write or fix code..."
            aria-label="AI prompt"
          />
          <button type="button" className="ide-ai-bar-send" aria-label="Send prompt">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
