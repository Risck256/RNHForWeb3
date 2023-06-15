import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';
import { Images } from '../../assets/images';
import Clipboard from '@react-native-clipboard/clipboard';
import { useWallet } from '../../providers/Wallet/useWallet';
import { ethers } from 'ethers';
import { useStyles } from '../../hooks/useStyles';
import { getSendEthScreenStyles } from './getSendEthScreenStyles';
import { RNButton } from '../../components/RNButton/RNButton';

type Props = MainStackNavigationProps<ScreenName.sendEth>;

export const SendEthScreen: React.FC<Props> = ({ navigation, route }) => {
  const { balance } = route.params;

  const styles = useStyles(getSendEthScreenStyles);
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>();

  const { wallet } = useWallet();

  const prepareTransaction = useCallback(async () => {
    if (!wallet) {
      throw Error('wallet not ready');
    }

    try {
      // https://docs.ethers.org/v5/api/providers/types/#types--transactions > To understand transaction interface
      // https://chainid.network/ > To map chainID value to selected ethereum net
      // https://eth-converter.com/ > To convert from/to WEI/G_WEI/ETH > Note: 1 ETH = 1000000000000000000

      const weiAmount = ethers.utils.parseUnits(amount!, 'ether');
      return await wallet.populateTransaction({
        to: address,
        value: weiAmount,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }, [address, amount, wallet]);

  const validateForm = useCallback(() => {
    if (!address?.length || !amount?.length) {
      return false;
    }

    if (!address.startsWith('0x')) {
      return false;
    }

    const amountNumber = Number(amount);
    return !isNaN(amountNumber) && !!amountNumber;
  }, [address, amount]);

  const onPastePress = useCallback(async () => {
    const possibleAddress = await Clipboard.getString();
    setAddress(possibleAddress);
  }, []);

  const onQrCodeScannerPress = useCallback(() => {
    // TODO: IMPLEMENT CODE SCANNER USING CAMERA
    // navigation.navigate(ScreenName.camera);
  }, []);

  const onMaxPress = useCallback(async () => {
    if (!wallet) {
      return;
    }
    setAmount(balance);
  }, [balance, wallet]);

  const onNextPress = useCallback(async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    const transaction = await prepareTransaction();
    navigation.navigate(ScreenName.sendEthBriefing, { transaction });
  }, [navigation, prepareTransaction, validateForm]);

  const AddressInput = useMemo(
    () => (
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.flex, styles.input]}
          placeholder={'Address'}
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={{ marginRight: 20 }} onPress={onPastePress}>
          <Text style={styles.buttonInputText}>Paste</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onQrCodeScannerPress}>
          <Image source={Images.qrCodeScanner} />
        </TouchableOpacity>
      </View>
    ),
    [
      address,
      onPastePress,
      onQrCodeScannerPress,
      styles.buttonInputText,
      styles.flex,
      styles.input,
      styles.inputContainer,
    ],
  );

  const AmountInput = useMemo(
    () => (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.flex, styles.input]}
            placeholder={'Amount in ethers'}
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity onPress={onMaxPress}>
            <Text style={styles.buttonInputText}>Max</Text>
          </TouchableOpacity>
        </View>
        <Text>Your Balance: {balance} sETH</Text>
      </View>
    ),
    [
      amount,
      balance,
      onMaxPress,
      styles.buttonInputText,
      styles.flex,
      styles.input,
      styles.inputContainer,
    ],
  );

  return (
    <SafeAreaView edges={['bottom']} style={styles.flex}>
      <View style={[styles.flex, styles.container]}>
        <View style={styles.flex}>
          {AddressInput}
          {AmountInput}
        </View>
        <RNButton title={'Next'} onPress={onNextPress} />
      </View>
    </SafeAreaView>
  );
};
