import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './navigation/MainStack';
import { WalletContainer } from './providers/Wallet/WalletProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useStyles } from './hooks/useStyles';
import { colors } from './shared/styles/colors';
import { useColorScheme } from 'react-native';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';
// import { Ethers } from './providers/EthersContext/EthersContext';

const Navigation = () => {
  const styleColors = useStyles(colors);
  const scheme = useColorScheme();
  const theme = useMemo<Theme>(() => {
    return {
      dark: scheme === 'dark',
      colors: {
        background: styleColors.background,
        border: styleColors.highlight,
        card: styleColors.primary,
        notification: styleColors.primary,
        primary: styleColors.primary,
        text: styleColors.white,
      },
    };
  }, [scheme, styleColors]);
  return (
    <NavigationContainer theme={theme}>
      <MainStack />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <WalletContainer.Provider>
        <Navigation />
      </WalletContainer.Provider>
    </SafeAreaProvider>
  );
}
