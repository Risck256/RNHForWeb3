import { DefaultStylesParams } from './defaults';
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const fonts = (options: DefaultStylesParams) => {
  return StyleSheet.create({
    title: {
      // fontFamily: 'OpenSans-Bold',
      color: colors(options).primaryText,
      fontSize: 25,
    },
    description: {
      // fontFamily: 'OpenSans-SemiBold',
      color: colors(options).primaryText,
      fontSize: 20,
    },
    regularTitle: {
      // fontFamily: 'OpenSans-SemiBold',
      color: colors(options).primaryText,
      fontSize: 18,
    },
    regularText: {
      // fontFamily: 'OpenSans-Regular',
      color: colors(options).primaryText,
      fontSize: 16,
    },
    smallText: {
      // fontFamily: 'OpenSans-Regular',
      color: colors(options).primaryText,
      fontSize: 14,
    },
  });
};
