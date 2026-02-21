import { createConfig, createStorage, http } from 'wagmi';
import { mainnet, arbitrum, base, optimism } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { getMetaMaskProvider } from '@/lib/evmProviders';

// WalletConnect Project ID - https://cloud.walletconnect.com
export const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '7b3c2778deabef041da731133fab3568';

// Metadata for WalletConnect
export const metadata = {
  name: 'PerpX',
  description: 'Next-Gen Perpetual Trading',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://perpx.fi',
  icons: ['/logo.png']
};

// Supported networks
export const networks = [mainnet, arbitrum, base, optimism];

// Fallback storage for non-browser contexts.
const noopStorage = {
  getItem: (_key: string) => null,
  setItem: (_key: string, _value: string) => {},
  removeItem: (_key: string) => {},
};

const wagmiStorage =
  typeof window !== 'undefined' ? window.localStorage : noopStorage;

export const config = createConfig({
  chains: [mainnet, arbitrum, base, optimism],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
  storage: createStorage({
    storage: wagmiStorage
  }),
  // Avoid generic injected wallet discovery (prevents Phantom EVM auto-selection).
  multiInjectedProviderDiscovery: false,
  ssr: false,
  connectors: [
    injected({
      target: {
        id: 'metaMask',
        name: 'MetaMask',
        provider: (window: Window) => getMetaMaskProvider(window),
      },
      shimDisconnect: true,
    }),
    walletConnect({
      projectId,
      metadata,
      showQrModal: false,
      qrModalOptions: {
        explorerRecommendedWalletIds: 'NONE',
      },
    }),
  ]
});
