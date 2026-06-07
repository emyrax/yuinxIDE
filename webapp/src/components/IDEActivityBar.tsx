interface IDEActivityBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  terminalVisible: boolean;
  onToggleTerminal: () => void;
}

const topIcons = [
  { id: 'files', label: 'Files', svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
  { id: 'search', label: 'Search', svg: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
  { id: 'circuit', label: 'Circuit', svg: '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h8"/>' },
  { id: 'pcb', label: 'PCB', svg: '<rect x="5" y="5" width="14" height="14" rx="3"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>' },
  { id: 'extensions', label: 'Extensions', svg: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>' },
];

export function IDEActivityBar({ activeTab, onTabChange, terminalVisible, onToggleTerminal }: IDEActivityBarProps) {
  return (
    <div className="ide-activity-bar">
      <div className="ide-activity-top">
        {topIcons.map((icon) => (
          <button
            key={icon.id}
            type="button"
            className={`ide-activity-icon ${activeTab === icon.id ? 'is-active' : ''}`}
            onClick={() => onTabChange(icon.id)}
            aria-label={icon.label}
            title={icon.label}
            dangerouslySetInnerHTML={{
              __html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">${icon.svg}</svg>`,
            }}
          />
        ))}
      </div>
      <div className="ide-activity-bottom">
        <button
          type="button"
          className={`ide-activity-icon ${terminalVisible ? 'is-active' : ''}`}
          onClick={onToggleTerminal}
          aria-label="Toggle Terminal"
          title="Toggle Terminal"
          dangerouslySetInnerHTML={{
            __html: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
          }}
        />
      </div>
    </div>
  );
}
