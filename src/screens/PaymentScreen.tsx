import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const PaymentScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [amount, setAmount] = useState('0');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingConfirmEmail, setIsEditingConfirmEmail] = useState(false);
    const [isEditingAmount, setIsEditingAmount] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('USD');
    const [items, setItems] = useState([
      {label: 'USD', value: 'USD'},
      {label: 'EUR', value: 'EUR'},
      {label: 'GBP', value: 'GBP'},
      {label: 'JPY', value: 'JPY'},
      {label: 'AUD', value: 'AUD'},
      {label: 'CAD', value: 'CAD'},
      {label: 'CHF', value: 'CHF'},
      {label: 'CNY', value: 'CNY'},
      {label: 'SEK', value: 'SEK'},
      {label: 'NZD', value: 'NZD'},
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState('USD');
    const [items2, setItems2] = useState([
      {label: 'USD', value: 'USD'},
      {label: 'EUR', value: 'EUR'},
      {label: 'GBP', value: 'GBP'},
      {label: 'JPY', value: 'JPY'},
      {label: 'AUD', value: 'AUD'},
      {label: 'CAD', value: 'CAD'},
      {label: 'CHF', value: 'CHF'},
      {label: 'CNY', value: 'CNY'},
      {label: 'SEK', value: 'SEK'},
      {label: 'NZD', value: 'NZD'},
    ]);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState('BITCOIN');
    const [items3, setItems3] = useState([
      {label: 'BITCOIN', value: 'BITCOIN'},
      {label: 'ETHEREUM', value: 'ETHEREUM'},
      {label: 'LITECOIN', value: 'LITECOIN'},
      {label: 'RIPPLE', value: 'RIPPLE'},
      {label: 'DOGECOIN', value: 'DOGECOIN'},
    ]);
    const [sending, setSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendMoney = async () => {
      if (!email) {
        setErrorMessage('Please enter an email');
        return;
      }
      if (!confirmEmail) {
        setErrorMessage('Please confirm the email');
        return;
      }
      if (!amount) {
        setErrorMessage('Amount cannot be zero');
        return;
      }
      if (email != confirmEmail) {
        setErrorMessage('Emails do not match');
        return;
      }
      setSending(true);
      const token = await SecureStore.getItemAsync('accessToken');
        await axios.post('https://ethpay.onrender.com/transaction/create',
          null,
          {
            params: {
              receiverEmail: email,
              sourceCurrency: value,
              targetCurrency: value2,
              targetAmount: amount,
              substrateCrypto: value3,
            },
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        )
        .then(response => {
          setSending(false);
          setEmail('');
          setConfirmEmail('');
          setAmount('0');
          setErrorMessage('');
          setIsEditingEmail(false);
          setIsEditingConfirmEmail(false);
          setIsEditingAmount(false);
        })
        .catch(error => {
          setErrorMessage(error.response.data)
          setSending(false);
        });
    }

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
                <View style={styles.containerBox}>
                    <TouchableOpacity
                        style={styles.amountContainer}
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
                            <Text style={styles.optionText}>Amount: ${amount}</Text>
                        )}
                    </TouchableOpacity>
                    <DropDownPicker
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                        style={styles.currencySelector}
                        dropDownContainerStyle={{width: '30%'}}
                        zIndex={3}
                    />
                </View>
                <View style={{flexDirection: 'row', marginBottom: 8}}>
                    <View style={styles.textBox}>
                        <Text style={styles.optionText}>
                            From:
                        </Text>
                    </View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.currencySelector}
                        dropDownContainerStyle={{width: '30%'}}
                        zIndex={2}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{...styles.textBox, width: '55%'}}>
                        <Text style={styles.optionText}>
                            Intermediary Crypto:
                        </Text>
                    </View>
                    <DropDownPicker
                        open={open3}
                        value={value3}
                        items={items3}
                        setOpen={setOpen3}
                        setValue={setValue3}
                        setItems={setItems3}
                        style={{...styles.currencySelector, width: '42%'}}
                        dropDownContainerStyle={{width: '42%'}}
                        zIndex={1}
                    />
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMoney}>
                  {sending ? <ActivityIndicator style={{height: 25}}/> : 
                    <Text style={styles.sendButtonText}>Send</Text>
                  }
                </TouchableOpacity>
                <Text style={styles.errorMessageText}>{errorMessage}</Text>
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
    amountContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        width: '70%',
    },
    optionText: {
        fontSize: 16,
        color: '#000000',
    },
    optionTextInput: {
        fontSize: 16,
        color: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#4B0082',
    },
    sendButton: {
        backgroundColor: '#4169E1',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    sendButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    currencySelector: {
        width: '30%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 8,
        padding: 20,
        flex: 1,
    },
    containerBox: { // container for the amount and the dropdown so they are beside each other
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorMessageText: {
      color: 'red',
      alignSelf: 'center',
      marginTop: 15,
    },
    textBox: {
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '25%',
        marginRight: '3%'
    },
});

export default PaymentScreen;