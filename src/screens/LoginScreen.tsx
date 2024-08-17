import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {

    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const loginData = {
      email: email,
      password: password
    }

    await axios.post('https://ethpay.onrender.com/auth/signin', loginData)
      .then(async (response) => {
        await SecureStore.setItemAsync('accessToken', response.data.accessToken);
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
        setErrorMessage(error.response.data)
      });
  }

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <View style={styles.row}>
            <Text style={styles.titleBold}>ETH</Text>
            <Text style={styles.title}>Pay</Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            {loading ? <ActivityIndicator style={{height: 25}}/> : 
              <Text style={styles.loginButtonText}>Login</Text>
            }
          </TouchableOpacity>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleBold: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
  formContainer: {
    marginTop: 50,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  loginButton: {
    backgroundColor: '#4169E1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
  },
  createAccount: {
    color: '#4169E1',
    textAlign: 'center',
    marginTop: 10,
  },
  errorMessageText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default LoginScreen;
