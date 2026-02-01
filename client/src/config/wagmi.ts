import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, arbitrum, base, optimism } from 'wagmi/chains';

// WalletConnect Project ID - Get your own at https://cloud.walletconnect.com
// This is a demo project ID for development purposes
const WALLETCONNECT_PROJECT_ID = 'c4f79cc821944d9680842e34466bfb';

export const config = getDefaultConfig({
  appName: 'PerpX',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, arbitrum, base, optimism],
  ssr: false, // Disable SSR for client-side only
});
