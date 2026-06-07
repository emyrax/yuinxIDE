import type { ThemeName } from '../lib/ideState';

interface IDEMenuBarProps {
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

export function IDEMenuBar({ theme, onThemeChange }: IDEMenuBarProps) {
  return (
    <div className="ide-menu-bar">
      <div className="ide-menu-item">File</div>
      <div className="ide-menu-item">Edit</div>
      <div className="ide-menu-item ide-menu-item--has-sub">
        View
        <div className="ide-menu-sub">
          <div className="ide-menu-sub-group">
            <span className="ide-menu-sub-label">Theme</span>
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`ide-menu-sub-item ${theme === t.id ? 'is-active' : ''}`}
                onClick={() => onThemeChange(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="ide-menu-item">Tools</div>
      <div className="ide-menu-item">Help</div>
    </div>
  );
}
