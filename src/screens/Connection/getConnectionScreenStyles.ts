import { StyleSheet } from 'react-native';
import { IDefaults } from '../../shared/styles/defaults';

export const getConnectionScreenStyles = ({}: IDefaults) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    createContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
  });
};
