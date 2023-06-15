import { ScreenName } from './ScreenName';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { ethers } from 'ethers';

export type ScreenNamesWithCameraAccess = ScreenName.connection;

export type RouteMainStackParamsList = {
  [ScreenName.splash]: undefined;
  [ScreenName.connection]: { code?: string };
  [ScreenName.camera]: { previousRoute: ScreenNamesWithCameraAccess };
  [ScreenName.connectionApproval]: { code: string };
  [ScreenName.createWallet]: undefined;
  [ScreenName.unlockWallet]: undefined;
  [ScreenName.restoreWallet]: undefined;
  [ScreenName.dashboard]: undefined;
  [ScreenName.sendEth]: {
    balance: string;
  };
  [ScreenName.sendEthBriefing]: {
    transaction: ethers.providers.TransactionRequest;
  };
  [ScreenName.receiveEth]: undefined;
  [ScreenName.sendEthCompleted]: {
    transaction: ethers.providers.TransactionResponse;
  };
};

export type MainStackNavigationProps<
  T extends ScreenName,
  Params extends ParamListBase = RouteMainStackParamsList,
> = NativeStackScreenProps<Params, T>;
