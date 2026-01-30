import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  address: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  // Simulate connected state by default for preview purposes
  const [isConnected, setIsConnected] = useState(true);
  const [address, setAddress] = useState<string | null>("0x1234...5678");

  const connect = () => {
    setIsConnected(true);
    setAddress("0x1234...5678");
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ isConnected, connect, disconnect, address }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
