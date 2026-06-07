import { logOut } from '../lib/authUtils';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function IDETopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logOut();
    navigate('/');
  };

  return (
    <header className="ide-topbar">
      <div className="ide-topbar-left">
        <a href="/" className="ide-topbar-brand" aria-label="Yuinx home">
          <img src="./assests/brandYuinxTrans.jpg" alt="" />
          <span className="ide-topbar-brand-name">Yuinx IDE</span>
        </a>
        <span className="ide-topbar-file">main.ino</span>
      </div>

      <div className="ide-topbar-right">
        <span className="ide-topbar-user">{user?.email}</span>
        <button type="button" className="btn btn-outline btn-ide-signout" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </header>
  );
}
