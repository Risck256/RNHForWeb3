import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, View } from 'react-native';
import { ethers } from 'ethers';
import { useWallet } from '../../providers/Wallet/useWallet';
import { useStyles } from '../../hooks/useStyles';
import { getCreateWalletScreenStyles } from './getCreateWalletScreenStyles';
import { RNButton } from '../../components/RNButton/RNButton';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';

type CreateWalletScreenProps =
  MainStackNavigationProps<ScreenName.createWallet>;
export const CreateWalletScreen: React.FC<CreateWalletScreenProps> = ({
  navigation,
}) => {
  const styles = useStyles(getCreateWalletScreenStyles);
  const { storeWallet, createWallet } = useWallet();
  const [password, setPassword] = useState('');
  const [wallet, setWallet] = useState<ethers.Wallet>();

  const onCreateWallet = useCallback(() => {
    if (!wallet) {
      return;
    }

    storeWallet(wallet, password);
    navigation.goBack();
  }, [navigation, password, storeWallet, wallet]);

  useEffect(() => {
    setWallet(createWallet());
  }, [createWallet]);

  return (
    <SafeAreaView edges={['bottom']} style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.flex}>
          <Text style={styles.title}>
            Please, save this phrase somewhere before to proceed:
          </Text>
          <View style={{ height: 50 }} />
          <View style={styles.mnemonicContainer}>
            {wallet?.mnemonic.phrase.split(' ').map(word => (
              <View key={word} style={styles.phraseContainer}>
                <Text style={styles.word}>{word}</Text>
              </View>
            ))}
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder={'Password (Optional)'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        <RNButton title="Create" onPress={onCreateWallet} />
      </View>
    </SafeAreaView>
  );
};
