import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Text, TextInput, View } from 'react-native';
import { useWallet } from '../../providers/Wallet/useWallet';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';
import { RNButton } from '../../components/RNButton/RNButton';
import Clipboard from '@react-native-clipboard/clipboard';

type Props = MainStackNavigationProps<ScreenName.restoreWallet>;

export const RestoreWalletScreen: React.FC<Props> = ({ navigation }) => {
  const styles = useStyles(getRestoreWalletScreenStyles);

  const [words, setWords] = useState<string[]>(new Array(12).fill(''));
  const [password, setPassword] = useState<string>('');
  const { restoreWalletByMnemonic, storeWallet } = useWallet();

  const onChangeWord = useCallback(
    (index: number) => {
      return (value: string) => {
        const updatedWords = [
          ...words.slice(0, index),
          value.toLowerCase(),
          ...words.slice(index + 1),
        ];
        setWords(updatedWords);
      };
    },
    [words],
  );

  const onPastePress = useCallback(async () => {
    const phrase = await Clipboard.getString();
    if (!phrase.length) {
      return;
    }

    const possibleWords = phrase.toLowerCase().split(' ');
    const placeholders = new Array(12).fill('');
    setWords(
      placeholders.map(
        (placeholder, index) => possibleWords[index] ?? placeholder,
      ),
    );
  }, []);

  const onRestoreWallet = useCallback(async () => {
    const isInvalid = words.some(word => !word?.length);
    if (isInvalid) {
      return;
    }

    try {
      restoreWalletByMnemonic(words.join(' '));
      navigation.goBack();
    } catch (e) {
      const error = e as Error;
      Alert.alert('Warning!', error.message);
    }
  }, [navigation, password, restoreWalletByMnemonic, storeWallet, words]);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, padding: 20 }}>
      <View style={styles.flex}>
        <View style={styles.mnemonicLabelContainer}>
          <Text>Mnemonic Phrase</Text>
        </View>
        <View style={styles.mnemonicInputContainer}>
          <View style={styles.mnemonicInputs}>
            {words.map((word, index) => (
              <View key={String(index)} style={styles.mnemonicInput}>
                <TextInput
                  style={styles.mnemonicInputField}
                  value={word}
                  onChangeText={onChangeWord(index)}
                />
              </View>
            ))}
          </View>
          <RNButton title={'Paste'} onPress={onPastePress} />
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
      <RNButton title="Restore" onPress={onRestoreWallet} />
    </SafeAreaView>
  );
};
