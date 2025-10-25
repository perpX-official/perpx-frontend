import { http } from 'wagmi'
import { mainnet, arbitrum, base, optimism } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'PerpX',
  projectId: 'c0d6e8e3c8f8b4c5e6f7a8b9c0d1e2f3',
  chains: [mainnet, arbitrum, base, optimism],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
  },
})

