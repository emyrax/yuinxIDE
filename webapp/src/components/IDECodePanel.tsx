import { useRef, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import type { ThemeName } from '../lib/ideState';

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

function cmThemeFor(theme: ThemeName) {
  if (theme === 'kicad-green') {
    return EditorView.theme({
      '&': { backgroundColor: 'transparent' },
      '.cm-content': {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.85rem',
        padding: '12px 14px',
        caretColor: '#a8d5a2',
        color: '#d0e8d0',
      },
      '.cm-cursor': { borderLeftColor: '#a8d5a2' },
      '.cm-gutters': { backgroundColor: 'transparent', border: 'none' },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': { background: '#1a3a2a' },
      '.cm-activeLine': { background: 'rgba(168, 213, 162, 0.04)' },
      '.cm-keyword': { color: '#7ec699' },
      '.cm-string': { color: '#a8d5a2' },
      '.cm-atom': { color: '#f0c674' },
      '.cm-number': { color: '#f0c674' },
      '.cm-def': { color: '#e5c07b' },
      '.cm-variable': { color: '#d0e8d0' },
      '.cm-variable-2': { color: '#b0d0e8' },
      '.cm-type': { color: '#7ec699' },
      '.cm-comment': { color: '#5a7a5a', fontStyle: 'italic' },
      '.cm-meta': { color: '#7ec699' },
      '.cm-operator': { color: '#a8d5a2' },
      '.cm-builtin': { color: '#f0c674' },
    });
  }
  if (theme === 'nord') {
    return EditorView.theme({
      '&': { backgroundColor: 'transparent' },
      '.cm-content': {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.85rem',
        padding: '12px 14px',
        caretColor: '#88c0d0',
        color: '#eceff4',
      },
      '.cm-cursor': { borderLeftColor: '#88c0d0' },
      '.cm-gutters': { backgroundColor: 'transparent', border: 'none' },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': { background: '#434c5e' },
      '.cm-activeLine': { background: 'rgba(136, 192, 208, 0.04)' },
      '.cm-keyword': { color: '#81a1c1' },
      '.cm-string': { color: '#a3be8c' },
      '.cm-atom': { color: '#ebcb8b' },
      '.cm-number': { color: '#ebcb8b' },
      '.cm-def': { color: '#88c0d0' },
      '.cm-variable': { color: '#eceff4' },
      '.cm-variable-2': { color: '#d8dee9' },
      '.cm-type': { color: '#81a1c1' },
      '.cm-comment': { color: '#616e88', fontStyle: 'italic' },
      '.cm-meta': { color: '#81a1c1' },
      '.cm-operator': { color: '#88c0d0' },
      '.cm-builtin': { color: '#ebcb8b' },
    });
  }
  return EditorView.theme({
    '&': { backgroundColor: 'transparent' },
    '.cm-content': {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '0.85rem',
      padding: '12px 14px',
      caretColor: '#00F2FF',
    },
    '.cm-cursor': { borderLeftColor: '#00F2FF' },
    '.cm-gutters': { backgroundColor: 'transparent', border: 'none' },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': { background: 'rgba(0, 242, 255, 0.12)' },
    '.cm-activeLine': { background: 'rgba(0, 242, 255, 0.03)' },
    '.cm-keyword': { color: '#7aa2f7' },
    '.cm-string': { color: '#98c379' },
    '.cm-atom': { color: '#e5c07b' },
    '.cm-number': { color: '#e5c07b' },
    '.cm-def': { color: '#61afef' },
    '.cm-variable': { color: '#e06c75' },
    '.cm-variable-2': { color: '#c678dd' },
    '.cm-type': { color: '#e5c07b' },
    '.cm-comment': { color: '#5c6370', fontStyle: 'italic' },
    '.cm-meta': { color: '#61afef' },
    '.cm-operator': { color: '#56b6c2' },
    '.cm-builtin': { color: '#e5c07b' },
  });
}

interface IDECodePanelProps {
  theme: ThemeName;
}

export function IDECodePanel({ theme }: IDECodePanelProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const base = theme === 'one-dark' || theme === 'yuinx-dark' || theme === 'yuinx-gradient' ? oneDark : [];
      const extensions = [
        basicSetup,
        javascript(),
        ...(Array.isArray(base) ? base : [base]),
        cmThemeFor(theme),
      ];

      const startState = EditorState.create({
        doc: demoCode,
        extensions,
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
