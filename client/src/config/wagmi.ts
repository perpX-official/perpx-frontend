import { http, createConfig } from 'wagmi'
import { mainnet, arbitrum, base, optimism } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, arbitrum, base, optimism],
  connectors: [
    injected(), // MetaMask and other injected wallets
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
})
