import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouteMainStackParamsList } from './types/types';
import { ScreenName } from './types/ScreenName';
import { DashboardScreen } from '../screens/Dashboard/DashboardScreen';
import { SendEthScreen } from '../screens/SendEth/SendEthScreen';
import { SendEthBriefingScreen } from '../screens/SendEthBriefing/SendEthBriefingScreen';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import { useWallet } from '../providers/Wallet/useWallet';
import { ReceiveEthScreen } from '../screens/ReceiveEth/ReceiveEthScreen';
import { CreateWalletScreen } from '../screens/CreateWallet/CreateWalletScreen';
import { SendEthCompletedScreen } from '../screens/SendEthCompleted/SendEthCompletedScreen';
import { UnlockWalletScreen } from '../screens/UnlockWallet/UnlockWalletScreen';
import { RestoreWalletScreen } from '../screens/RestoreWallet/RestoreWalletScreen';

const Stack = createNativeStackNavigator<RouteMainStackParamsList>();

export const MainStack = () => {
  const { isAppReady } = useWallet();
  const Screens = useMemo(() => {
    if (!isAppReady) {
      return (
        <Stack.Screen
          options={{ headerShown: false }}
          name={ScreenName.splash}
          component={SplashScreen}
        />
      );
    }
    return (
      <Stack.Group>
        <Stack.Screen
          options={{ headerShown: false }}
          name={ScreenName.dashboard}
          component={DashboardScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.sendEth}
          component={SendEthScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.sendEthBriefing}
          component={SendEthBriefingScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.receiveEth}
          component={ReceiveEthScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.createWallet}
          component={CreateWalletScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.unlockWallet}
          component={UnlockWalletScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.restoreWallet}
          component={RestoreWalletScreen}
        />
        <Stack.Screen
          options={{ presentation: 'formSheet' }}
          name={ScreenName.sendEthCompleted}
          component={SendEthCompletedScreen}
        />
      </Stack.Group>
    );
  }, [isAppReady]);

  return <Stack.Navigator>{Screens}</Stack.Navigator>;
};
