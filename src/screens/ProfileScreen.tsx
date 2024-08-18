import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = ({ navigation }) => {
    const [userId, setUserID] = useState('');
    const [userName, setUsername] = useState('');
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
                    const {userId, userName, email} = response.data;
                    setUserID(userId);
                    setUsername(userName);
                    setEmail(email);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })()},[])
            

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
                    <Text style={styles.title}>My Profile</Text>
                    <View style={styles.placeholder} />
                </View>
                <Text style={styles.subheader}>Security</Text>
                <Text style={styles.subsubheader}>Tap each box to edit information</Text>
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionText}>User ID: {userId}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionText}>Username: {userName}</Text>
                </View>
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionText}>Email: {email}</Text>
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
    placeholder: {
        width: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subheader: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    subsubheader: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 30,
    },
    optionsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#000000',
    },
});

export default ProfileScreen;