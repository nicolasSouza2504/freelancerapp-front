import React from 'react';
import {SafeAreaView, Text, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element  {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
