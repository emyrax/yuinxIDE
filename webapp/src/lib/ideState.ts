export type ThemeName = 'yuinx-dark' | 'yuinx-gradient' | 'kicad-green' | 'one-dark' | 'nord';
export type SideTab = 'properties' | 'components' | 'layers' | 'ai';

const PREFIX = 'ide.';

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

export function loadSidePanelWidth(): number {
  return get('sidePanelWidth', 280);
}

export function saveSidePanelWidth(w: number): void {
  set('sidePanelWidth', Math.max(200, Math.min(450, w)));
}

export function loadTerminalHeight(): number {
  return get('terminalHeight', 200);
}

export function saveTerminalHeight(h: number): void {
  set('terminalHeight', Math.max(80, Math.min(600, h)));
}

export function loadTerminalVisible(): boolean {
  return get('terminalVisible', true);
}

export function saveTerminalVisible(v: boolean): void {
  set('terminalVisible', v);
}

export function loadTheme(): ThemeName {
  const t = get<ThemeName>('theme', 'yuinx-dark');
  const valid: ThemeName[] = ['yuinx-dark', 'yuinx-gradient', 'kicad-green', 'one-dark', 'nord'];
  return valid.includes(t) ? t : 'yuinx-dark';
}

export function saveTheme(t: ThemeName): void {
  set('theme', t);
}
