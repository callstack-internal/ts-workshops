import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Api} from '@services';
import {IMDBList} from '@components';
import {withStyledTheme} from '@utils/hoc/withStyledTheme';

const mockMovies = require('../../../test.json');

class _HomeScreen extends React.PureComponent {
  skipApiCall = true;
  state = {movies: []};

  async componentDidMount() {
    if (this.skipApiCall) {
      this.setState({movies: mockMovies});
      return;
    }

    const res = await Api.request;

    if (res?.items && res.items.length > 0) {
      this.setState({movies: res.items});
    }
  }

  render() {
    const {movies} = this.state;
    const {styles} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>IMDB Top 250</Text>
        <Text style={styles.subHeader}>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <Text style={styles.accent}>ClassComponent</Text> with HOC
        </Text>
        <View>
          <IMDBList movies={movies} />
        </View>
      </View>
    );
  }
}

const styleFn = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: theme.sizing[4],
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

const HomeScreen = withStyledTheme(styleFn)(_HomeScreen);

export {HomeScreen};
