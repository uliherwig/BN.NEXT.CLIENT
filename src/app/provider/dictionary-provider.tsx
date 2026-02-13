'use client';
import React, { createContext, useContext } from 'react';

const DictionaryContext = createContext<Record<string, any> | null>(null);

export const useDictionary = () => useContext(DictionaryContext);

interface DictionaryProviderProps {
  dictionary: Record<string, any>;
  children: React.ReactNode;
}

export const DictionaryProvider: React.FC<DictionaryProviderProps> = ({ dictionary, children }) => {

  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
};