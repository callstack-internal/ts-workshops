import * as React from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

import {theme} from '@src/theme';
import {StyleFunction, StyleFunctionResult, Theme} from '@@types/theme';

type useStyleWithThemeResult = {
  theme: Theme;
  mode: ColorSchemeName;
  styles: StyleFunctionResult;
};

const useStyleWithTheme = (
  styleFn?: StyleFunction,
): useStyleWithThemeResult => {
  const isDarkMode = Appearance.getColorScheme() === 'dark';
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const styles = React.useMemo(
    () => styleFn?.(currentTheme) || {},
    [styleFn, currentTheme],
  );

  return {
    styles,
    theme: currentTheme,
    mode: isDarkMode ? 'dark' : 'light',
  };
};

export {useStyleWithTheme};
