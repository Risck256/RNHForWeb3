import { StyleSheet } from 'react-native';
import { IDefaults } from '../../shared/styles/defaults';

export const getRNButtonStyles = ({ colors, fonts }: IDefaults) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    title: {
      ...fonts.regularTitle,
      color: colors.white,
    },
  });
};
