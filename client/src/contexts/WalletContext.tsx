import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { rewardsStorage, type ChainKind } from '@/lib/rewardsStorage';

interface WalletContextType {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  address: string | null;
  isPending: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  // Use wagmi hooks for real wallet connection
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  // Sync wagmi state with rewardsStorage
  useEffect(() => {
    if (isConnected && address) {
      const newState = {
        chain: 'evm' as ChainKind,
        chainType: 'evm' as const,
        address: address, // Store FULL address (42 chars)
        isConnected: true
      };
      rewardsStorage.set(newState);
      // Initialize user data with full address
      rewardsStorage.initUser(address, 'evm');
    } else {
      // Clear storage when disconnected
      const currentState = rewardsStorage.get();
      if (currentState.isConnected) {
        const newState = { 
          chain: null, 
          chainType: null, 
          address: null, 
          isConnected: false 
        };
        rewardsStorage.set(newState);
      }
    }
  }, [isConnected, address]);

  const connect = () => {
    // Use RainbowKit's connect modal
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const disconnect = () => {
    wagmiDisconnect();
    const newState = { 
      chain: null, 
      chainType: null, 
      address: null, 
      isConnected: false 
    };
    rewardsStorage.set(newState);
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected, 
      connect, 
      disconnect, 
      address: address || null,
      isPending: false 
    }}>
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
