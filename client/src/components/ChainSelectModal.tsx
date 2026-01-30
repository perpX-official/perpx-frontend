import React from "react";
import type { ChainKind } from "../lib/rewardsStorage";

export function ChainSelectModal(props: {
  open: boolean;
  onClose: () => void;
  onSelect: (chain: ChainKind) => void;
}) {
  if (!props.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={props.onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-white">Select Chain</div>
          <button className="rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15 transition text-white" onClick={props.onClose}>
            Close
          </button>
        </div>
        <div className="mt-4 space-y-3">
          <ChainButton label="EVM (MetaMask / WalletConnect)" onClick={() => props.onSelect("evm")} />
          <ChainButton label="Solana (Phantom etc.)" onClick={() => props.onSelect("sol")} />
          <ChainButton label="Tron (TronLink etc.)" onClick={() => props.onSelect("tron")} />
        </div>
        <div className="mt-4 text-xs opacity-60 text-white">
          ※ テスト段階：チェーン選択後の接続実装は暫定でも良い（後で差し替え）
        </div>
      </div>
    </div>
  );
}

function ChainButton(props: { label: string; onClick: () => void }) {
  return (
    <button
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 transition text-white"
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
