import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, arbitrum, base, optimism } from '@reown/appkit/networks';
import { cookieStorage, createStorage } from '@wagmi/core';

// WalletConnect Project ID - https://cloud.walletconnect.com
export const projectId = '7b3c2778deabef041da731133fab3568';

// Metadata for WalletConnect
export const metadata = {
  name: 'PerpX',
  description: 'Next-Gen Perpetual Trading',
  url: 'https://perpx.fi',
  icons: ['https://perpx.fi/perpx-icon.png']
};

// Supported networks
export const networks = [mainnet, arbitrum, base, optimism];

// Create wagmi adapter for AppKit
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: false,
  projectId,
  networks
});

// Export config for WagmiProvider
export const config = wagmiAdapter.wagmiConfig;
