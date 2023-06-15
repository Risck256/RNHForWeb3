import React from 'react';
import { MainStackNavigationProps } from '../navigation/types/types';
import { ScreenName } from '../navigation/types/ScreenName';

type CameraScreenProps = MainStackNavigationProps<ScreenName.camera>;
export const CameraScreen: React.FC<CameraScreenProps> = ({
  navigation,
  route,
}) => {
  return null;
};
