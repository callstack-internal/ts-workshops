import {ViewStyle, TextStyle, ImageStyle} from 'react-native';

type DefaultTheme = {
  dark: Theme;
  light: Theme;
};

type Theme = {
  sizing: number[];
  colors: {[key: string]: string};
  elements: {[key: string]: ViewStyle | TextStyle | ImageStyle};
};

type StyleFunctionResult = {
  [key: string]:
    | ViewStyle
    | TextStyle
    | ImageStyle
    | {[key: string]: ViewStyle | TextStyle | ImageStyle};
};

type StyleFunction = (theme: Theme) => StyleFunctionResult;

export {
  type Theme,
  type DefaultTheme,
  type StyleFunction,
  type StyleFunctionResult,
};
