import {DefaultTheme} from '@@types/theme';

/**
 * Utilising the 8pt layout sizing approach
 */
const sizing = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96];

const defaultPalette = {
  dark: '#1C1C1C',
  white: '#ffffff',
  error: '#DB2B68',
  success: '#2BDB92',
  grey_1: '#D5D5D5',
  grey_2: '#B5B5B5',
  grey_3: '#838383',
  grey_4: '#656565',
  grey_5: '#3F3F3F',
  primary: '#797BFF',
  notification: '#F45ACB',
  transparent: 'transparent',
};

const navigationThemeDark = {
  dark: false,
  colors: {
    background: defaultPalette.dark,
    text: defaultPalette.white,
    inactive: defaultPalette.grey_2,
    card: defaultPalette.grey_4,
    border: defaultPalette.grey_5,
    dim: defaultPalette.grey_1,
  },
};

const navigationThemeLight = {
  dark: true,
  colors: {
    background: defaultPalette.white,
    text: defaultPalette.dark,
    inactive: defaultPalette.grey_4,
    card: defaultPalette.grey_2,
    border: defaultPalette.grey_1,
    dim: defaultPalette.grey_5,
  },
};

const elements = {
  header: {
    fontSize: sizing[3],
    lineHeight: sizing[4],
    letterSpacing: 1.7,
    fontWeight: '800' as '800',
  },
  subHeader: {
    fontSize: sizing[4] / 2,
    lineHeight: sizing[6] / 2,
    fontWeight: '700' as '700',
  },
  text: {
    fontSize: sizing[4] / 2,
    lineHeight: sizing[3],
    fontWeight: '500' as '500',
  },
};

const theme: DefaultTheme = {
  dark: {
    sizing,
    elements,
    colors: {...defaultPalette, ...navigationThemeDark.colors},
  },
  light: {
    sizing,
    elements,
    colors: {...defaultPalette, ...navigationThemeLight.colors},
  },
};

export {
  theme,
  navigationThemeDark,
  navigationThemeLight,
  sizing as themeSizing,
  elements as themeElements,
};
