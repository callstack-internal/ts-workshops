import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Forms} from '@src/components';

type AuthStackParams = {
  SignIn: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={() => ({headerShown: false})}>
      <AuthStack.Screen component={Forms.SignIn} name="SignIn" />
    </AuthStack.Navigator>
  );
};

export {AuthNavigator, type AuthStackParams};
