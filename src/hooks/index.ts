import { useCallback, useContext } from 'react';
import { Context, State } from '@/store';

export function useStore() {
  const { state, setState } = useContext(Context);

  const dispatch = useCallback((v: State) => setState((state) => ({ ...state, ...v })), []);

  const logout = useCallback(() => setState({}), []);

  return { state, dispatch, logout };
}
