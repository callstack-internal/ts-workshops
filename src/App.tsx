/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from '@navigators/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
