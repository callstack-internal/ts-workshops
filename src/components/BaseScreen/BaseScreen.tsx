import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {Theme} from '@@types/theme';
import {useStyleWithTheme} from '@@hooks';

interface Props {
  header?: string;
}

const BaseScreen = ({header, children}: React.PropsWithChildren<Props>) => {
  const {styles} = useStyleWithTheme(styleFn);

  return (
    <View style={styles.container}>
      {!!header && <Text style={styles.header}>{header}</Text>}
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

const styleFn = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingVertical: theme.sizing[1],
      paddingHorizontal: theme.sizing[3],
      backgroundColor: theme.colors.background,
    },
    header: {
      width: '100%',
      textAlign: 'center',
      color: theme.colors.text,
      marginTop: theme.sizing[3],
      ...theme.elements.header,
    },
  });

export {BaseScreen};
