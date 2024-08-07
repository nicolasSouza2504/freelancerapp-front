import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import User from '../models/User';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import defaultStyle from '../styles/DefaultStyles';
import LoginService from '../services/LoginService';
import Response from '../models/Response';
import { isSession } from '../models/Session';
import Toast from 'react-native-toast-message';
import errorComponent from '../components/ToastComponent';

const LoginScreen: React.FC = () => {

  const [user, setUser] = useState<User>({ email: '', password: '' });
  const navigator = useNavigation();

  function handleRegister() {
    navigator.navigate('Register' as never);
  }

  async function handleLogin(): Promise<void> {

    let validUser = validateUser()

    if (validUser) {

      try {

        const response = await LoginService.login(user);

        if (isSession(response.data)) {
          navigator.navigate("Menu" as never)
        }

      } catch (error) {

        let response: Response[] = error.response.data;

        errorComponent.throwError(response[0].message);

      }

    }

  }

  function validateUser(): boolean {

    if (!user.email || !validEmail(user.email)) {

      errorComponent.throwError('Informe um e-mail válido!');

      return false;

    } else if (!user.password) {

      errorComponent.throwError('Informe uma senha válida!');

      return false;

    }

    return true;

  }

  function validEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <SafeAreaView style={defaultStyle.containerDefault}>
      <Text style={defaultStyle.title}>Freelancer App</Text>
      <TextInput value={user.email} style={defaultStyle.input} placeholder="Usuário" placeholderTextColor="#333" onChangeText={(email: string) => setUser({ ...user, email: email })} />
      <TextInput value={user.password} style={defaultStyle.input} placeholder="Senha" placeholderTextColor="#333" onChangeText={(password: string) => setUser({ ...user, password: password })} secureTextEntry />
      <TouchableOpacity style={defaultStyle.button} onPress={handleLogin}>
        <Text style={defaultStyle.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>Ou</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={defaultStyle.button} onPress={handleRegister}>
        <Text style={defaultStyle.buttonText}>Criar Nova Conta</Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#fff',
  }
});

export default LoginScreen;
