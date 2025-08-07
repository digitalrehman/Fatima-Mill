import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleHeader from '../../../components/SimpleHeader'
import { APPCOLORS } from '../../../utils/APPCOLORS'
import { responsiveHeight, responsiveWidth } from '../../../utils/Responsive'
import AppText from '../../../components/AppText'
import DatePicker from 'react-native-date-picker'
import DropButtons from '../../../components/DropButtons'
import moment from 'moment'
import BaseUrl from '../../../utils/BaseUrl'

const NotificationScreen = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [openFrom, setOpenFrom] = useState(false)
  const [loader, setLoader] = useState(false);
  const [AllData, setAllData] = useState()


  useEffect(()=>{
    getMoneyData()
  },[])


 const getMoneyData = async () => {
    setLoader(true);

    const form = new FormData();
    const currentDate = new Date();
    const todayDate = moment(currentDate).format('YYYY-MM-DD');

    form.append('current_date', todayDate);
    form.append('pre_month_date', '2025-04-19');

    const options = {
      method: 'GET',
      url: `${BaseUrl}dashboard_view.php`,
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: form,
    };

    try {
      const {data} = await axios.request(options);
      console.log(data);
      setAllData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  }

  return (
    <View>
      <SimpleHeader title='Notification' />

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20
      }}>
        <DropButtons title='From Date' onPress={() => setOpenFrom(true)} />
        <DropButtons title='To Date' onPress={() => setOpenFrom(true)} />
      </View>

      <DatePicker
        modal
        open={openFrom}
        date={fromDate}
        mode="date"
        onConfirm={(date) => {
          setOpenFrom(false)
          setFromDate(date)
        }}
        onCancel={() => {
          setOpenFrom(false)
        }}
      />


      <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'center', backgroundColor: APPCOLORS.DARKLIGHTBLUE }}>
        <AppText title="Income" titleSize={2} titleColor={APPCOLORS.WHITE} />
      </View>

      <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between', backgroundColor: APPCOLORS.DARKLIGHTBLUE, flexDirection: 'row', paddingHorizontal: 10, marginTop: 5 }}>
        <AppText title="Group/Account Name" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppText title="Period" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
          <AppText title="Accumulated" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
          <AppText title="Achieved %" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
        </View>
      </View>

      
      <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#E4E4E4", flexDirection: 'row', paddingHorizontal: 10, marginTop: 5 }}>
        <AppText title="402 Other Revenue" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="968,434,085.30" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        </View>
      </View>


      
      <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#DEF8FF", flexDirection: 'row', paddingHorizontal: 10, marginTop: 0 }}>
        <AppText title="402 Other Revenue" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="968,434,085.30" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        </View>
      </View>

            <View style={{padding:20}}>

              <AppText title="Total Income" titleSize={2} titleWeight titleColor={APPCOLORS.BLACK} />
            </View>


               <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'center', backgroundColor: APPCOLORS.DARKLIGHTBLUE }}>
        <AppText title="Income" titleSize={2} titleColor={APPCOLORS.WHITE} />
      </View>

      <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between', backgroundColor: APPCOLORS.DARKLIGHTBLUE, flexDirection: 'row', paddingHorizontal: 10, marginTop: 5 }}>
        <AppText title="Group/Account Name" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppText title="Period" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
          <AppText title="Accumulated" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
          <AppText title="Achieved %" titleSize={1.5} titleColor={APPCOLORS.WHITE} />
        </View>
      </View>

         <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#E4E4E4", flexDirection: 'row', paddingHorizontal: 10, marginTop: 5 }}>
        <AppText title="402 Other Revenue" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="968,434,085.30" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        </View>
      </View>


      
      <View style={{ height: responsiveHeight(5), width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#DEF8FF", flexDirection: 'row', paddingHorizontal: 10, marginTop: 0 }}>
        <AppText title="402 Other Revenue" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="968,434,085.30" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
          <AppText title="0.00" titleSize={1.5} titleColor={APPCOLORS.BLACK} />
        </View>
      </View>

    </View>
  )
}

export default NotificationScreen
