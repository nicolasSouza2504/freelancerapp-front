import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import defaultStyle from '../styles/DefaultStyles';
import User from '../models/User';
import RegisterService from '../services/RegisterService';
import ValidationContainer from '../components/ValidationContainer';
import Response from '../models/Response';
import { TextInputMask } from 'react-native-masked-text'

const RegisterScreen: React.FC = () => {

  const[user, setUser] = useState<User>({email: '', password: ''});
  const[validRegister, setValidRegister] = useState(true);
  const[textError, setTextError] = useState('');

  async function handleRegister() {
    
    try {
      
      const response = await RegisterService.register(user);


    } catch(error) {
        
      let responses: Response[] = error.response.data;
      
      if (responses.length > 1) {
        
        let concatenedMessages: string = responses.map((resp) => resp.message).join('; ');

        throwErrorScreen(concatenedMessages);

      } else {
        throwErrorScreen(responses[0].message);
      }      

    }

  }

  function throwErrorScreen(message: string) {

    setTextError(message);
  
    setValidRegister(false);

  }
  
  return (
    <View style={defaultStyle.containerDefault}>
      <Text style={defaultStyle.title}>Registro</Text>
      <TextInput onChangeText={(userName: string) => setUser({...user, userName: userName})} style={defaultStyle.input} placeholder="Nome" placeholderTextColor="#000" />
      <TextInput onChangeText={(email: string) => setUser({...user, email: email})} style={defaultStyle.input} placeholder="Email" placeholderTextColor="#000" keyboardType="email-address" />
      <TextInputMask type='cpf' onChangeText={(cpfCnpj: string) => setUser({...user, cpfCnpj: cpfCnpj})} style={defaultStyle.input} placeholder="CPF" placeholderTextColor="#000" keyboardType="numeric" />
      <TextInput onChangeText={(password: string) => setUser({...user, password: password})} style={defaultStyle.input} placeholder="Senha" placeholderTextColor="#000" secureTextEntry />
      <TextInput onChangeText={(confirmedPassword: string) => setUser({...user, confirmedPassword: confirmedPassword})} style={defaultStyle.input} placeholder="Confirmar Senha" placeholderTextColor="#000" secureTextEntry />
      <TouchableOpacity style={defaultStyle.button} onPress={handleRegister}>
        <Text style={defaultStyle.buttonText}>Criar Nova Conta</Text>
      </TouchableOpacity>
          {!validRegister && (
            <ValidationContainer message={textError}></ValidationContainer>
          )}
    </View>
  );
};

export default RegisterScreen;