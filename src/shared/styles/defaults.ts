import { ColorSchemeName, ScaledSize } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { colors } from './colors';
import { fonts } from './fonts';

export interface DefaultStylesParams {
  scheme: ColorSchemeName;
  insets: EdgeInsets;
  dimensions: ScaledSize;
}

export const defaultStyles = (options: DefaultStylesParams) => {
  const { scheme, dimensions, insets } = options;
  return {
    scheme: scheme,
    dimensions,
    insets,
    colors: colors(options),
    fonts: fonts(options),
  };
};

export type IDefaults = ReturnType<typeof defaultStyles>;
