import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BaseUrl from '../../../../utils/BaseUrl';
import {APPCOLORS} from '../../../../utils/APPCOLORS';
import AppHeader from '../../../../components/AppHeader';
import SimpleHeader from '../../../../components/SimpleHeader';
import AppText from '../../../../components/AppText';

const Aging = ({navigation, route}) => {
  const {name, item} = route.params;

  console.log('name, item', name, item);
  const [aging, setAgingData] = useState([]);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      if (name == 'Customer') {
        getCustomerAging();
      } else if (name == 'Suppliers') {
        getSupplierAging();
      }
    });

    return nav;
  }, [navigation]);

  const getCustomerAging = () => {
    let data = new FormData();
    data.append('customer_id', item?.customer_id);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/dash_cust_aging.php`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setAgingData(response.data.data_cust_age);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getSupplierAging = () => {
    let data = new FormData();
    data.append('supplier_id', item?.supplier_id);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/dash_supp_aging.php`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setAgingData(response.data.data_cust_age);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View>
      <SimpleHeader title="Aging" />

      <FlatList
        data={aging}
        contentContainerStyle={{gap: 20, padding: 20, paddingBottom: 150}}
        renderItem={({item}) => {
          // console.log('item', item);
          return (
            <View
              style={{
                padding: 20,
                backgroundColor: APPCOLORS.Secondary,
                borderRadius: 10,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText title={'Reference'} titleSize={2} />
                <AppText title={item.reference} />
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText title={'Transaction date'} titleSize={2} />
                <AppText title={item.tran_date} />
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText title={'Days'} titleSize={2} />
                <AppText title={item.days} />
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText title={'Allocated'} titleSize={2} />
                <AppText title={item.Allocated} />
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText title={'Invoice amount'} titleSize={2} />
                <AppText title={item.Invoice_amount} />
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AppText title={'Invoice Balance'} titleSize={2} />
                <AppText title={item.invoce_balance} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Aging;
