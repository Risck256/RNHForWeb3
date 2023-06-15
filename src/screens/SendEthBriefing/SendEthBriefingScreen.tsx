import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';
import { ethers } from 'ethers';
import { useWallet } from '../../providers/Wallet/useWallet';
import { RNButton } from '../../components/RNButton/RNButton';

type Props = MainStackNavigationProps<ScreenName.sendEthBriefing>;

export const SendEthBriefingScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { wallet } = useWallet();
  const { transaction } = route.params;

  const value = useMemo(() => {
    if (!wallet || !transaction.value) {
      return;
    }

    return ethers.utils.formatUnits(transaction.value, 'ether');
  }, [transaction.value, wallet]);

  const cost = useMemo(() => {
    if (!wallet || !transaction.gasLimit) {
      return;
    }

    return ethers.utils.formatUnits(transaction.gasLimit, 'gwei');
  }, [transaction.gasLimit, wallet]);

  const onConfirmPress = useCallback(async () => {
    if (!wallet) {
      return;
    }

    const signedTransaction = await wallet.signTransaction(transaction);
    const transactionSent = await wallet.provider.sendTransaction(
      signedTransaction,
    );
    navigation.replace(ScreenName.sendEthCompleted, {
      transaction: transactionSent,
    });
  }, [navigation, transaction, wallet]);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, padding: 20 }}>
      <View style={{ flexGrow: 1 }}>
        <Text>Invio a: {transaction.to}</Text>
        <Text>Quantità: {value} sETH</Text>
        <Text>Costo: {cost} sETH</Text>
      </View>

      <RNButton title={'Invia'} onPress={onConfirmPress} />
    </SafeAreaView>
  );
};
