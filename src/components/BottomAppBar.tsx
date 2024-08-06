import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  navigation: any;
};

const BottomAppBar: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="#FFFFFF" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={24} color="#FFFFFF" />
        <Text style={styles.tabText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4B0082',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#6A0DAD',
    width: '100%',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 2,
  },
});

export default BottomAppBar;
