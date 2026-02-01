import { createAppKit } from '@reown/appkit/react';
import { mainnet, arbitrum, base, optimism } from '@reown/appkit/networks';
import { wagmiAdapter, projectId, metadata } from './wagmi';

// Create the AppKit modal instance
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, arbitrum, base, optimism] as const,
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#0ABAB5',
    '--w3m-border-radius-master': '8px',
  }
});
