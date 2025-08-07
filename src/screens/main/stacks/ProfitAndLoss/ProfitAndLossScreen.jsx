import {View, Text, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleHeader from '../../../../components/SimpleHeader';
import AppText from '../../../../components/AppText';
import {APPCOLORS} from '../../../../utils/APPCOLORS';
import {responsiveHeight, responsiveWidth} from '../../../../utils/Responsive';
import BaseUrl from '../../../../utils/BaseUrl';
import moment from 'moment';
import axios from 'axios';

const ProfitAndLossScreen = ({navigation}) => {
  const [alldata, setAllData] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMoneyData();
    });
    return unsubscribe;
  }, [navigation]);

  const getMoneyData = async () => {
    // setLoader(true);

    try {
      console.log('Dsadasdas');

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
      console.log('options', options);

      try {
        const {data} = await axios.request(options);

        setAllData(data);
      } catch (error) {
        console.log('Errpr', error);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // console.log("alldata",alldata?.profit_loss_item_data)

  return (
    <View>
      <SimpleHeader title="Notification" />
      <ScrollView  contentContainerStyle={{flexGrow:1, padding: 20, paddingBottom:100}}>
        <AppText title="Item Valuation today" titleSize={3} titleWeight />
        <View
          style={{
            padding: 20,
            marginTop: 10,
            marginBottom: 20,
            backgroundColor: APPCOLORS.Secondary,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{gap: 10}}>
              <AppText title="Today" titleSize={2} titleWeight />
              <AppText title="Yesterday" titleSize={2} titleWeight />
              <AppText title="This Month" titleSize={2} titleWeight />
              <AppText title="Last Month" titleSize={2} titleWeight />
            </View>
            <View
              style={{
                height: responsiveHeight(15),
                width: 1,
                backgroundColor: APPCOLORS.BLACK,
              }}
            />
            <View style={{gap: 10}}>
              <AppText
                title={
                  alldata?.profit_loss_item_data?.today_value_item
                    ? JSON.parse(
                        alldata?.profit_loss_item_data?.today_value_item,
                      )?.toFixed(2)
                    : 0
                }
                titleSize={2}
              />
              <AppText
                title={
                  alldata?.profit_loss_item_data?.yesterday_value_item
                    ? JSON.parse(
                        alldata?.profit_loss_item_data?.yesterday_value_item,
                      )?.toFixed(2)
                    : 0
                }
                titleSize={2}
              />
              <AppText
                title={
                  alldata?.profit_loss_item_data?.this_month_value_item
                    ? JSON.parse(
                        alldata?.profit_loss_item_data?.this_month_value_item,
                      )?.toFixed(2)
                    : 0
                }
                titleSize={2}
              />
              <AppText
                title={
                  alldata?.profit_loss_item_data?.last_month_value_item
                    ? JSON.parse(
                        alldata?.profit_loss_item_data?.last_month_value_item,
                      )?.toFixed(2)
                    : 0
                }
                titleSize={2}
              />
            </View>
          </View>
        </View>

        <AppText title="Profit and Loss Income" titleSize={3} titleWeight />
        <View
          style={{
            padding: 20,
            paddingTop: 0,
            backgroundColor: APPCOLORS.Secondary,
            borderRadius: 10,
            marginTop:10
          }}>
          <FlatList
            data={alldata?.data_profit_and_loss_charts_income}
            renderItem={({item}) => {
              return (
                <View style={{gap:5, borderBottomWidth:1.5, paddingBottom:20, paddingTop:20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Name" titleSize={2} titleWeight />
                    <AppText
                      title={item?.name}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Today" titleSize={2} titleWeight />
                    <AppText
                      title={item?.today_data ? item?.today_data : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Yesterday" titleSize={2} titleWeight />
                    <AppText
                      title={item?.yesterday_data ? item?.yesterday_data : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="This Month" titleSize={2} titleWeight />
                    <AppText
                      title={item?.this_month ? item?.this_month : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Last Month" titleSize={2} titleWeight />
                    <AppText
                      title={item?.last_month ? item?.last_month : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>


            <View style={{marginTop:20}}/>
         <AppText title="Profit and Loss Chart Expense" titleSize={3} titleWeight />
        <View
          style={{
            padding: 20,
            paddingTop: 0,
            backgroundColor: APPCOLORS.Secondary,
            borderRadius: 10,
            marginTop:10
          }}>
          <FlatList
            data={alldata?.data_profit_and_loss_charts_expense}
            renderItem={({item}) => {
              return (
                <View style={{gap:5, borderBottomWidth:1.5, paddingBottom:20, paddingTop:20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Name" titleSize={2} titleWeight />
                    <AppText
                      title={item?.name}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Today" titleSize={2} titleWeight />
                    <AppText
                      title={item?.today_data ? JSON.parse(item?.today_data).toFixed(2) : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Yesterday" titleSize={2} titleWeight />
                    <AppText
                      title={item?.yesterday_data ? item?.yesterday_data : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="This Month" titleSize={2} titleWeight />
                    <AppText
                      title={item?.this_month ? item?.this_month : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <AppText title="Last Month" titleSize={2} titleWeight />
                    <AppText
                      title={item?.last_month ? item?.last_month : 0}
                      titleSize={2}
                      titleColor={APPCOLORS.BLACK}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfitAndLossScreen;
