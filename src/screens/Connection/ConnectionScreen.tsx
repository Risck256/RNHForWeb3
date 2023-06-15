import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';
import { useStyles } from '../../hooks/useStyles';
import { getConnectionScreenStyles } from './getConnectionScreenStyles';
import QRCodeStyled from 'react-native-qrcode-styled';
import { useWallet } from '../../providers/Wallet/useWallet';

type ConnectionScreenProps = MainStackNavigationProps<ScreenName.connection>;
export const ConnectionScreen: React.FC<ConnectionScreenProps> = ({
  navigation,
  route,
}) => {
  const { wallet } = useWallet();
  const styles = useStyles(getConnectionScreenStyles);
  // const { hasPrivateKey, getWallet } = useEthers();
  // useEffect(() => {
  //   console.warn(hasPrivateKey);
  //   if (!hasPrivateKey) {
  //     navigation.navigate(ScreenName.createWallet);
  //     return;
  //   }
  //   setWallet(getWallet());
  // }, [getWallet, hasPrivateKey, navigation]);
  return (
    <SafeAreaView style={styles.safeArea}>
      {wallet && (
        <View style={styles.qrCodeContainer}>
          <QRCodeStyled
            data={wallet.address}
            style={styles.svg}
            pieceSize={10}
            pieceCornerType={'rounded'}
            pieceBorderRadius={4}
            isPiecesGlued
            gradient={{
              type: 'radial',
              options: {
                center: [0.5, 0.5],
                radius: [1, 1],
                colors: ['#ff7bc6', '#0f0080'],
                locations: [0, 1],
              },
            }}
            outerEyesOptions={{
              topLeft: {
                borderRadius: [20, 20, 0, 20],
              },
              topRight: {
                borderRadius: [20, 20, 20],
              },
              bottomLeft: {
                borderRadius: [20, 0, 20, 20],
              },
            }}
            innerEyesOptions={{
              borderRadius: 10,
              scale: 0.85,
            }}
          />
          <Text style={{ textAlign: 'center' }}>{wallet.address}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
