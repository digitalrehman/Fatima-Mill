import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/main/Dashboard';
import Login from '../screens/auth/Login';

const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Login" component={Login} />
    {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
  </Stack.Navigator>
  )
}

export default Auth