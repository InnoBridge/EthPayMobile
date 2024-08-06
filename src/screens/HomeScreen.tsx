import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import Menu from '../components/Menu';

const HomeScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.email}>example@gmail.com</Text>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={24} color="#FFFFFF" style={styles.menuPadding} />
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.question}>What would you like to do today?</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('MakePayment')}>
            <Ionicons name="cash-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.optionText}>Make a payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ViewWallet')}>
            <Ionicons name="wallet-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.optionText}>View my wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('RecentTransactions')}>
            <Ionicons name="list-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.optionText}>Recent transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AddFriend')}>
            <Ionicons name="person-add-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.optionText}>Add a friend</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomAppBar navigation={navigation} />
      <Menu visible={menuVisible} onClose={() => setMenuVisible(false)} navigation={navigation} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  email: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingTop: 30,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 30,
  },
  menuPadding: {
    paddingTop: 30,
  },
  optionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#4B0082',
  },
  iconPadding: {
    padding: 5,
  },
});

export default HomeScreen;
