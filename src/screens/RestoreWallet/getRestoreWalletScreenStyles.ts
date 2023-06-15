import { StyleSheet } from 'react-native';
import { IDefaults } from '../../shared/styles/defaults';

export const getRestoreWalletScreenStyles = ({ colors, fonts }: IDefaults) => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    mnemonicLabelContainer: {
      marginBottom: 12,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      ...fonts.regularTitle,
    },
    mnemonicInputContainer: {
      backgroundColor: colors.highlight,
      padding: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 10,
    },
    mnemonicInputs: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    mnemonicInput: { width: '25%', height: 40, margin: 12 },
    mnemonicInputField: {
      textAlign: 'center',
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: 'purple',
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
