import {MainStackNavigationProps} from '../navigation/types/types';
import {ScreenName} from '../navigation/types/ScreenName';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button} from 'react-native';

type ConnectionApprovalScreenProps =
  MainStackNavigationProps<ScreenName.connectionApproval>;

export const ConnectionApprovalScreen: React.FC<
  ConnectionApprovalScreenProps
> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-end'}}>
      <Button title="Approve" onPress={navigation.goBack} />
    </SafeAreaView>
  );
};
