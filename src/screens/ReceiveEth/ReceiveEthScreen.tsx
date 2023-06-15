import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWallet } from '../../providers/Wallet/useWallet';
import { QRAddressInfo } from '../../components/QRAddressInfo/QRAddressInfo';
import { View } from "react-native";

export const ReceiveEthScreen = () => {
  const { wallet } = useWallet();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <QRAddressInfo address={wallet?.address} />
      </View>
    </SafeAreaView>
  );
};
