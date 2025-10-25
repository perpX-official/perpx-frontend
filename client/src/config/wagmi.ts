import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, base, optimism } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, arbitrum, base, optimism],
  connectors: [
    injected(),
    walletConnect({ projectId: 'YOUR_PROJECT_ID' }),
    coinbaseWallet({ appName: 'PerpX' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
})

