import SignClient from '@walletconnect/sign-client';
import { Core } from '@walletconnect/core';
import { WALLETCONNECT_PROJECT_ID, WC_METADATA } from '@/config/walletConstants';

let clientPromise: Promise<SignClient> | null = null;

export function getWalletConnectClient() {
  // Keep a single client across chunks/loads (desktop/mobile, code-split routes).
  const globalKey = '__PERPX_WC_SIGN_CLIENT_PROMISE__';
  const w = window as Window & { [globalKey]?: Promise<SignClient> };

  if (w[globalKey]) {
    return w[globalKey] as Promise<SignClient>;
  }

  if (!clientPromise) {
    const core = new Core({
      projectId: WALLETCONNECT_PROJECT_ID,
      customStoragePrefix: 'perpx-signclient-v1',
    });

    clientPromise = SignClient.init({
      core,
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata: WC_METADATA,
    });

    clientPromise.catch(() => {
      clientPromise = null;
      delete w[globalKey];
    });
  }

  w[globalKey] = clientPromise;
  return clientPromise;
}
