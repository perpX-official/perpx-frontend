import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { rewardsStorage, type RewardsState, type ChainKind } from '@/lib/rewardsStorage';

// Demo wallet address for demo mode
const DEMO_WALLET_ADDRESS = '0xDE286bcD39d0a6C106871e106871106871106871';
const DEMO_MODE_KEY = 'demoMode';
const DEMO_MODE_ENABLED = import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_MODE === 'true';

function getDemoModeFromStorage() {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(DEMO_MODE_KEY) === 'true';
  if (!DEMO_MODE_ENABLED && stored) {
    // Prevent accidental permanent "connected" state in production.
    localStorage.removeItem(DEMO_MODE_KEY);
    return false;
  }
  return DEMO_MODE_ENABLED && stored;
}

function isOAuthReturnUrl(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const success = params.get('success') || '';
  const error = params.get('error') || '';
  return /^(x_|discord_)/.test(success) || /^(x_|discord_)/.test(error);
}

function getStoredConnectedState(): RewardsState | null {
  if (typeof window === 'undefined') return null;
  const stored = rewardsStorage.get();
  if (stored.isConnected && stored.address && stored.chain && stored.chainType) {
    return stored;
  }
  return null;
}

export function useRewardsState() {
  // Use WalletContext for ALL chain state (including EVM)
  // Do NOT use wagmi's useAccount directly - WalletContext handles EVM filtering
  const { address: walletAddress, activeChain, isConnected: walletConnected } = useWallet();
  
  // Check for demo mode
  const [isDemoMode, setIsDemoMode] = useState(getDemoModeFromStorage);
  
  const [state, setState] = useState<RewardsState>(() => {
    // Check demo mode first
    if (getDemoModeFromStorage()) {
      return {
        chain: 'evm' as ChainKind,
        chainType: 'evm' as const,
        address: DEMO_WALLET_ADDRESS,
        isConnected: true
      };
    }
    // Check active chain from WalletContext
    if (walletConnected && walletAddress && activeChain) {
      const chainKind: ChainKind = activeChain === 'sol' ? 'sol' : activeChain === 'tron' ? 'tron' : 'evm';
      const chainType = activeChain === 'sol' ? 'solana' as const : activeChain === 'tron' ? 'tron' as const : 'evm' as const;
      return { chain: chainKind, chainType, address: walletAddress, isConnected: true };
    }
    // During OAuth callback round-trip, keep previous wallet state to avoid disconnect flicker.
    if (isOAuthReturnUrl()) {
      const stored = getStoredConnectedState();
      if (stored) return stored;
    }
    return { chain: null, chainType: null, address: null, isConnected: false };
  });

  // Listen for demo mode changes
  useEffect(() => {
    const checkDemoMode = () => {
      setIsDemoMode(getDemoModeFromStorage());
    };
    
    // Check on mount and listen for storage changes
    checkDemoMode();
    window.addEventListener('storage', checkDemoMode);
    
    return () => window.removeEventListener('storage', checkDemoMode);
  }, []);

  // Sync state with wallet connections or demo mode
  useEffect(() => {
    // Demo mode takes priority
    if (DEMO_MODE_ENABLED && isDemoMode) {
      const newState: RewardsState = {
        chain: 'evm' as ChainKind,
        chainType: 'evm' as const,
        address: DEMO_WALLET_ADDRESS,
        isConnected: true
      };
      setState(newState);
      rewardsStorage.set(newState);
      return;
    }
    
    // Use WalletContext state (already filters out unwanted EVM auto-connects)
    if (walletConnected && walletAddress && activeChain) {
      const chainKind: ChainKind = activeChain === 'sol' ? 'sol' : activeChain === 'tron' ? 'tron' : 'evm';
      const chainType = activeChain === 'sol' ? 'solana' as const : activeChain === 'tron' ? 'tron' as const : 'evm' as const;
      const newState: RewardsState = {
        chain: chainKind,
        chainType,
        address: walletAddress,
        isConnected: true
      };
      setState(newState);
      rewardsStorage.set(newState);
      return;
    }
    
    // Nothing connected
    // Keep prior connected state only during OAuth callback return.
    if (isOAuthReturnUrl()) {
      const stored = getStoredConnectedState();
      if (stored) {
        setState(stored);
        return;
      }
    }

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
  }, [walletConnected, walletAddress, activeChain, isDemoMode]);

  return state;
}
