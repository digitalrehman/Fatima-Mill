import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveHeight } from '../utils/Responsive'
import { APPCOLORS } from '../utils/APPCOLORS'
import AppText from './AppText'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PlusRightButtons from './PlusRightButtons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setLogout } from '../redux/AuthSlice'

type props = {
  title?: string,
  onPress?: (res: any) => any,

}

const AppHeader = ({ title, onPress,  }: props) => {

  const dispatch = useDispatch()

  const nav = useNavigation()
  return (
    <LinearGradient colors={[APPCOLORS.Primary, APPCOLORS.Secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: responsiveHeight(33), borderBottomRightRadius: 20, padding: 20, }}>

      <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop:30 }}>
        <AppText title='DeSolutions' titleColor={APPCOLORS.WHITE} titleSize={3} titleWeight />

        <View style={{ flexDirection: 'row', gap: 5 }}>

          <TouchableOpacity onPress={() => onPress("bell")}>

            <FontAwesome
              name={"bell"}
              color={APPCOLORS.WHITE}
              size={responsiveFontSize(2.5)}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onPress("mail")}>

            <Entypo
              name={"mail"}
              color={APPCOLORS.WHITE}
              size={responsiveFontSize(2.5)}
            />
          </TouchableOpacity>


          <TouchableOpacity onPress={() => onPress("chat")}>
            <Ionicons
              name={"chatbubble"}
              color={APPCOLORS.WHITE}
              size={responsiveFontSize(2.5)}
            />
          </TouchableOpacity>

          <View style={{ height: responsiveHeight(2), backgroundColor: APPCOLORS.WHITE, width: 1 }} />

        <TouchableOpacity onPress={()=> nav.navigate("ProfitAndLossScreen")}>
          
          <Ionicons
            name={"person"}
            color={APPCOLORS.WHITE}
            size={responsiveFontSize(2.5)}
            />
            </TouchableOpacity>

        </View>
      </View>




      <View style={{ height: responsiveHeight(20), justifyContent: 'space-between', paddingTop: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ height: responsiveHeight(5), width: responsiveHeight(5), alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderRadius: 200, borderColor: APPCOLORS.WHITE, }}>
            <AppText title='MA' titleColor={APPCOLORS.WHITE} />
          </View>
          <View>
            <AppText title='Muhmmad Anas' titleColor={APPCOLORS.WHITE} titleSize={2} />
            <AppText title={"Dashboard"} titleColor={APPCOLORS.WHITE} titleSize={1.5} />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 5 }}>
            <AppText title='Rs' titleColor={APPCOLORS.WHITE} />
            <AppText title='2,10,000' titleColor={APPCOLORS.WHITE} titleSize={4} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
            <AntDesign
              name={"reload1"}
              size={responsiveFontSize(1.5)}
              color={APPCOLORS.WHITE}
            />
            <AppText title='Refresh Balance' titleColor={APPCOLORS.WHITE} />
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', zIndex: 10, right: 0, top: 100, gap: 20 }}>

        <PlusRightButtons />

        <PlusRightButtons />

      <TouchableOpacity onPress={()=> dispatch(setLogout())}>
        <AppText title='Logout' titleColor={"red"} titleSize={2} titleWeight/>
      </TouchableOpacity>
      </View>





    </LinearGradient>
  )
}

export default AppHeader