import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking, Text, View } from 'react-native';
import { MainStackNavigationProps } from '../../navigation/types/types';
import { ScreenName } from '../../navigation/types/ScreenName';
import { RNButton } from '../../components/RNButton/RNButton';
import Config from 'react-native-config';

type Props = MainStackNavigationProps<ScreenName.sendEthCompleted>;

export const SendEthCompletedScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { transaction } = route.params;

  const onSeeEthScanTransactionPress = useCallback(async () => {
    const url = `${Config.ETHSCAN_TX_URL}/${transaction.hash}`;
    const canOpenUrl = Linking.canOpenURL(url);
    if (!canOpenUrl) {
      return;
    }

    await Linking.openURL(url);
  }, [transaction.hash]);

  const onGoToDashboardPress = useCallback(
    () => navigation.navigate(ScreenName.dashboard),
    [navigation],
  );

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, padding: 20 }}>
      <View style={{ flexGrow: 1 }}>
        <Text>Transazione inviata</Text>
        <Text>
          Puoi verificarne l'andamento su EthScan, premendo su questo{' '}
          <Text onPress={onSeeEthScanTransactionPress}>Link</Text>
        </Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <RNButton
          title={'Torna alla dashboard'}
          onPress={onGoToDashboardPress}
        />
      </View>
    </SafeAreaView>
  );
};
