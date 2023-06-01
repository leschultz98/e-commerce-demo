import { useState } from 'react';
import { useStore } from '@/hooks';
import Login from './Login.tsx';

export default function Header() {
  const {
    state: { userName },
    logout,
  } = useStore();

  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-center items-center py-4 bg-orange-300 sticky top-0 z-50">
      <div className="text-3xl text-primary font-bold">E-COMMERCE</div>
      <div className="absolute right-8">
        {userName ? (
          <div className="text-neutral">
            <span>
              Hello <strong className="text-secondary">{userName}</strong>,{' '}
            </span>
            <button className="btn btn-sm btn-ghost" type="button" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <button className=" btn btn-sm btn-accent" type="button" onClick={() => setOpen(true)}>
            Login
          </button>
        )}
      </div>

      {open && <Login onClose={() => setOpen(false)}></Login>}
    </header>
  );
}
