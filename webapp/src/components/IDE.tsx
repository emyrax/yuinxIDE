import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IDETopBar } from './IDETopBar';
import { IDECodePanel } from './IDECodePanel';
import { IDECircuitPanel } from './IDECircuitPanel';
import { IDEDebugPanel } from './IDEDebugPanel';

export function IDE() {
  const { user, loading } = useAuth();

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
      <IDETopBar />
      <div className="ide-main">
        <IDECodePanel />
        <IDECircuitPanel />
      </div>
      <IDEDebugPanel />
    </div>
  );
}
