import { ReactNode, useEffect, useState } from 'react';
import { Context, State } from '../store';
import { getInitState, setLocalData } from '../utils';

const USER = 'user';

export default function Store({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(getInitState<State>(USER, {}, false));

  useEffect(() => {
    setLocalData(USER, state, false);
  }, [state]);

  return <Context.Provider value={{ state, setState }}>{children}</Context.Provider>;
}
