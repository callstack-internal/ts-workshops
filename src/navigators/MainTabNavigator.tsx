import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {themeElements} from '@src/theme';
import {useStyleWithTheme} from '@@hooks';

import {Home, HomeClass} from '@screens';
import {HeaderRightButton, TabBarIcon} from '@components';

type MainTabStackParamList = {
  HomeClass: undefined;
};

enum mainTabScreens {
  Home = 'Home',
  HomeClass = 'HomeClass',
}

const MainTab = createBottomTabNavigator<MainTabStackParamList>();

const MainTabNavigator = () => {
  const {theme} = useStyleWithTheme();
  const {primary, border, background, text} = theme.colors;

  return (
    <MainTab.Navigator
      screenOptions={({route}) => ({
        headerRight: () => (
          <HeaderRightButton ioniconName="ios-log-out-outline" />
        ),
        headerShadowVisible: false,
        headerTitleStyle: {
          ...themeElements.subHeader,
          color: text,
        },
        headerLeftContainerStyle: {
          left: theme.sizing[1],
        },
        headerStyle: {
          backgroundColor: background,
        },
        tabBarStyle: {
          borderTopColor: border,
          backgroundColor: background,
        },
        tabBarIcon: props => <TabBarIcon route={route} {...props} />,
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: border,
      })}>
      <MainTab.Screen name={mainTabScreens.HomeClass} component={HomeClass} />
    </MainTab.Navigator>
  );
};

export {MainTabNavigator, mainTabScreens, type MainTabStackParamList};
