export function IDEDebugPanel() {
  const logLines = [
    '> Booting sensor node...',
    '> WiFi: connected',
    '> Temp: 24.8°C',
    '> Moisture: 61%',
    '> Pump: OFF',
    '> Serial monitor ready on COM3 @ 9600 baud',
  ];

  const stats = [
    { label: 'Temp', value: '24.8°C' },
    { label: 'Moisture', value: '61%' },
    { label: 'PWM', value: '78%' },
    { label: 'Status', value: 'Running' },
  ];

  return (
    <div className="ide-debug-panel">
      <div className="ide-debug-header">
        <span className="ide-panel-label">Debug Console</span>
        <div className="ide-debug-controls">
          <select className="ide-debug-select" aria-label="Serial port">
            <option>COM3</option>
            <option>COM5</option>
          </select>
          <select className="ide-debug-select ide-debug-baud" aria-label="Baud rate">
            <option>9600</option>
            <option>115200</option>
          </select>
          <button type="button" className="ide-debug-connect">Connect</button>
        </div>
      </div>

      <div className="ide-debug-console" aria-label="Serial output">
        {logLines.map((line, i) => (
          <div className="ide-debug-line" key={i}>{line}</div>
        ))}
      </div>

      <div className="ide-debug-stats">
        {stats.map((s) => (
          <div className="ide-debug-stat" key={s.label}>
            <span className="ide-debug-stat-label">{s.label}</span>
            <span className="ide-debug-stat-value">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
