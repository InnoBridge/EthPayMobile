import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import RecentTransactionsScreen from './screens/RecentTransactionsScreen';
import FriendScreen from './screens/FriendScreen';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import AddFriendScreen from './screens/AddFriendScreen';
import ViewWalletScreen from './screens/ViewWalletScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name='RecentTransactions' component={RecentTransactionsScreen} />
        <Stack.Screen name='Friends' component={FriendScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='MakePayment' component={PaymentScreen} />
        <Stack.Screen name='AddFriend' component={AddFriendScreen} />
        <Stack.Screen name='ViewWallet' component={ViewWalletScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;