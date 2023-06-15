import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { useWallet } from '../../providers/Wallet/useWallet';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';

type Props = MainStackNavigationProps<ScreenName.unlockWallet>;

export const UnlockWalletScreen: React.FC<Props> = ({ navigation }) => {
  const [password, setPassword] = useState<string>();
  const { restoreEncryptedWallet } = useWallet();

  const onUnlockWallet = useCallback(async () => {
    if (!password) {
      return;
    }

    try {
      await restoreEncryptedWallet(password);
      navigation.goBack();
    } catch (e) {
      const error = e as Error;
      Alert.alert('Warning!', error.message);
    }
  }, [navigation, password, restoreEncryptedWallet]);

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <Text>Password</Text>
        <View>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 12,
              backgroundColor: 'white',
              padding: 20,
            }}
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <Button title="Unlock" onPress={onUnlockWallet} />
    </SafeAreaView>
  );
};
