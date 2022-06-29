import * as React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ImageStyle,
  StyleSheet,
} from 'react-native';

import {Theme} from '@@types/theme';
import {Top250DataDetail} from '@@types/api';

import {useStyleWithTheme} from '@@hooks';

interface Props {
  movies: Top250DataDetail[];
}

export const IMDBList = ({movies}: Props) => {
  const {styles} = useStyleWithTheme(styleFn);

  return (
    <FlatList
      data={movies}
      style={styles.list}
      initialNumToRender={8}
      contentContainerStyle={styles.listContent}
      renderItem={({item}) => <Item {...item} />}
      keyExtractor={item => item.id}
    />
  );
};

interface ItemProps extends Top250DataDetail {}

const Item = React.memo(({...item}: ItemProps) => {
  const {styles} = useStyleWithTheme(styleFn);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.image}}
        accessibilityIgnoresInvertColors
        style={styles.poster as ImageStyle}
      />
      <View style={styles.item}>
        <Text style={styles.ranking}>#{item.rank}</Text>
        <View style={styles.meta}>
          <Text style={[styles.text, styles.title]}>{item.title}</Text>
          <Text style={[styles.text, styles.year]}>{item.year}</Text>
          <Text style={[styles.text, styles.rating]}>{item.imDbRating}</Text>
        </View>
      </View>
    </View>
  );
});

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    list: {
      marginTop: theme.sizing[3],
    },
    listContent: {
      paddingBottom: theme.sizing[4],
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 100,
      marginBottom: theme.sizing[1],
    },
    poster: {
      height: '100%',
      width: 60,
    },
    item: {
      width: '80%',
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.sizing[0],
      justifyContent: 'space-between',
      borderColor: theme.colors.border,
    },
    ranking: {
      fontSize: 56,
      lineHeight: 80,
      letterSpacing: 3,
      fontWeight: '800',
      color: theme.colors.border,
      marginRight: theme.sizing[1],
    },
    meta: {
      top: 0,
      right: 0,
      width: '100%',
      padding: theme.sizing[0],
      position: 'absolute',
      alignItems: 'flex-end',
    },
    text: {
      fontSize: 14,
      textAlign: 'right',
      color: theme.colors.text,
      marginTop: theme.sizing[0] / 2,
      lineHeight: theme.sizing[1],
    },
    title: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: 1.2,
    },
    year: {
      color: theme.colors.dim,
    },
    rating: {
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: 1.5,
      color: theme.colors.primary,
    },
  });
