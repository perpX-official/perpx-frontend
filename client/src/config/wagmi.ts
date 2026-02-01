import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, arbitrum, base, optimism } from 'wagmi/chains';

// WalletConnect Project ID - Get your own at https://cloud.walletconnect.com
// Using a public demo project ID for development
const WALLETCONNECT_PROJECT_ID = '21fef48091f12692cad574a6f7753643';

export const config = getDefaultConfig({
  appName: 'PerpX',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, arbitrum, base, optimism],
  ssr: false, // Disable SSR for client-side only
});
