import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    const [email, setEmail] = useState('example@gmail.com');
    const [confirmEmail, setConfirmEmail] = useState('example@gmail.com');
    const [amount, setAmount] = useState('315');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingConfirmEmail, setIsEditingConfirmEmail] = useState(false);
    const [isEditingAmount, setIsEditingAmount] = useState(false);

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
                    <Text style={styles.title}>Send Money</Text>
                    <View style={styles.placeholder} />
                </View>
                <Text style={styles.subheader}>Payment Information</Text>
                <Text style={styles.subsubheader}>Tap each box to edit information</Text>
                <TouchableOpacity
                    style={styles.optionsContainer}
                    onPress={() => setIsEditingEmail(!isEditingEmail)}
                >
                    {isEditingEmail ? (
                        <TextInput
                            style={styles.optionTextInput}
                            value={email}
                            onChangeText={setEmail}
                            autoFocus={true}
                            keyboardType="email-address"
                        />
                    ) : (
                        <Text style={styles.optionText}>Email: {email}</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionsContainer}
                    onPress={() => setIsEditingConfirmEmail(!isEditingConfirmEmail)}
                >
                    {isEditingConfirmEmail ? (
                        <TextInput
                            style={styles.optionTextInput}
                            value={confirmEmail}
                            onChangeText={setConfirmEmail}
                            autoFocus={true}
                            keyboardType="email-address"
                        />
                    ) : (
                        <Text style={styles.optionText}>Confirm Email: {confirmEmail}</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionsContainer}
                    onPress={() => setIsEditingAmount(!isEditingAmount)}
                >
                    {isEditingAmount ? (
                        <TextInput
                            style={styles.optionTextInput}
                            value={amount}
                            onChangeText={setAmount}
                            autoFocus={true}
                            keyboardType="numeric"
                        />
                    ) : (
                        <Text style={styles.optionText}>Amount: ${amount} (USD)</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={print()}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
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
        color: '#4B0082',
    },
    optionTextInput: {
        fontSize: 16,
        color: '#4B0082',
        borderBottomWidth: 1,
        borderBottomColor: '#4B0082',
    },
    sendButton: {
        backgroundColor: '#4169E1',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    sendButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;