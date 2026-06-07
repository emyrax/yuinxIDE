import { useState } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const suggestions = [
  'Fix my LED wiring',
  'Generate code for a temperature sensor',
  'Explain how PWM works',
  'Optimize this loop for power',
];

export function IDEAIChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hi! Ask me anything about your circuit or code.' },
  ]);
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text: text.trim() };
    const aiMsg: Message = { role: 'ai', text: 'I\'ll help you with that. This feature is coming soon — connect your Firebase Functions to enable real AI responses.' };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="ide-ai-chat">
      <div className="ide-ai-chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`ide-ai-msg ide-ai-msg--${m.role}`}>
            {m.text}
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="ide-ai-suggestions">
          {suggestions.map((s) => (
            <button key={s} type="button" className="ide-ai-suggestion" onClick={() => send(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="ide-ai-input-row">
        <input
          type="text"
          className="ide-ai-input"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(input); }}
        />
        <button type="button" className="ide-ai-send" onClick={() => send(input)} disabled={!input.trim()}>
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
