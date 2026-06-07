import type { ThemeName } from '../lib/ideState';

interface IDEStatusBarProps {
  theme: ThemeName;
  onThemeChange: (t: ThemeName) => void;
}

const themes: { id: ThemeName; label: string }[] = [
  { id: 'yuinx-dark', label: 'Yuinx Dark' },
  { id: 'yuinx-gradient', label: 'Yuinx Gradient' },
  { id: 'kicad-green', label: 'KiCad Green' },
  { id: 'one-dark', label: 'One Dark' },
  { id: 'nord', label: 'Nord' },
];

export function IDEStatusBar({ theme, onThemeChange }: IDEStatusBarProps) {
  return (
    <div className="ide-status-bar">
      <div className="ide-status-left">
        <span className="ide-status-item">Ln 24, Col 8</span>
        <span className="ide-status-item">Spaces: 2</span>
        <span className="ide-status-item">UTF-8</span>
      </div>
      <div className="ide-status-right">
        <span className="ide-status-item ide-status-item--board">
          <span className="ide-status-dot" /> Board: Uno
        </span>
        <span className="ide-status-item">🔌 COM3</span>
        <span className="ide-status-item ide-status-item--theme">
          <select
            className="ide-theme-select"
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as ThemeName)}
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </span>
      </div>
    </div>
  );
}
