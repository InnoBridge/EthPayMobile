import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuProps = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
};

const Menu: React.FC<MenuProps> = ({ visible, onClose, navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#4B0082" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Home'); onClose(); }}>
            <Ionicons name="home-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Profile'); onClose(); }}>
            <Ionicons name="person-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Settings'); onClose(); }}>
            <Ionicons name="settings-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('Login'); onClose(); }}>
            <Ionicons name="log-out-outline" size={24} color="#4B0082" style={styles.iconPadding} />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#4B0082',
  },
  iconPadding: {
    padding: 10,
  },
});

export default Menu;
