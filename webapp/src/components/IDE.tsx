import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IDEMenuBar } from './IDEMenuBar';
import { IDEActivityBar } from './IDEActivityBar';
import { IDECodePanel } from './IDECodePanel';
import { IDESidePanel } from './IDESidePanel';
import { IDETerminalPanel } from './IDETerminalPanel';
import { IDEStatusBar } from './IDEStatusBar';
import { IDETopBar } from './IDETopBar';
import type { ThemeName, SideTab } from '../lib/ideState';
import {
  loadSidePanelWidth, saveSidePanelWidth,
  loadTerminalHeight, saveTerminalHeight,
  loadTerminalVisible, saveTerminalVisible,
  loadTheme, saveTheme,
} from '../lib/ideState';

export function IDE() {
  const { user, loading } = useAuth();

  const [sidePanelWidth, setSidePanelWidthRaw] = useState(loadSidePanelWidth);
  const [terminalHeight, setTerminalHeightRaw] = useState(loadTerminalHeight);
  const [terminalVisible, setTerminalVisibleRaw] = useState(loadTerminalVisible);
  const [theme, setThemeRaw] = useState<ThemeName>(loadTheme);
  const [activityTab, setActivityTab] = useState('files');
  const [sideTab, setSideTab] = useState<SideTab>('properties');

  const setSidePanelWidth = useCallback((w: number) => {
    setSidePanelWidthRaw(w);
    saveSidePanelWidth(w);
  }, []);

  const setTerminalHeight = useCallback((h: number) => {
    setTerminalHeightRaw(h);
    saveTerminalHeight(h);
  }, []);

  const setTerminalVisible = useCallback((v: boolean) => {
    setTerminalVisibleRaw(v);
    saveTerminalVisible(v);
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeRaw(t);
    saveTheme(t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  if (loading) {
    return (
      <div className="ide-loading">
        <span className="ide-loading-spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="ide-layout">
      <IDEMenuBar theme={theme} onThemeChange={setTheme} />
      <IDETopBar />
      <div className="ide-body">
        <div className="ide-body-row">
          <IDEActivityBar
            activeTab={activityTab}
            onTabChange={setActivityTab}
            terminalVisible={terminalVisible}
            onToggleTerminal={() => setTerminalVisible(!terminalVisible)}
          />
          <div className="ide-main-column">
            <div className="ide-workspace">
              <IDECodePanel theme={theme} />
              <IDESidePanel
                activeTab={sideTab}
                width={sidePanelWidth}
                onResize={setSidePanelWidth}
                onTabChange={setSideTab}
              />
            </div>
            <IDETerminalPanel
              height={terminalHeight}
              visible={terminalVisible}
              onResize={setTerminalHeight}
              onClose={() => setTerminalVisible(false)}
            />
          </div>
        </div>
      </div>
      <IDEStatusBar theme={theme} onThemeChange={setTheme} />
    </div>
  );
}
