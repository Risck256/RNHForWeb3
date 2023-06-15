import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ethers } from 'ethers';
import { MMKV } from 'react-native-mmkv';
import Config from 'react-native-config';

const storageKeys = {
  PRIVATE_KEY: 'private_key',
  ENCRYPTED_WAllET: 'encrypted_wallet',
  IS_ENCRYPTED: 'is_encrypted',
};

export interface WalletContext {
  readonly isAppReady: boolean;
  readonly wallet?: ethers.Wallet;
  readonly isEncrypted: boolean;
  readonly createWallet: () => ethers.Wallet;
  readonly storeWallet: (
    walletToSave: ethers.Wallet,
    password?: string,
  ) => void;
  readonly restoreEncryptedWallet: (password: string) => void;
  readonly restoreWalletByMnemonic: (mnemonic: string) => ethers.Wallet;
}

const Context = createContext<WalletContext>({
  isAppReady: false,
  wallet: undefined,
  isEncrypted: false,
  createWallet: () => {
    throw Error('createWallet not implemented yet');
  },
  storeWallet: () => {
    throw Error('storeWallet not implement yet');
  },
  restoreEncryptedWallet: () => {
    throw Error('restoreEncryptedWallet not implemented yet');
  },
  restoreWalletByMnemonic: () => {
    throw Error('restoreWalletByMnemonic not implemented yet');
  },
});

const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const storage = useRef(new MMKV()).current;
  const [isAppReady, setIsAppReady] = useState(false);
  const [wallet, setWallet] = useState<ethers.Wallet>();

  const isEncrypted = useMemo(
    () => storage.getBoolean(storageKeys.IS_ENCRYPTED) ?? false,
    [storage],
  );

  const storeWallet = useCallback(
    async (walletToSave: ethers.Wallet, password?: string) => {
      storage.set(storageKeys.IS_ENCRYPTED, !!password?.length);

      if (!password) {
        storage.set(storageKeys.PRIVATE_KEY, walletToSave.privateKey);
        setWallet(walletToSave);
        return;
      }

      const encryptedWallet = await walletToSave.encrypt(password);
      storage.set(storageKeys.ENCRYPTED_WAllET, encryptedWallet);
      setWallet(walletToSave);
    },
    [storage],
  );

  const connectProvider = useCallback((walletToConnect: ethers.Wallet) => {
    const provider = new ethers.providers.JsonRpcProvider(
      Config.PROVIDER_URL,
      Config.PROVIDER_NETWORK,
    );

    const connectedWallet = walletToConnect.connect(provider);
    console.info(connectedWallet.address);
    console.info(connectedWallet.mnemonic);
    return connectedWallet;
  }, []);

  const createWallet = useCallback(() => {
    return connectProvider(ethers.Wallet.createRandom());
  }, [connectProvider]);

  const restoreWalletByPrivateKey = useCallback(() => {
    const privateKey = storage.getString(storageKeys.PRIVATE_KEY);
    if (!privateKey) {
      return;
    }

    return connectProvider(new ethers.Wallet(privateKey));
  }, [connectProvider, storage]);

  const restoreEncryptedWallet = useCallback(
    async (password: string) => {
      const encryptedWallet = storage.getString(storageKeys.ENCRYPTED_WAllET);
      if (!encryptedWallet) {
        await Promise.reject(new Error('Missing encrypted wallet'));
        return;
      }

      try {
        const restoredWallet = connectProvider(
          await ethers.Wallet.fromEncryptedJson(encryptedWallet, password),
        );
        setWallet(restoredWallet);
      } catch (error) {
        await Promise.reject(error);
      }
    },
    [connectProvider, storage],
  );

  const restoreWalletByMnemonic = useCallback(
    (mnemonic: string) => {
      return connectProvider(ethers.Wallet.fromMnemonic(mnemonic));
    },
    [connectProvider],
  );

  useEffect(() => {
    if (isEncrypted) {
      setIsAppReady(true);
      return;
    }

    const restoredWallet = restoreWalletByPrivateKey();
    if (!restoredWallet) {
      setIsAppReady(true);
      return;
    }

    setWallet(() => {
      setIsAppReady(true);
      return restoredWallet;
    });
  }, [isEncrypted, restoreWalletByPrivateKey]);

  return (
    <Context.Provider
      value={{
        isAppReady,
        wallet,
        isEncrypted,
        createWallet,
        storeWallet,
        restoreEncryptedWallet,
        restoreWalletByMnemonic,
      }}>
      {children}
    </Context.Provider>
  );
};

export const WalletContainer = {
  Context,
  Provider,
};
