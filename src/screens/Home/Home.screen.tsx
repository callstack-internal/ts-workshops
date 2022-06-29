import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Theme} from '@@types/theme';
import {IMDBList} from '@src/components';
import {useImdbTop250, useStyleWithTheme} from '@@hooks';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainTabStackParamList} from '@src/navigators/MainTabNavigator';

interface Props
  extends Pick<
    BottomTabNavigationProp<MainTabStackParamList, 'Home'>,
    'navigate'
  > {}

const HomeScreen = ({navigate}: Props) => {
  const {styles} = useStyleWithTheme(stylesFn);
  const {movies} = useImdbTop250('top250', true);
  const navigateTo = () => navigate('Home');
  console.log(navigateTo);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IMDB Top 250</Text>
      <Text style={styles.subHeader}>
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <Text style={styles.accent}>FunctionComponent</Text> with custom hooks
      </Text>
      <IMDBList movies={movies} />
    </View>
  );
};

const stylesFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: theme.sizing[4],
      paddingHorizontal: theme.sizing[0],
      backgroundColor: theme.colors.background,
    },
    activityIndicator: {
      paddingTop: theme.sizing[10],
    },
    header: {
      textAlign: 'center',
      color: theme.colors.text,
      ...theme.elements.header,
    },
    subHeader: {
      ...theme.elements.subHeader,
      marginTop: theme.sizing[1],
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: '400',
      color: theme.colors.text,
    },
    body: {
      marginTop: theme.sizing[4],
      color: theme.colors.text,
      ...theme.elements.text,
    },
    accent: {
      fontWeight: '800',
      color: theme.colors.primary,
    },
  });

export {HomeScreen};
