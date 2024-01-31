'use client';

import React, {createContext, useContext, useState, ReactNode} from 'react';

interface ToggleContextType {
  isVisible: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextType>({
  isVisible: false,
  toggle: () => {}
});

export const useToggleVisibility = () => useContext(ToggleContext);

export const ToggleVisibilityProvider = ({children}: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => setIsVisible(!isVisible);

  return (
    <ToggleContext.Provider value={{isVisible, toggle}}>
      {children}
    </ToggleContext.Provider>
  );
};
