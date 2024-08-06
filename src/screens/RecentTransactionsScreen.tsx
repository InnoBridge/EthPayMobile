import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';

const TransactionItem = ({ item }) => (
  <View style={styles.transactionItem}>
    <View>
      <Text style={styles.transactionText}>{item.type}: {item.email}</Text>
      <Text style={styles.transactionDate}>{item.date}</Text>
    </View>
    <Text style={[styles.transactionAmount, item.amount > 0 ? styles.positiveAmount : styles.negativeAmount]}>
      {item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)}
    </Text>
  </View>
);

const RecentTransactionsScreen = ({ navigation }) => {
  const transactions = [
    { id: '1', type: 'FROM', email: 'example@gmail.com', date: 'March 27, 2024', amount: 25.00 },
    { id: '2', type: 'TO', email: 'example@gmail.com', date: 'March 14, 2024', amount: -15.00 },
    { id: '3', type: 'TO', email: 'example@gmail.com', date: 'February 7, 2024', amount: -180.00 },
    { id: '4', type: 'FROM', email: 'example@gmail.com', date: 'December 27, 2023', amount: 1234.56 },
    { id: '5', type: 'FROM', email: 'example@gmail.com', date: 'July 13, 2023', amount: 4.50 },
  ];

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
        <View style={styles.transactionsContainer}>
          <FlatList
            data={transactions}
            renderItem={({ item }) => <TransactionItem item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
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