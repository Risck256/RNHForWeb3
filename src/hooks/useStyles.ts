import {useMemo} from 'react';
import {useColorScheme, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {defaultStyles} from '../shared/styles/defaults';

export const useStyles = <T>(
  styles: (defaults: ReturnType<typeof defaultStyles>) => T,
) => {
  const scheme = useColorScheme();
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return useMemo(
    () =>
      styles(
        defaultStyles({
          scheme,
          dimensions,
          insets,
        }),
      ),
    [dimensions, insets, scheme, styles],
  );
};
