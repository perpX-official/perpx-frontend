export type ChainKind = "evm" | "sol" | "tron";

export interface RewardsState {
  chain: ChainKind | null;
  address: string | null;
  isConnected: boolean;
}

// Simple storage helper if needed later
export const rewardsStorage = {
  get: (): RewardsState => {
    try {
      const data = localStorage.getItem("perpx_rewards_state");
      return data ? JSON.parse(data) : { chain: null, address: null, isConnected: false };
    } catch {
      return { chain: null, address: null, isConnected: false };
    }
  },
  set: (state: RewardsState) => {
    localStorage.setItem("perpx_rewards_state", JSON.stringify(state));
  }
};
