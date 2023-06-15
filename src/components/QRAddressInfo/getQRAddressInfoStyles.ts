import { StyleSheet } from "react-native";

export const getQRAddressInfoStyles = () => {
  return StyleSheet.create({
    qrCodeContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 20,
      alignItems: 'center',
    },
    svg: {
      overflow: 'hidden',
      marginBottom: 20,
    },
    addressText: {
      fontFamily: 'OpenSans-Regular',
    },
  });
};
