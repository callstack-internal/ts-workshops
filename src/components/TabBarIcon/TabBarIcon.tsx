import * as React from 'react';
import {RouteProp} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  mainTabScreens,
  MainTabStackParamList,
} from '@navigators/MainTabNavigator';

interface Props {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<MainTabStackParamList, keyof MainTabStackParamList>;
}

const TabBarIcon = ({focused, color, size, route}: Props) => {
  let iconName!: string;

  if (route.name === mainTabScreens.Home)
    iconName = `ios-home${!focused ? '-outline' : ''}`;
  if (route.name === mainTabScreens.HomeClass)
    iconName = `ios-home${!focused ? '-outline' : ''}`;

  return <Ionicons name={iconName} size={size} color={color} />;
};

export {TabBarIcon};
