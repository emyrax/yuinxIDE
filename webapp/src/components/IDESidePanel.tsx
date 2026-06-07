import type { SideTab } from '../lib/ideState';
import { IDEAIChatPanel } from './IDEAIChatPanel';

interface IDESidePanelProps {
  activeTab: SideTab;
  width: number;
  onResize: (width: number) => void;
  onTabChange: (tab: SideTab) => void;
}

const tabs: { id: SideTab; label: string }[] = [
  { id: 'properties', label: 'Properties' },
  { id: 'components', label: 'Components' },
  { id: 'layers', label: 'Layers' },
  { id: 'ai', label: 'AI' },
];

export function IDESidePanel({ activeTab, width, onResize, onTabChange }: IDESidePanelProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startW = width;

    const onMove = (ev: MouseEvent) => {
      const diff = startX - ev.clientX;
      onResize(startW + diff);
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <div className="ide-side-panel" style={{ width }}>
      <div className="ide-resize-handle-v" onMouseDown={handleMouseDown} />

      <div className="ide-side-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ide-side-tab ${activeTab === t.id ? 'is-active' : ''}`}
            onClick={() => onTabChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ide-side-content">
        {activeTab === 'properties' && (
          <div className="ide-side-section">
            <span className="ide-side-section-label">Board</span>
            <span className="ide-side-value">Arduino Uno</span>
            <span className="ide-side-section-label">Microcontroller</span>
            <span className="ide-side-value">ATmega328P</span>
            <span className="ide-side-section-label">Clock Speed</span>
            <span className="ide-side-value">16 MHz</span>
            <span className="ide-side-section-label">Digital I/O</span>
            <span className="ide-side-value">14</span>
            <span className="ide-side-section-label">Analog Inputs</span>
            <span className="ide-side-value">6</span>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="ide-side-section">
            {[
              { name: 'Arduino Uno', type: 'Board', pins: '14D / 6A' },
              { name: 'LED', type: 'Output', pins: '2' },
              { name: 'Resistor 220Ω', type: 'Passive', pins: '2' },
              { name: 'HC-SR04', type: 'Sensor', pins: '4' },
            ].map((c) => (
              <div className="ide-side-component" key={c.name}>
                <strong>{c.name}</strong>
                <span>{c.type}</span>
                <span className="ide-side-muted">{c.pins}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'layers' && (
          <div className="ide-side-section">
            {[
              { name: 'Top Copper', color: '#e63946', visible: true },
              { name: 'Bottom Copper', color: '#457b9d', visible: true },
              { name: 'Silkscreen', color: '#f1faee', visible: true },
              { name: 'Solder Mask', color: '#0d2818', visible: false },
              { name: 'Board Outline', color: '#888', visible: true },
            ].map((l) => (
              <div className="ide-side-layer" key={l.name}>
                <span className="ide-side-layer-color" style={{ background: l.color }} />
                <span className="ide-side-layer-name">{l.name}</span>
                <span className={`ide-side-layer-eye ${l.visible ? 'is-visible' : ''}`}>
                  {l.visible ? '👁' : '👁‍🗨'}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ai' && <IDEAIChatPanel />}
      </div>
    </div>
  );
}
