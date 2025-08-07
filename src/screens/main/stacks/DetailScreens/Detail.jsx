import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleHeader from '../../../../components/SimpleHeader';
import RevenueCards from '../../../../components/RevenueCards';
import BoxCards from '../../../../components/BoxCards';
import AppText from '../../../../components/AppText';
import {APPCOLORS} from '../../../../utils/APPCOLORS';
import NameAndBar from '../../../../components/NameAndBar';
import {BarChart} from 'react-native-chart-kit';
import {responsiveHeight, responsiveWidth} from '../../../../utils/Responsive';
import PieChart from 'react-native-pie-chart';
import BaseUrl from '../../../../utils/BaseUrl';
import axios from 'axios';
import TopTen from '../../../../components/TopTen';

const Detail = ({navigation}) => {
  const [slider_data, setslider_data] = useState();
  const [AllData, setAllData] = useState();

  const [loader, setLoader] = useState(false);
  const revData = [
    {
      id: 1,
      title: 'Income',
      Amount: slider_data?.cur_m_income,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_income,
      topColor: '#88C365',
      bottomColor: '#719D44',
      isUp: slider_data?.cur_m_income > slider_data?.pre_m_income,
    },
    {
      id: 2,
      title: 'Exprense',
      Amount: slider_data?.cur_m_expense,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_expense,
      topColor: '#F7587C',
      bottomColor: '#B12037',
      isUp: slider_data?.cur_m_expense > slider_data?.pre_m_expense,
    },
    {
      id: 3,
      title: 'Revenue',
      Amount: slider_data?.cur_m_revenue,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_revenue,
      topColor: '#EBE383',
      bottomColor: '#D5C026',
      isUp: slider_data?.cur_m_revenue > slider_data?.pre_m_revenue,
    },
    {
      id: 4,
      title: 'Equity',
      Amount: slider_data?.cur_m_equity,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_equity,
      topColor: '#73D3FD',
      bottomColor: '#088CD8',
      isUp: slider_data?.cur_m_equity > slider_data?.pre_m_equity,
    },
    {
      id: 5,
      title: 'Recovery',
      Amount: slider_data?.cur_m_recovery,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_recovery,
      topColor: '#73D3FD',
      bottomColor: '#DB0EC3',
      isUp: slider_data?.cur_m_recovery > slider_data?.pre_m_recovery,
    },
    {
      id: 6,
      title: 'Cash',
      Amount: slider_data?.cur_m_cash,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_cash,
      topColor: '#88C365',
      bottomColor: '#88C365',
      isUp: slider_data?.cur_m_cash > slider_data?.pre_m_cash,
    },
    {
      id: 7,
      title: 'Bank',
      Amount: slider_data?.cur_m_bank,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_bank,
      topColor: '#8ED5E6',
      bottomColor: '#6CB9A7',
      isUp: slider_data?.cur_m_bank > slider_data?.pre_m_bank,
    },
    {
      id: 8,
      title: 'Receivable',
      Amount: slider_data?.cur_m_receivable,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_receivable,
      topColor: '#E68E8E',
      bottomColor: '#B96C6C',
      isUp: slider_data?.cur_m_receivable > slider_data?.pre_m_receivable,
    },
    {
      id: 9,
      title: 'Payable',
      Amount: slider_data?.cur_m_payable,
      Prev_title: 'Previous Month',
      Prev_Amount: slider_data?.pre_m_payable,
      topColor: '#EBE383',
      bottomColor: '#D5C026',
      isUp: slider_data?.cur_m_payable > slider_data?.pre_m_payable,
    },
  ];

  console.log('AllData', AllData?.today_data);
  const boxData = [
    {
      id: 1,
      title: 'Sales',
      type: 'Revenue',
      Amount: AllData?.today_data?.today_sale,
      topColor: '#FF9168',
      bottomColor: '#99573E',
      isUp: true,
    },
    {
      id: 2,
      title: 'Recovery',
      type: 'Revenue',
      Amount: AllData?.today_data?.today_recovery,
      topColor: '#FF704D',
      bottomColor: '#99432E',
      isUp: false,
    },
    {
      id: 3,
      title: 'Purchase Order',
      type: 'Revenue',
      Amount: AllData?.today_data?.today_po,
      topColor: '#B58D86',
      bottomColor: '#73514B',
      isUp: true,
    },
    {
      id: 4,
      title: 'Sales order',
      type: 'Revenue',
      Amount: AllData?.today_data?.today_orders,
      topColor: '#AFC1D1',
      bottomColor: '#48A7CA',
      isUp: false,
    },
    {
      id: 5,
      title: 'Vendor Payment',
      type: 'Revenue',
      Amount: AllData?.today_data?.today_payments,
      topColor: '#F7587C',
      bottomColor: '#48432F',
      isUp: true,
    },
    {
      id: 6,
      title: 'Sales Return',
      type: 'Revenue',
      Amount: AllData?.today_data?.today_return,
      topColor: '#564A48',
      bottomColor: '#767676',
      isUp: false,
    },
  ];

  const bardata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [0, 20, 60, 80, 90, 100],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#8979FF`, // Dark blue
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    propsForBackgroundLines: {
      strokeDasharray: '', // Solid lines
      stroke: '#e3e3e3', // Light grey horizontal lines
    },
    fillShadowGradientFrom: '#8979FF', // Or use hex: "#00008B"
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientTo: '#8979FF', // Same for consistent color
    fillShadowGradientToOpacity: 1,
    useShadowColorFromDataset: false, // optional
  };

  const series = [{value: 430, color: '#0784B5'}];

  const series2 = [{value: 430, color: '#39ACE7'}];

  const series3 = [{value: 430, color: '#9BD4E4'}];

  const series4 = [{value: 430, color: '#CADEEF'}];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMoneyData();
    });
    return unsubscribe;
  }, [navigation]);

  const getMoneyData = async () => {
    setLoader(true);
    const form = new FormData();

    form.append('current_date', '2025-05-19');
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
      setslider_data(data?.slider_data);
      setAllData(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: APPCOLORS.WHITE}}>
      <SimpleHeader title="Detail" />

      {loader ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            position: 'absolute',
            zIndex: 10,
            backgroundColor: APPCOLORS.BLACK,
            opacity: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={APPCOLORS.WHITE} />
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <FlatList
          data={revData}
          numColumns={2}
          contentContainerStyle={{alignSelf: 'center', gap: 10, marginTop: 20}}
          renderItem={({item}) => {
            return (
              <RevenueCards
                title={item?.title}
                type={item?.type}
                amount={item?.Amount}
                prev_title={item?.Prev_title}
                prev_type={item?.Prev_type}
                prev_amount={item?.Prev_Amount}
                gradientTopColor={item?.topColor}
                gradientBottomColor={item?.bottomColor}
                IsUp={item?.isUp}
                onPress={() =>
                  navigation.navigate('MoreDetail', {slider_data: AllData})
                }
              />
            );
          }}
        />

        <FlatList
          data={boxData}
          numColumns={3}
          contentContainerStyle={{alignSelf: 'center', gap: 10, marginTop: 20}}
          renderItem={({item}) => {
            return (
              <BoxCards
                title={item.title}
                gradientTopColor={item.topColor}
                gradientBottomColor={item.bottomColor}
                amount={item.Amount}
              />
            );
          }}
        />  


           <View style={{padding: 20, marginTop: 20}}>
          <AppText
            title="Top 10"
            titleSize={2}
            titleColor={APPCOLORS.BLACK}
            titleWeight
          />

            
      
        </View>


        <View style={{padding: 20, marginTop: 20}}>
          <AppText
            title="Today Status"
            titleSize={2}
            titleColor={APPCOLORS.BLACK}
            titleWeight
          />

            
          <View style={{marginTop: 10, gap: 10}}>

            <NameAndBar title="Today Sales" barColor={'#EEB079'} />
            <NameAndBar title="Today Recovery" barColor={'#62AECC'} />
            <NameAndBar title="Today Purchase Order" barColor={'#A62C00'} />
            <NameAndBar title="Today Order" barColor={'#358B00'} />
            <NameAndBar title="Today Return" barColor={'#98B04B'} />
          </View>


          <View style={{gap:10, marginTop:10}}>
            <TopTen onPress={() => navigation.navigate("TopTenScreen", {name: "Customer"})} title='Top 10 Customer' />
            <TopTen onPress={() =>navigation.navigate("TopTenScreen", {name: "Suppliers"})} title='Top 10 Suppliers' />
            <TopTen onPress={() =>navigation.navigate("TopTenScreen", {name: "Banks"})} title='Top 10 Banks' />
            <TopTen onPress={() =>navigation.navigate("TopTenScreen", {name: "Items"})} title='Top 10 Items' />
            <TopTen onPress={() =>navigation.navigate("TopTenScreen", {name: "Salesman"})} title='Top 10 Salesman' />
            <TopTen onPress={() =>navigation.navigate("ProfitAndLossScreen")} title='Profit and Loss' />
            <TopTen onPress={() =>navigation.navigate("AlertScreen")} title='Approvals' />
          </View>
        </View>

        <View style={{padding: 20}}>
          <AppText title="Graph" titleSize={2} titleWeight />
        </View>

        <BarChart
          style={{}}
          data={bardata}
          width={responsiveWidth(100)}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          withVerticalLabels={false}
          showBarTops={false}
        />

        <View style={{padding: 20}}>
          <AppText title="Total Stats" titleSize={2} titleWeight />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <PieChart
                widthAndHeight={150}
                series={series}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />

              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText title="INCOME" titleSize={1.5} />
                <AppText title="20,000" titleSize={1.5} />
              </View>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <PieChart
                widthAndHeight={150}
                series={series2}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />

              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText title="EXPENSE" titleSize={1.5} />
                <AppText title="20,000" titleSize={1.5} />
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <PieChart
                widthAndHeight={150}
                series={series3}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />

              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText title="NET PROFIT" titleSize={1.5} />
                <AppText title="20,000" titleSize={1.5} />
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <PieChart
                widthAndHeight={150}
                series={series4}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />

              <View
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <AppText title="PERCENTAGE" titleSize={1.5} />
                <AppText title="24,854.43%" titleSize={1.5} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;
