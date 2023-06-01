import { getInitState, setLocalData } from '@/utils';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

export interface State {
  userName?: string;
  userType?: string;
}

export const Context = createContext<{ state: State; setState: Dispatch<SetStateAction<State>> }>({
  state: {},
  setState: () => {
    console.log('nothing');
  },
});

const USER = 'user';

export default function Store({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(getInitState<State>(USER, {}, false));

  useEffect(() => {
    setLocalData(USER, state, false);
  }, [state]);

  return <Context.Provider value={{ state, setState }}>{children}</Context.Provider>;
}
