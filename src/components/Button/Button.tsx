import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import {Theme} from '@@types/theme';
import {useStyleWithTheme} from '@@hooks';

interface Props extends TouchableOpacityProps {
  variant: 'Primary' | 'Secondary' | 'Dim' | 'Text';
  label: string;
}

/**
 * TODO: useDebugDeps shos that touchableOpacityProps seem to change unexpectedly.
 * TODO: Might wanna investigate further to avoid unnecessary re-renders
 */
const Button = ({style, label, variant, ...touchableOpacityProps}: Props) => {
  const {styles} = useStyleWithTheme(styleFn);

  const buttonStyle = React.useMemo(
    () => [
      styles.btnBase,
      styles[`btn${variant}`],
      touchableOpacityProps.disabled && styles.btnDisabled,
      style,
    ],
    [style, styles, touchableOpacityProps.disabled, variant],
  );

  const labelStyle = React.useMemo(
    () => [
      styles.labelBase,
      styles[`label${variant}`],
      touchableOpacityProps.disabled && styles.labelDisabled,
    ],
    [styles, touchableOpacityProps.disabled, variant],
  );

  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      accessibilityRole="button"
      style={buttonStyle}>
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    btnBase: {
      alignSelf: 'center',
      borderRadius: theme.sizing[1],
      paddingVertical: theme.sizing[1],
      paddingHorizontal: theme.sizing[3],
    },
    btnPrimary: {
      backgroundColor: theme.colors.primary,
    },
    btnSecondary: {
      backgroundColor: theme.colors.text,
    },
    btnDim: {
      backgroundColor: undefined,
    },
    btnDisabled: {
      backgroundColor: undefined,
    },
    btnText: {
      borderRadius: 0,
      paddingVertical: theme.sizing[0],
      paddingHorizontal: 0,
      backgroundColor: undefined,
      borderStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primary,
    },
    labelBase: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    labelPrimary: {
      color: theme.colors.background,
    },
    labelSecondary: {
      color: theme.colors.grey_2,
    },
    labelDim: {
      color: theme.colors.text,
    },
    labelDisabled: {
      color: theme.colors.inactive,
    },
    labelText: {
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 1.2,
      textTransform: 'none',
      color: theme.colors.text,
    },
  });

export {Button};
