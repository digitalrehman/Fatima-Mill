import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Dashboard from './screens/main/Dashboard'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/Routes';
import { Provider } from 'react-redux'
import {Store} from './redux/Store'
import Toast from 'react-native-toast-message';

const App = () => {
  return (
        <Provider store={Store}>
    <SafeAreaView style={{flex:1}}>
    <NavigationContainer>

    <Routes/>
    </NavigationContainer>

    </SafeAreaView>
    <Toast/>
    </Provider>
  )
}

export default App