import { StyleSheet } from 'react-native';
import { IDefaults } from '../../shared/styles/defaults';

export const getCreateWalletScreenStyles = ({ colors, fonts }: IDefaults) => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      ...fonts.regularTitle,
    },
    mnemonicContainer: {
      backgroundColor: colors.highlight,
      padding: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 10,
    },
    phraseContainer: {
      backgroundColor: colors.highlightText,
      padding: 5,
      borderRadius: 5,
      margin: 5,
    },
    word: {
      ...fonts.regularText,
    },
    password: {
      ...fonts.regularText,
      marginVertical: 20,
    },
    input: {
      backgroundColor: colors.highlight,
      borderRadius: 12,
      padding: 20,
      marginTop: 40,
      color: colors.primaryText,
    },
  });
};
