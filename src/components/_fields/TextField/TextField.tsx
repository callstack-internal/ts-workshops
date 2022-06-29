import * as React from 'react';
import {
  ColorValue,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {useStyleWithTheme} from '@@hooks';
import {Theme} from '@src/utils/types/theme';
import {
  ControllerFieldState,
  ControllerRenderProps,
  Path,
} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props<Fields, Name extends Path<Fields>>
  extends Omit<TextInputProps, 'onChange' | 'onBlur' | 'value'> {
  label?: string;
  errorMessage?: string;
  fieldState: ControllerFieldState;
  field: ControllerRenderProps<Fields, Name>;
  background?: ColorValue;
  isHorizontal: boolean;
}

export const TextField = <
  Fields extends {[key: string]: any},
  Name extends Path<Fields>,
>({
  label,
  background,
  fieldState: {isDirty},
  field: {onChange, value, onBlur},
  errorMessage,
  isHorizontal,
  ...textInputProps
}: Props<Fields, Name>) => {
  const {styles, theme} = useStyleWithTheme(styleFn);
  const shouldSecureEntry = typeof textInputProps.secureTextEntry === 'boolean';
  const [hidePassword, setHidePassword] = React.useState(shouldSecureEntry);
  const toggleSecureEntry = React.useCallback(
    () => setHidePassword(!hidePassword),
    [hidePassword],
  );

  const statusStyles = React.useMemo(
    () => [isDirty && styles.dirty, !!errorMessage && styles.error],
    [styles, isDirty, errorMessage],
  );

  const iconColor = React.useMemo(
    () =>
      errorMessage
        ? theme.colors.error
        : isDirty
        ? theme.colors.primary
        : theme.colors.inactive,
    [errorMessage, theme.colors, isDirty],
  );

  const fieldStyles = [
    styles.input,
    statusStyles,
    isHorizontal ? styles.inputHorizontal : {},
  ];
  const fieldWrapperStyles = [
    styles.fieldWrapper,
    statusStyles,
    isHorizontal ? styles.fieldWrapperHorizontal : {},
  ];

  if (typeof value !== 'string') return null;

  return (
    <View
      style={[
        styles.wrapper,
        isHorizontal ? styles.wrapperHorizontal : {},
        {backgroundColor: background},
      ]}>
      {!!label && (
        <Text
          style={[styles.label, isHorizontal ? styles.labelHorizontal : {}]}>
          {label}
        </Text>
      )}
      <View style={fieldWrapperStyles}>
        <TextInput
          {...textInputProps}
          value={value}
          onBlur={onBlur}
          style={fieldStyles}
          onChangeText={onChange}
          secureTextEntry={hidePassword}
        />
        {shouldSecureEntry && (
          <Pressable
            style={styles.secureIconPressable}
            onPress={toggleSecureEntry}
            accessibilityRole="button">
            <Ionicons
              style={styles.secureIcon}
              color={iconColor}
              name={`ios-${hidePassword ? 'eye-off-outline' : 'eye-outline'}`}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.errorContainer}>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

TextField.defaultProps = {
  isHorizontal: false,
};

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      marginVertical: theme.sizing[0],
    },
    wrapperHorizontal: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.dim,
    },
    label: {
      letterSpacing: 1.2,
      fontSize: theme.sizing[1],
      color: theme.colors.dim,
      lineHeight: theme.sizing[2],
    },
    labelHorizontal: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      fontSize: 10,
      color: theme.colors.inactive,
      fontWeight: '600',
    },
    fieldWrapper: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.dim,
    },
    fieldWrapperHorizontal: {
      borderBottomWidth: 0,
      borderBottomColor: undefined,
    },
    input: {
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 1.5,
      color: theme.colors.text,
      paddingVertical: theme.sizing[0],
    },
    inputHorizontal: {
      textAlign: 'right',
    },
    secureIconPressable: {
      right: 0,
      height: 28,
      position: 'absolute',
      marginRight: theme.sizing[0],
    },
    secureIcon: {
      fontSize: 28,
    },
    errorContainer: {
      minHeight: 20,
      marginTop: theme.sizing[0],
    },
    dirty: {
      color: theme.colors.primary,
      borderBottomColor: theme.colors.primary,
    },
    error: {
      color: theme.colors.error,
      borderBottomColor: theme.colors.error,
    },
  });
