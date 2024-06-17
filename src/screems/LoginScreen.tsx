import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserModel from '../models/UserModel';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import defaultStyle from '../styles/DefaultStyles';
import LoginService from '../services/LoginService';


const LoginScreen: React.FC = () => {
  
  const [user, setUser] = useState<UserModel>({email: '', password: '' });
  const [validLogin, setValidLogin] = useState(true);
  const [textError, setErrorText] = useState('');

  const navigator = useNavigation();

  function handleRegister() {
    navigator.navigate('Register');
  }

  async function handleLogin(): Promise<void> {
  
    setValidLogin(validateUser());
    
    if (validLogin) {
      
      try {
        
        const response = LoginService.login(user);

        console.log('LOGED IN => ', JSON.stringify(response))
      
      } catch (error) {
        console.log('ERROR LOGIN => ', JSON.stringify(error))
      }

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
    <SafeAreaView style={defaultStyle.containerDefault}>
      <Text style={defaultStyle.title}>Freelancer App</Text>
      <TextInput value={user.email} style={defaultStyle.input} placeholder="Usuário" placeholderTextColor="#333" onChangeText={(email: string) => setUser({...user, email: email})}/>
      <TextInput value={user.password} style={defaultStyle.input} placeholder="Senha" placeholderTextColor="#333" onChangeText={(password) => setUser({...user, password: password})} />
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
          {!validLogin && (
          <View style={styles.validationMessageContainer}>
            <Text style={styles.validationMessageText}>{textError}</Text>
          </View>
        )}
    </SafeAreaView>
  );
};


const styles =  StyleSheet.create({
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
