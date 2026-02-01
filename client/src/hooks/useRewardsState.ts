import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { rewardsStorage, type RewardsState, type ChainKind } from '@/lib/rewardsStorage';

export function useRewardsState() {
  // Use wagmi for the source of truth
  const { address, isConnected } = useAccount();
  
  const [state, setState] = useState<RewardsState>(() => {
    if (isConnected && address) {
      return {
        chain: 'evm' as ChainKind,
        chainType: 'evm' as const,
        address: address,
        isConnected: true
      };
    }
    return { chain: null, chainType: null, address: null, isConnected: false };
  });

  // Sync state with wagmi
  useEffect(() => {
    if (isConnected && address) {
      const newState: RewardsState = {
        chain: 'evm' as ChainKind,
        chainType: 'evm' as const,
        address: address, // Full address from wagmi
        isConnected: true
      };
      setState(newState);
      rewardsStorage.set(newState);
    } else {
      const newState: RewardsState = { 
        chain: null, 
        chainType: null, 
        address: null, 
        isConnected: false 
      };
      setState(newState);
      // Only clear storage if we were previously connected
      const currentStorage = rewardsStorage.get();
      if (currentStorage.isConnected) {
        rewardsStorage.set(newState);
      }
    }
  }, [isConnected, address]);

  return state;
}
