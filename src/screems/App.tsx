import React from 'react';
import {SafeAreaView, Text, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import MenuScreen from './MenuScreen';
import ContratantesScreen from './ContratantesScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element  {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  options={{ headerShown: false }} name="Login" component={LoginScreen}/>
        <Stack.Screen  options={{ headerShown: false }} name="Register" component={RegisterScreen}/>
        <Stack.Screen  options={{ headerShown: false }} name="Menu" component={MenuScreen}/>
        <Stack.Screen  options={{ headerShown: false }} name="Contratantes" component={ContratantesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
