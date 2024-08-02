import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import defaultStyle from '../styles/DefaultStyles';
import User from '../models/User';
import RegisterService from '../services/RegisterService';
import ToastComponent from '../components/ToastComponent';
import Response from '../models/Response';
import { TextInputMask } from 'react-native-masked-text'
import { AxiosResponse } from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const RegisterScreen: React.FC = () => {

  const [user, setUser] = useState<User>({ email: '', password: '' });

  const navigator = useNavigation();

  async function handleRegister() {

    let validUser = validateUser();

    if (validUser) {

      try {

        const response: AxiosResponse<User> = await RegisterService.register(user);

        if (response.data.id) {

          ToastComponent.throwSuccess('Usuário cadastrado com sucesso!');

          setTimeout(() => {
            navigator.navigate('Login' as never);
          }, 1000);

        }

      } catch (error) {

        let responses: Response[] = error.response.data;

        if (responses.length > 1) {

          let concatenedMessages: string = responses.map((resp) => resp.message).join('; ');

          ToastComponent.throwError(concatenedMessages);

        } else {
          ToastComponent.throwError(responses[0].message);
        }

      }

    }

  }

  function validateUser(): boolean {

    if (!user.email || !validEmail(user.email)) {

      ToastComponent.throwError('Informe um e-mail válido!');

      return false;

    } else if (!user.password) {

      ToastComponent.throwError('Informe uma senha válida!');

      return false;

    } else if (!user.confirmedPassword) {

      ToastComponent.throwError('Confirme a senha!');

      return false;

    } else if (user.confirmedPassword !== user.password) {

      ToastComponent.throwError('As senhas divergem!');

      return false;

    }

    return true;

  }

  function validEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <View style={defaultStyle.containerDefault}>
      <Text style={defaultStyle.title}>Registro</Text>
      <TextInput onChangeText={(userName: string) => setUser({ ...user, userName: userName })} style={defaultStyle.input} placeholder="Nome" placeholderTextColor="#000" />
      <TextInput onChangeText={(email: string) => setUser({ ...user, email: email })} style={defaultStyle.input} placeholder="Email" placeholderTextColor="#000" keyboardType="email-address" />
      <TextInputMask type='cpf' onChangeText={(cpfCnpj: string) => setUser({ ...user, cpfCnpj: cpfCnpj })} style={defaultStyle.input} placeholder="CPF" placeholderTextColor="#000" keyboardType="numeric" />
      <TextInput onChangeText={(password: string) => setUser({ ...user, password: password })} style={defaultStyle.input} placeholder="Senha" placeholderTextColor="#000" secureTextEntry />
      <TextInput onChangeText={(confirmedPassword: string) => setUser({ ...user, confirmedPassword: confirmedPassword })} style={defaultStyle.input} placeholder="Confirmar Senha" placeholderTextColor="#000" secureTextEntry />
      <TouchableOpacity style={defaultStyle.button} onPress={handleRegister}>
        <Text style={defaultStyle.buttonText}>Criar Nova Conta</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default RegisterScreen;