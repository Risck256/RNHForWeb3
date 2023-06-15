import { IDefaults } from '../../shared/styles/defaults';
import { StyleSheet } from 'react-native';

export const getDashboardScreenStyle = ({ fonts, colors }: IDefaults) => {
  return StyleSheet.create({
    flex: {
      flex: 1,
      paddingHorizontal: 12,
      paddingBottom: 12,
      backgroundColor: colors.background,
    },
    container: {
      padding: 20,
    },
    createContainer: {
      justifyContent: 'center',
    },
    title: {
      ...fonts.title,
    },
    description: {
      ...fonts.description,
    },
    balanceContainer: {
      alignItems: 'center',
      marginBottom: 24,
    },
    balanceLabel: {
      ...fonts.regularTitle,
      marginBottom: 12,
    },
    balance: {
      ...fonts.title,
      marginBottom: 4,
    },
    balanceCoin: {
      ...fonts.description,
    },
    addressContainer: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      paddingBottom: 12,
      marginBottom: 22,
    },
    addressTitle: {
      ...fonts.regularText,
      marginBottom: 8,
    },
    addressValueAndCopyContainer: {
      flexDirection: 'row',
    },
    addressValueContainer: {
      width: '90%',
    },
    addressValue: {
      ...fonts.regularText,
      marginRight: 15,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 12,
    },
    sizedBox: { width: 20 },
    transactionsLabel: { alignSelf: 'center' },
    listEmptyComponentContainer: { flex: 1, justifyContent: 'center' },
    listEmptyComponentText: { textAlign: 'center' },
    transactionsContentContainer: {
      flexGrow: 1,
    },
    transactionContainer: { marginBottom: 12 },
    transactionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    itemSeparatorComponent: {
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      marginBottom: 12,
    },
  });
};
