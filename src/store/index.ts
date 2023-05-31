import { createContext, Dispatch, SetStateAction } from 'react';

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
