import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const ProfileScreen = ({ navigation }) => {
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
                <Text style={styles.subheader}></Text>
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionText}>Email: example@gmail.com</Text>
                </View>
                <Text style={styles.subheader}></Text>
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionText}>Password: ********</Text>
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
    },
    optionText: {
        fontSize: 16,
        color: '#4B0082',
    },
});

export default ProfileScreen;