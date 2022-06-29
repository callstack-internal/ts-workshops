import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useStyleWithTheme} from '@@hooks';

import {MainTabNavigator} from './MainTabNavigator';
import {AuthNavigator} from './AuthNavigator';

type RootStackParamList = {
  Main: undefined;
  Authentication: undefined;
};

enum rootScreens {
  Main = 'Main',
  Authentication = 'Authentication',
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {theme} = useStyleWithTheme();
  const {background} = theme.colors;

  return (
    <RootStack.Navigator
      initialRouteName={rootScreens.Main}
      screenOptions={({route}) => ({
        headerShown: route.name !== rootScreens.Main,
        headerShadowVisible: false,
        headerTitle: '',
        headerStyle: {
          backgroundColor: background,
        },
      })}>
      <RootStack.Screen
        component={AuthNavigator}
        name={rootScreens.Authentication}
      />
      <RootStack.Screen component={MainTabNavigator} name={rootScreens.Main} />
    </RootStack.Navigator>
  );
};

export {AppNavigator, rootScreens, type RootStackParamList};
