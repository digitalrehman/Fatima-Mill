import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from './AppText'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveFontSize, responsiveWidth } from '../utils/Responsive'
import { APPCOLORS } from '../utils/APPCOLORS'
import AntDesign from 'react-native-vector-icons/AntDesign'

type props = {
    title?: string,
    type?: string,
    amount?: Number,
    gradientTopColor?: any
    gradientBottomColor?: any
    IsUp?: boolean,
    onPress?: () => void,
   prev_title?: string,
    prev_type?: string,
    prev_amount?: Number,
}

const RevenueCards = ({amount,gradientBottomColor,gradientTopColor,title,type, IsUp, onPress, prev_amount,  prev_title,  prev_type}: props) => {
  return (
        <TouchableOpacity onPress={onPress}>
    <LinearGradient colors={[gradientTopColor, gradientBottomColor ]}  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{padding:20, width:responsiveWidth(44), marginLeft:10, borderRadius:20, justifyContent:'space-between'}}>
<View>
      <AppText title={title} titleSize={1.8} titleWeight titleColor={APPCOLORS.WHITE}/>
      {/* <AppText title={type} titleSize={1.5} titleWeight titleColor={APPCOLORS.WHITE}/> */}
      <View style={{marginTop:2, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <AppText title={`Rs.${Math.round(amount).toLocaleString() }`} titleSize={2} titleColor={APPCOLORS.WHITE} titleWeight/>

      {
        IsUp ? 

        <AntDesign
        name={"arrowup"}
        size={responsiveFontSize(3)}
        color={APPCOLORS.WHITE}
        />
        :

        <AntDesign
        name={"arrowdown"}
        size={responsiveFontSize(3)}
        color={APPCOLORS.WHITE}
        />
      }
      </View>
      </View>

      <View style={{marginTop:20, gap:2, alignSelf:'flex-end'}}>
        <AppText title={`${prev_title}` } titleSize={1.7} titleWeight  titleColor={APPCOLORS.WHITE}/>
        <AppText title={`Rs.${Math.round(prev_amount).toLocaleString() }`} titleSize={1.7} titleColor={APPCOLORS.WHITE} titleWeight/>
      </View>

    </LinearGradient>
    </TouchableOpacity>
  )
}

export default RevenueCards