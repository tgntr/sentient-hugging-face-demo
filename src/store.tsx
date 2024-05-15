import { OAuthResult } from '@huggingface/hub';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StoreState {
  user: OAuthResult;
  setUser: (user: OAuthResult) => void;
  logout: () => void;
}

let StoreContext = createContext<StoreState>(null!);

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<OAuthResult>(() => {
    const savedState = localStorage.getItem('store');
    return savedState ? JSON.parse(savedState).user : null;
  });

  const setUser = (user: OAuthResult) => {
    setUserState(user);
    localStorage.setItem('store', JSON.stringify({ user }));
  };

  const logout = () => {
    setUserState(null!);
    localStorage.removeItem('store');
  };
  
  return (<StoreContext.Provider value={{ user: user, setUser: setUser, logout }}>
      {children}
    </StoreContext.Provider>)
};

export function useStore(){
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
