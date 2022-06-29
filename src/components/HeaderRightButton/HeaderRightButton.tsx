import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {Theme} from '@@types/theme';
import {useStyleWithTheme} from '@@hooks';
import {RootStackParamList} from '@navigators/AppNavigator';
import {AuthStackParams} from '@src/navigators/AuthNavigator';

interface Props {
  label?: string;
  ioniconName?: string;
}

const HeaderRightButton = ({label, ioniconName}: Props) => {
  const {styles, theme} = useStyleWithTheme(styleFn);
  const navigation =
    useNavigation<NavigationProp<RootStackParamList & AuthStackParams>>();

  const onPress = React.useCallback(async () => {
    navigation.navigate('Authentication');
  }, [navigation]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.outer}
      onPress={onPress}>
      <View style={styles.inner}>
        {ioniconName && (
          <Ionicons
            style={styles.icon}
            size={theme.sizing[2]}
            name={ioniconName}
          />
        )}
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    outer: {
      marginHorizontal: theme.sizing[2] / 2,
    },
    inner: {
      paddingHorizontal: theme.sizing[0],
      borderRadius: theme.sizing[1] / 2,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
    },
    label: {
      height: theme.sizing[3],
      paddingHorizontal: theme.sizing[0] / 2,
      lineHeight: theme.sizing[3],
      color: theme.colors.background,
      ...theme.elements.text,
      fontWeight: '800',
    },
    icon: {
      color: theme.colors.background,
      paddingVertical: theme.sizing[0] / 2,
      paddingLeft: theme.sizing[0] / 2,
    },
  });

export {HeaderRightButton};
