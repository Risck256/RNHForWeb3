import { StyleSheet } from 'react-native';
import { IDefaults } from '../../shared/styles/defaults';

export const getSendEthScreenStyles = ({ colors, fonts }: IDefaults) => {
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      padding: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 12,
      padding: 12,
      marginBottom: 20,
      backgroundColor: colors.highlightText,
    },
    input: {
      color: colors.primaryText,
    },
    buttonInputText: {
      ...fonts.smallText,
    },
    rowContainer: {
      flexDirection: 'row',
    },
  });
};
