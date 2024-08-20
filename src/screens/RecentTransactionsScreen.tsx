import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const TransactionItem = ({ item, email }) => {
  const rawDate = new Date(item.completedDate);
  const date = rawDate.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }) + ' ' + rawDate.toLocaleTimeString('en-US');
  const type = email === item.senderEmail ? 'TO' : 'FROM';
  const otherEmail = email === item.senderEmail ? item.receiverEmail : item.senderEmail;

  return (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionText}>{type}: {otherEmail}</Text>
        <Text style={styles.transactionDate}>{date}</Text>
      </View>
      <Text style={[type === 'FROM' ? styles.positiveAmount : styles.negativeAmount]}>
        {type === 'TO' ? 
          <Text>${item.sourceAmount.toFixed(2)} {item.sourceCurrency}</Text> :
          <Text>${item.targetAmount.toFixed(2)} {item.targetCurrency}</Text>}
      </Text>
    </View>
  );
};

const RecentTransactionsScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      await axios.get('https://ethpay.onrender.com/profile', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
            setEmail(response.data.email);
        })
        .catch(error => {
            console.error('Error:', error);
        });
      await axios.get('https://ethpay.onrender.com/transaction', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    })();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Transactions</Text>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.transactionsContainer}>
          {transactions.map((item) => (
            <TransactionItem item={item} email={email}/>
          ))}
        </ScrollView>
      </View>
      <BottomAppBar navigation={navigation} />
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 24,
  },
  transactionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    flex: 1,
    padding: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  transactionText: {
    fontSize: 16,
    color: '#333333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positiveAmount: {
    color: '#4CAF50',
  },
  negativeAmount: {
    color: '#F44336',
  },
});

export default RecentTransactionsScreen;