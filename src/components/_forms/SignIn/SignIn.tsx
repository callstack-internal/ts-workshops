import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {NavigationProp} from '@react-navigation/native';

import {useStyleWithTheme} from '@@hooks';
import {validationRules} from './SignIn.statics';
import {BaseScreen, Button, Fields} from '@components';

import type {Theme} from '@@types/theme';
import type {AuthStackParams} from '@src/navigators/AuthNavigator';
import type {RootStackParamList} from '@src/navigators/AppNavigator';
import {exampleResultsLogger, getValidationResults} from '@src/utils/examples';

export type SignInFormFields = {
  email: string;
  password: string;
};
interface Props {
  navigation: NavigationProp<AuthStackParams & RootStackParamList>;
}

const SignIn = ({navigation}: Props) => {
  const {styles} = useStyleWithTheme(styleFn);

  const {
    control,
    formState: {errors},
    getValues,
  } = useForm<SignInFormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const exampleSubmit = () => {
    const validationResults = getValidationResults<SignInFormFields>({
      values: getValues(),
      config: validationRules,
    });
    exampleResultsLogger<SignInFormFields>(validationResults);

    // console.log('====> messages.email', validationResults.messages.email);
    // console.log('====> messages.email', validationResults.messages.password);

    if (validationResults.isValid) navigation.navigate('Main');
  };

  return (
    <BaseScreen header="Login to see your parties!">
      <View style={styles.wrapper}>
        <Controller
          control={control}
          rules={validationRules.email}
          render={({field, fieldState}) => (
            <Fields.TextField<SignInFormFields, 'email'>
              field={field}
              fieldState={fieldState}
              label="Email address"
              errorMessage={errors.email?.message}
              accessibilityLabel="Text input field"
              accessibilityHint="Your email address"
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={validationRules.password}
          render={({field, fieldState}) => (
            <Fields.TextField<SignInFormFields, 'password'>
              field={field}
              fieldState={fieldState}
              secureTextEntry
              label="Password"
              accessibilityHint="Your pass phrase"
              accessibilityLabel="Text input field"
              errorMessage={errors.password?.message}
            />
          )}
          name="password"
        />
        <Button
          label="Enter"
          variant="Primary"
          onPress={exampleSubmit}
          style={styles.submit}
        />
      </View>
    </BaseScreen>
  );
};

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      marginTop: theme.sizing[5],
      justifyContent: 'flex-start',
    },
    rememberMe: {
      marginTop: theme.sizing[2],
    },
    submit: {
      marginTop: theme.sizing[4] * 2,
    },
    goToSignUp: {
      marginTop: theme.sizing[6],
    },
  });

export {SignIn};
