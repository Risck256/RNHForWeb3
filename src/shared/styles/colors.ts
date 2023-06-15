import { DefaultStylesParams } from './defaults';

export const colors = ({ scheme }: DefaultStylesParams) => {
  const darkModeEnabled = scheme === 'dark';
  return {
    background: darkModeEnabled ? '#161616' : '#D2D2D3',
    primary: '#653C9B',
    highlight: darkModeEnabled ? '#545454' : '#EEEEEE',
    highlightText: darkModeEnabled ? '#7D7D7D' : '#C9C8C8',
    primaryText: darkModeEnabled ? '#FFFFFF' : '#000000',
    white: '#FFFFFF',
  };
};
