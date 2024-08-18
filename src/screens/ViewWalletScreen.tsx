import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import BottomAppBar from '../components/BottomAppBar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const ViewWalletScreen = ({ navigation }) => {
    const [balances, setBalances] = useState({});
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
    const [depositValue, setDepositValue] = useState('');
    const [withdrawValue, setWithdrawValue] = useState('');

    useEffect(() => {
      (async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        await axios.get('https://ethpay.onrender.com/account', {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          setBalances(response.data.balances);
        })
        .catch(async (error) => {
          console.log(error.response.data)
          await axios.post('https://ethpay.onrender.com/account/create', {}, {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            setBalances(response.data.balances);
          })
          .catch(error => {
            console.error('Error:', error.response.data);
          });
        });
      })();
    }, []);

    const handleDeposit = async () => {
      const amount = Number(depositValue);
      const token = await SecureStore.getItemAsync('accessToken');
      await axios.post(
        'https://ethpay.onrender.com/account/deposit', 
        null,
        {
          params: {
            currency: value,
            amount: amount
          },
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then(response => {
        setBalances(response.data.balances);
        setDepositValue('');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
      });
    }

    const handleWithdraw = async () => {
      const amount = Number(withdrawValue);
      const token = await SecureStore.getItemAsync('accessToken');
      await axios.post(
        'https://ethpay.onrender.com/account/withdraw', 
        null,
        {
          params: {
            currency: value2,
            amount: amount
          },
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then(response => {
        setBalances(response.data.balances);
        setWithdrawValue('');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
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
                    <Text style={styles.title}>My Wallet</Text>
                    <View style={styles.placeholder} />
                </View>
                <Text style={styles.subheader}>Balance</Text>
                <Text style={styles.subsubheader}>Deposit</Text>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <TextInput style={styles.input} value={depositValue} onChangeText={setDepositValue}/>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.currencySelector}
                    dropDownContainerStyle={{width: '25%'}}
                    zIndex={2}
                  />
                  <TouchableOpacity style={styles.submitButton} onPress={handleDeposit}>
                    <Text style={styles.submitText}>Deposit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.subsubheader}>Withdraw</Text>
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  <TextInput style={styles.input} value={withdrawValue} onChangeText={setWithdrawValue}/>
                  <DropDownPicker
                    open={open2}
                    value={value2}
                    items={items2}
                    setOpen={setOpen2}
                    setValue={setValue2}
                    setItems={setItems2}
                    style={styles.currencySelector}
                    dropDownContainerStyle={{width: '25%'}}
                    zIndex={1}
                  />
                  <TouchableOpacity style={styles.submitButton} onPress={handleWithdraw}>
                    <Text style={styles.submitText}>Withdraw</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {Object.keys(balances).map((key) => (
                    <View key={key} style={styles.optionsContainer}>
                      <Text style={styles.optionText}>{key}</Text>
                      <Text>Balance: ${balances[key].balance}</Text>
                      <Text>Available: ${balances[key].availableFund}</Text>
                    </View>
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
        marginBottom: 10,
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
    submitButton: {
      position: 'absolute',
      right: 0,
      backgroundColor: '#47d613',
      height: '100%',
      width: '25%',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    input: {
      backgroundColor: 'white',
      width: '45%',
      padding: 10,
      borderRadius: 10,
      marginRight: '2%',
    },
    currencySelector: {
      width: '25%',
    },
    submitText: {
      color: 'white',
      fontWeight: 'bold',
    },
});

export default ViewWalletScreen;