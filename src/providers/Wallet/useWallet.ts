import { useContext } from 'react';
import { WalletContainer, WalletContext } from './WalletProvider';

export const useWallet = () =>
  useContext<WalletContext>(WalletContainer.Context);
