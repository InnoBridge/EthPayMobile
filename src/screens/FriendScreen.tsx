import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';

const Friend = ({ item }) => (
  <View style={styles.friendsItem}>
    <View>
      <Text style={styles.friendsText}>{item.name}</Text>
      <Text style={styles.friendsEmail}>{item.email}</Text>
    </View>
  </View>
);

const FriendScreen = ({ navigation }) => {
  const friends = [
    { id: '1', name: 'John Doe', email: 'example@gmail.com' },
    { id: '2', name: 'John Dee', email: 'example@gmail.com' },
    { id: '3', name: 'John Doo', email: 'example@gmail.com' },
    { id: '4', name: 'Jane Doe', email: 'example@gmail.com' },
    { id: '5', name: 'Jane Dee', email: 'example@gmail.com' },
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
          <Text style={styles.title}>Contacts</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.friendsContainer}>
          <FlatList
            data={friends}
            renderItem={({ item }) => <Friend item={item} />}
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
  friendsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    flex: 1,
    padding: 10,
  },
  friendsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  friendsText: {
    fontSize: 16,
    color: '#000000',
  },
  friendsEmail: {
    fontSize: 12,
    color: '#777777',
  },
});

export default FriendScreen;