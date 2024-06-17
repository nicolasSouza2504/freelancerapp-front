import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserModel from '../models/UserModel';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";


const LoginScreen: React.FC = () => {
  
  const [user, setUser] = useState<UserModel>({email: '', password: '' });
  const [validLogin, setValidLogin] = useState(true);
  const [textError, setErrorText] = useState('');

  const navigator = useNavigation();

  function handleRegister() {
    navigator.navigate('Register');
  }
  function handleLogin(): void {
  
    setValidLogin(validateUser());
    
    if (validLogin) {
      console.log("Login")
    }

  }

  function validateUser(): boolean {
     
    if (!user.email || !validEmail(user.email)) {
      
      throwError('Informe um e-mail válido!');
      
      return false;

    } else if(!user.password) {
      
      throwError('Informe uma senha válida!');

      return false;

    }

    return true;

  }

  function throwError(errorMessage:string): void {
    
    setErrorText(errorMessage);
  
    setValidLogin(false);

  }
  
  function validEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (  
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Freelancer App</Text>
      <TextInput value={user.email} style={styles.input} placeholder="Usuário" placeholderTextColor="#333" onChangeText={(email: string) => setUser({...user, email: email})}/>
      <TextInput value={user.password} style={styles.input} placeholder="Senha" placeholderTextColor="#333" onChangeText={(password) => setUser({...user, password: password})} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>Ou</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Criar Nova Conta</Text>
      </TouchableOpacity>
          {!validLogin && (
          <View style={styles.validationMessageContainer}>
            <Text style={styles.validationMessageText}>{textError}</Text>
          </View>
        )}
    </SafeAreaView>
  );
};


const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002A3A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#E5D3A1',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#C30000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
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
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#C30000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  validationMessageContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFCDD2',
    alignItems: 'center',
    marginTop: 20,
  },
  validationMessageText: {
    color: '#D32F2F',
    fontSize: 16,
  },
});

export default LoginScreen;
