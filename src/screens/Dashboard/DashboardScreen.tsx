import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  FlatList,
  Image,
  Linking,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';
import { useWallet } from '../../providers/Wallet/useWallet';
import { useStyles } from '../../hooks/useStyles';
import { getDashboardScreenStyle } from './getDashboardScreenStyle';
import { RNButton } from '../../components/RNButton/RNButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { Images } from '../../assets/images';
import { ethers } from 'ethers';
import { ETHScanAPIs } from '../../api/ethScan/ethScan.api';
import { AccountTransaction } from '../../api/ethScan/ethScan.schemas';
import Config from 'react-native-config';

type Props = MainStackNavigationProps<ScreenName.dashboard>;

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles(getDashboardScreenStyle);

  const [balance, setBalance] = useState<string>();
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);
  const { wallet, isEncrypted } = useWallet();

  const onSendPress = useCallback(async () => {
    if (!wallet || !balance) {
      return;
    }
    navigation.navigate(ScreenName.sendEth, { balance });
  }, [balance, navigation, wallet]);

  const onReceivePress = useCallback(() => {
    if (!wallet) {
      return;
    }
    navigation.navigate(ScreenName.receiveEth);
  }, [navigation, wallet]);

  const onUnlockWallet = useCallback(() => {
    navigation.navigate(ScreenName.unlockWallet);
  }, [navigation]);

  const onCreateWallet = useCallback(() => {
    navigation.navigate(ScreenName.createWallet);
  }, [navigation]);

  const onRestorePress = useCallback(() => {
    navigation.navigate(ScreenName.restoreWallet);
  }, [navigation]);

  const onCopyAddressPress = useCallback(() => {
    if (!wallet?.address) {
      return;
    }

    Clipboard.setString(wallet.address);
  }, [wallet?.address]);

  const onOpenTransactionInEthScan = useCallback((transactionHash: string) => {
    return async () => {
      const url = `${Config.ETHSCAN_TX_URL}/${transactionHash}`;
      const canOpenUrl = Linking.canOpenURL(url);
      if (!canOpenUrl) {
        return;
      }

      await Linking.openURL(url);
    };
  }, []);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    const run = async () => {
      try {
        const weiBalance = await wallet.getBalance();
        setBalance(ethers.utils.formatEther(weiBalance));
      } catch (e) {
        console.warn('e', e);
      }
    };

    run();
  }, [wallet]);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    const run = async () => {
      try {
        const response = await ETHScanAPIs.getTransactionsFor(wallet.address);
        if (!response) {
          return;
        }
        setTransactions(response.result);
      } catch (e) {
        console.warn('e', e);
      }
    };

    run();
  }, [wallet]);

  const renderBalance = useCallback(() => {
    if (!balance) {
      return null;
    }

    return (
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Your Balance</Text>
        <Text style={styles.balance}>{balance}</Text>
        <Text style={styles.balanceCoin}>sETH</Text>
      </View>
    );
  }, [
    balance,
    styles.balance,
    styles.balanceCoin,
    styles.balanceContainer,
    styles.balanceLabel,
  ]);

  const ListHeaderComponent = useMemo(
    () => (
      <View style={styles.flex}>
        {renderBalance()}
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Address</Text>
          <TouchableOpacity onPress={onCopyAddressPress}>
            <View style={styles.addressValueAndCopyContainer}>
              <View style={styles.addressValueContainer}>
                <Text style={styles.addressValue}>{wallet!.address}</Text>
              </View>
              <Image source={Images.copy} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.actionsContainer}>
          <View style={styles.flex}>
            <RNButton title="Send" onPress={onSendPress} />
          </View>
          <View style={styles.sizedBox} />
          <View style={styles.flex}>
            <RNButton title="Receive" onPress={onReceivePress} />
          </View>
        </View>
        <View style={styles.transactionsLabel}>
          <Text style={styles.balanceLabel}>Your Transactions</Text>
        </View>
      </View>
    ),
    [
      onCopyAddressPress,
      onReceivePress,
      onSendPress,
      renderBalance,
      styles.actionsContainer,
      styles.addressContainer,
      styles.addressTitle,
      styles.addressValue,
      styles.addressValueAndCopyContainer,
      styles.addressValueContainer,
      styles.balanceLabel,
      styles.flex,
      styles.sizedBox,
      styles.transactionsLabel,
      wallet,
    ],
  );

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.listEmptyComponentContainer}>
        <Text style={styles.listEmptyComponentText}>
          There are no transactions yet. Make some using Send/Receive
        </Text>
      </View>
    ),
    [styles.listEmptyComponentContainer, styles.listEmptyComponentText],
  );

  const renderItem = useCallback<ListRenderItem<AccountTransaction>>(
    ({ item }) => {
      return (
        <TouchableOpacity onPress={onOpenTransactionInEthScan(item.hash)}>
          <View style={styles.transactionContainer}>
            <View style={styles.transactionHeader}>
              <Text>Transaction</Text>
              <Text>
                {new Date(Number(item.timeStamp) * 1000).toDateString()}
              </Text>
            </View>
            <Text>{item.hash}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [
      onOpenTransactionInEthScan,
      styles.transactionContainer,
      styles.transactionHeader,
    ],
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.itemSeparatorComponent} />,
    [styles.itemSeparatorComponent],
  );

  if (!wallet) {
    const title = isEncrypted
      ? 'You wallet is locked.'
      : "It seems you don't have a wallet yet.";
    const btnTitle = isEncrypted ? 'Unlock' : 'Create';
    const onPress = isEncrypted ? onUnlockWallet : onCreateWallet;

    return (
      <SafeAreaView style={styles.flex}>
        <View style={[styles.flex, styles.container]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>Unlock or restore one!</Text>
          <View style={[styles.flex, styles.createContainer]}>
            <RNButton title={btnTitle} onPress={onPress} />
          </View>
          <Button color="#653c9b" title="Restore" onPress={onRestorePress} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <FlatList
        bounces={false}
        contentContainerStyle={styles.transactionsContentContainer}
        data={transactions}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </SafeAreaView>
  );
};
