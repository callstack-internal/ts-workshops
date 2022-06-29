import * as React from 'react';
import {theme} from '@src/theme';
import {Appearance} from 'react-native';

export const withStyledTheme = styleFn => Component => {
  return class WithStyledThemeComponent extends React.PureComponent {
    render() {
      const currentTheme = Appearance.getColorScheme();
      const styles = styleFn(theme[currentTheme]);
      return <Component theme={theme} styles={styles} {...this.props} />;
    }
  };
};
