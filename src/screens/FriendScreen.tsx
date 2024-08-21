import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Friend = ({ item, setFriends }) => (
  <View style={styles.friendsItem}>
    <Text>Email: {item}</Text>
      <TouchableOpacity onPress={async () => await removeFriend(item, setFriends)}>
        <Ionicons name="close-circle" size={30} color="red" />
      </TouchableOpacity>
  </View>
);

const removeFriend = async (friend: string, setFriends) => {
  const token = await SecureStore.getItemAsync('accessToken');
  await axios.delete(`https://ethpay.onrender.com/contacts`, {
    params: {
      email: friend
    },
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    setFriends(response.data.contacts);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });
}

const FriendScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([])
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      await axios.get('https://ethpay.onrender.com/contacts', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setFriends(response.data.contacts);
      })
      .catch(async (error) => {
        console.error('Error: ', error.response.data)
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
          {/* <TouchableOpacity onPress={() => navigation.navigate('AddFriend')}>
            <Ionicons icon="plus-round" size={24} color="#FFFFFF" />
          </TouchableOpacity> */}
          <Text style={styles.title}>Contacts</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.friendsContainer}>
          {friends.map((item) => (
            <Friend item={item} setFriends={setFriends}/>
          ))}
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
    fontSize: 32,
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
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#777777',
    paddingHorizontal: 4,
  },
  friendsText: {
    fontSize: 16,
    color: '#000000',
  },
  friendsEmail: {
    fontSize: 12,
    color: '#777777',
  },
  friendsRemove: {
    flex: 1,
  }
});

export default FriendScreen;