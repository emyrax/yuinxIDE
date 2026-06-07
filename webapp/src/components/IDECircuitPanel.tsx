export function IDECircuitPanel() {
  const components = [
    { name: 'Arduino Uno', pin: 'D13', status: 'connected' as const },
    { name: 'LED', pin: 'D13 → GND', status: 'connected' as const },
    { name: 'Resistor 220Ω', pin: 'D13', status: 'connected' as const },
    { name: 'HC-SR04', pin: '—', status: 'unmapped' as const },
  ];

  return (
    <div className="ide-circuit-panel">
      <div className="ide-circuit-header">
        <span className="ide-panel-label">Circuit Context</span>
        <button type="button" className="ide-circuit-upload" aria-label="Upload breadboard photo">
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Upload Photo
        </button>
      </div>

      <div className="ide-circuit-breadboard" aria-label="Breadboard visualization">
        <div className="ide-breadboard-rails">
          <span />
          <span />
        </div>
        <div className="ide-breadboard-main">
          <div className="ide-breadboard-chip" />
          <div className="ide-breadboard-led" />
          <div className="ide-breadboard-resistor" />
          <div className="ide-breadboard-wire-a" />
          <div className="ide-breadboard-wire-b" />
        </div>
      </div>

      <div className="ide-circuit-components">
        <span className="ide-circuit-components-label">Components</span>
        {components.map((c) => (
          <div className="ide-circuit-component" key={c.name}>
            <span className={`ide-component-dot ide-component-dot--${c.status}`} />
            <span className="ide-component-name">{c.name}</span>
            <span className="ide-component-pin">{c.pin}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
