import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from '../screens/main/Dashboard';
import Detail from '../screens/main/stacks/DetailScreens/Detail';
import NotificationScreen from '../screens/main/stacks/NotificationScreen';
import MoreDetail from '../screens/main/stacks/DetailScreens/MoreDetail';
import ViewAll from '../screens/main/stacks/DetailScreens/ViewAll';
import AlertScreen from '../screens/main/stacks/AppAlerts/AlertScreen';
import AlertsDetail from '../screens/main/stacks/AppAlerts/AlertsDetail';
import NormalViewAll from '../screens/main/stacks/DetailScreens/NormalViewAll';
import PdfScreen from '../screens/main/stacks/DetailScreens/PdfScreen';
import ProfitAndLossScreen from '../screens/main/stacks/ProfitAndLoss/ProfitAndLossScreen';
import ApprovalScreen from '../screens/main/stacks/ProfitAndLoss/ApprovalScreen';
import Aging from '../screens/main/stacks/AgingAndLedger/Aging';
import Ledger from '../screens/main/stacks/AgingAndLedger/Ledger';
import TopTenScreen from '../screens/main/stacks/DetailScreens/TopTen/TopTenScreen';
import AgingAndLedger from '../screens/main/stacks/AgingAndLedger/AgingAndLedger';
import ViewAllTopTen from '../screens/main/stacks/DetailScreens/TopTen/ViewAllTopTen';
import ShowUnapprovedDetails from '../screens/main/stacks/AppAlerts/ShowUnapprovedDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackScreens = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Dashboard} />
    </Tab.Navigator>
  )
}


const Main = () => {
  return (
    <Stack.Navigator initialRouteName='Dashboard' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="MoreDetail" component={MoreDetail} />
      <Stack.Screen name="ViewAll" component={ViewAll} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AlertScreen" component={AlertScreen} />
      <Stack.Screen name="AlertsDetail" component={AlertsDetail} />
      <Stack.Screen name="NormalViewAll" component={NormalViewAll} />
      <Stack.Screen name="PdfScreen" component={PdfScreen} />
      <Stack.Screen name="ProfitAndLossScreen" component={ProfitAndLossScreen} />
      <Stack.Screen name="ApprovalScreen" component={ApprovalScreen} />
      <Stack.Screen name="Aging" component={Aging} />
      <Stack.Screen name="Ledger" component={Ledger} />
      <Stack.Screen name="TopTenScreen" component={TopTenScreen} />
            <Stack.Screen name="ViewAllTopTen" component={ViewAllTopTen} />


      <Stack.Screen name="AgingAndLedger" component={AgingAndLedger} />
<Stack.Screen name="ShowUnapprovedDetails" component={ShowUnapprovedDetails} />
      



    </Stack.Navigator>
  )
}

export default Main