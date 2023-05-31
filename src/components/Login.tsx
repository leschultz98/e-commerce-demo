import { useState } from 'react';
import useStore from '../hooks/useStore.ts';
import { login } from '../utils';
import Modal from './Modal.tsx';

interface Interface {
  onClose: () => void;
}

export default function Login({ onClose }: Interface) {
  const { dispatch } = useStore();

  const [error, setError] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = login({ userName, password });
    if (user) {
      dispatch(user);
      onClose();
    } else setError(true);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            placeholder="username"
            className="input input-bordered"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary" disabled={!userName || !password} onClick={handleLogin}>
            Login
          </button>
          {error && <div className="text-error">Wrong credentials!</div>}
        </div>
      </form>
    </Modal>
  );
}
