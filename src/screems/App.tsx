import React from 'react';
import { SafeAreaView, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import MenuScreen from './MenuScreen';
import HirerScreen from './Hirer/HirerScreen';
import HirerFormScreen from './Hirer/HirerFormScreen';
import WorkScreen from './Work/WorkScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lofin">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Menu" component={MenuScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Hirers" component={HirerScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HirerForm" component={HirerFormScreen} />
        <Stack.Screen options={{ headerShown: false }} name="WorkScreen" component={WorkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
