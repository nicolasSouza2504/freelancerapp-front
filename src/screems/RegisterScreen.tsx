import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import defaultStyle from '../styles/DefaultStyles';

const RegisterScreen: React.FC = () => {
  return (
    <View style={defaultStyle.containerDefault}>
      <Text style={defaultStyle.title}>Registro</Text>
      <TextInput style={defaultStyle.input} placeholder="Nome" placeholderTextColor="#000" />
      <TextInput style={defaultStyle.input} placeholder="Email" placeholderTextColor="#000" keyboardType="email-address" />
      <TextInput style={defaultStyle.input} placeholder="CPF" placeholderTextColor="#000" keyboardType="numeric" />
      <TextInput style={defaultStyle.input} placeholder="Senha" placeholderTextColor="#000" secureTextEntry />
      <TextInput style={defaultStyle.input} placeholder="Confirmar Senha" placeholderTextColor="#000" secureTextEntry />
      <TouchableOpacity style={defaultStyle.button}>
        <Text style={defaultStyle.buttonText}>Criar Nova Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;