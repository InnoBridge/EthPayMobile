import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>LOGIN SCREEN</Text>
      <TouchableOpacity style={styles.loginButton} onPress={() => {
        navigation.navigate('Home')
      }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    borderWidth: 1,
    padding: 10,
  }
});

export default LoginScreen;
