interface IDETerminalPanelProps {
  height: number;
  visible: boolean;
  onResize: (height: number) => void;
  onClose: () => void;
}

export function IDETerminalPanel({ height, visible, onResize, onClose }: IDETerminalPanelProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startH = height;

    const onMove = (ev: MouseEvent) => {
      const diff = startY - ev.clientY;
      onResize(startH + diff);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
    };

    document.body.style.cursor = 'row-resize';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <div
      className="ide-terminal-panel"
      style={{ height: visible ? height : 0, overflow: visible ? undefined : 'hidden' }}
    >
      <div className="ide-resize-handle-h" onMouseDown={handleMouseDown} />
      <div className="ide-terminal-header">
        <div className="ide-terminal-tabs">
          <span className="ide-terminal-tab is-active">Terminal</span>
          <span className="ide-terminal-tab">Debug</span>
          <span className="ide-terminal-tab">Output</span>
          <span className="ide-terminal-tab">Problems</span>
        </div>
        <button type="button" className="ide-terminal-close" onClick={onClose} aria-label="Close terminal">
          ×
        </button>
      </div>
      <div className="ide-terminal-body">
        <div className="ide-terminal-line">&gt; System ready on COM3 @ 9600 baud</div>
        <div className="ide-terminal-line">&gt; Board detected: Arduino Uno (ATmega328P)</div>
        <div className="ide-terminal-line">&gt; Compilation successful — 0 errors, 0 warnings</div>
        <div className="ide-terminal-line">&gt; Upload complete — running on target</div>
        <div className="ide-terminal-line ide-terminal-line--dim">&gt; Temp: 24.8°C | Moisture: 61% | PWM: 78%</div>
        <div className="ide-terminal-line ide-terminal-line--dim">&gt; Waiting for input...</div>
      </div>
    </div>
  );
}
