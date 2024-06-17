import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#000" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#000" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#000" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#000" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar Senha" placeholderTextColor="#000" secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Criar Nova Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002A3A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: '#FFF',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#F5DEB3',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    width: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;