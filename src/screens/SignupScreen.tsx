import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {

    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }
    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter a password');
      return;
    }
    if (!confirmPassword) {
      setErrorMessage('Please confirm your password');
      return;
    }
    if (password != confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const signUpData = {
      username: username,
      email: email,
      password: password,
    }

    await axios.post('https://ethpay.onrender.com/auth/signup', signUpData)
      .then(async (response) => {
        setLoading(false);
        navigation.navigate('Login');
      })
      .catch(error => {
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
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#A0A0A0"
            value={username}
            onChangeText={setUsername}
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
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
          >
            {loading ? <ActivityIndicator style={{height: 25}}/> : 
              <Text style={styles.signupButtonText}>Sign Up</Text>
            }
          </TouchableOpacity>
          <Text style={styles.errorMessageText}>{errorMessage}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkText}>Login</Text></Text>
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
  signupButton: {
    backgroundColor: '#4169E1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    height: 25,
  },
  loginLink: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
  },
  loginLinkText: {
    color: '#4169E1',
  },
  errorMessageText: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default SignupScreen;