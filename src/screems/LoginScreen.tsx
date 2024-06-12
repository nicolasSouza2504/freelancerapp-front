import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/LoginStyle'
import UserModel from '../models/UserModel';

const LoginScreen: React.FC = () => {
  
  const [user, setUser] = useState<UserModel>({email: '', password: '' });
  const [validLogin, setValidLogin] = useState(true);
  const [textError, setErrorText] = useState('');

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
      <TouchableOpacity style={styles.registerButton}>
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

export default LoginScreen;
