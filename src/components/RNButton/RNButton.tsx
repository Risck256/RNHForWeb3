import React, { memo } from 'react';
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useStyles } from '../../hooks/useStyles';
import { getRNButtonStyles } from './getRNButtonStyles';

interface RNButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const RNButton = memo<RNButtonProps>(({ title, onPress, style }) => {
  const styles = useStyles(getRNButtonStyles);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
});
