import React, { createContext, useContext } from 'react';
import { Pylon } from '@/api';

const PylonContext = createContext<Pylon | null>(null);

export const PylonProvider: React.FC<{
  pylon: Pylon;
  children: React.ReactNode;
}> = ({ pylon, children }) => {
  return (
    <PylonContext.Provider value={pylon}>{children}</PylonContext.Provider>
  );
};

export const usePylon = (): Pylon => {
  const context = useContext(PylonContext);
  if (!context) {
    throw new Error('usePylon must be used within a PylonProvider');
  }
  return context;
};
