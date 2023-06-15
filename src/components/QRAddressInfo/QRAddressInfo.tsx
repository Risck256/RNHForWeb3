import React, { memo } from 'react';
import QRCodeStyled from 'react-native-qrcode-styled';
import { Text, View } from 'react-native';
import { useStyles } from '../../hooks/useStyles';
import { getQRAddressInfoStyles } from './getQRAddressInfoStyles';

interface QRAddressInfoProps {
  address?: string;
}
export const QRAddressInfo = memo<QRAddressInfoProps>(({ address }) => {
  const styles = useStyles(getQRAddressInfoStyles);
  if (!address) {
    return null;
  }
  return (
    <View style={styles.qrCodeContainer}>
      <QRCodeStyled
        data={address}
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
      <Text style={styles.addressText}>{address}</Text>
    </View>
  );
});
