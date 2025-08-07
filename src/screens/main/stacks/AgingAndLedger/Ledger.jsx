import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BaseUrl from '../../../../utils/BaseUrl';
import {APPCOLORS} from '../../../../utils/APPCOLORS';
import AppHeader from '../../../../components/AppHeader';
import SimpleHeader from '../../../../components/SimpleHeader';
import AppText from '../../../../components/AppText';
import AppButton from '../../../../components/AppButton';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const Ledger = ({navigation, route}) => {
  const {name, item} = route.params;

  console.log('item', item);

  const [aging, setAgingData] = useState([]);
  const [opening, setOpening] = useState(0);

  const [fromDate, setFromDate] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);

  const [EndDate, setEndDate] = useState(new Date());
  const [openEnd, setOpenEnd] = useState(false);

  const [Laoder, setLoader] = useState(false);

  console.log('EndDate', name);

  useEffect(() => {
    const nav = navigation.addListener('focus', () => {
      if (name == 'Customer') {
        getLeger();
      } else if (name == 'Suppliers') {
        getSupplierLeger();
      } else if (name == 'Items') {
        getItemsLedger();
      }
    });

    return nav;
  }, [navigation]);

  useEffect(() => {
    if (name == 'Customer') {
      getLeger();
    } else if (name == 'Suppliers') {
      getSupplierLeger();
    } else if (name == 'Items') {
      getSupplierLeger();
    }
  }, [fromDate, EndDate]);

  const getLeger = () => {
    setLoader(true);

    let data = new FormData();
    data.append('customer_id', item.customer_id);
    data.append(
      'from_date',
      moment(fromDate).subtract('months', 1).format('YYYY-MM-DD'),
    );
    data.append('to_date', moment(EndDate).format('YYYY-MM-DD'));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/dash_cust_ledger.php`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data.opening));
        setAgingData(response.data.data_cust_age);
        setOpening(response.data.opening);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const getSupplierLeger = () => {
    setLoader(true);

    let data = new FormData();
    data.append('supplier_id', item.supplier_id);
    data.append(
      'from_date',
      moment(fromDate).subtract('months', 1).format('YYYY-MM-DD'),
    );
    data.append('to_date', moment(EndDate).format('YYYY-MM-DD'));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/dash_supp_ledger.php`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log('supplier iss s s', JSON.stringify(response.data));
        setAgingData(response.data.data_cust_age);
        setOpening(response.data.opening);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const getItemsLedger = () => {

    let data = new FormData()
    data.append('stock_id', item?.stock_id);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BaseUrl}/dash_item_ledger.php`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    }

    axios
      .request(config)
      .then(response => {
        setAgingData(response.data.data_cust_age);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <View>
      <SimpleHeader title="Ledger" />

      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <View style={{gap: 10}}>
            <AppText title="From Date" titleSize={2} titleWeight />
            <AppButton
              title={moment(fromDate)
                .subtract('months', 1)
                .format('YYYY-MM-DD')}
              btnWidth={30}
              onPress={() => setOpenFrom(true)}
            />
          </View>

          <View style={{gap: 10}}>
            <AppText title="End Date" titleSize={2} titleWeight />
            <AppButton
              title={moment(EndDate).format('YYYY-MM-DD')}
              btnWidth={30}
              onPress={() => setOpenEnd(true)}
            />
          </View>
        </View>

        {Laoder && <ActivityIndicator size={'large'} color={APPCOLORS.BLACK} />}

        <DatePicker
          modal
          open={openFrom}
          date={new Date()}
          mode="date"
          onConfirm={date => {
            const foramtDate = moment(date).format('YYYY-MM-DD');
            setOpenFrom(false);
            setFromDate(foramtDate);
          }}
          onCancel={() => {
            setOpenFrom(false);
          }}
        />

        {
          //End date
        }
        <DatePicker
          modal
          open={openEnd}
          date={new Date()}
          mode="date"
          onConfirm={date => {
            const foramtDate = moment(date).format('YYYY-MM-DD');
            setOpenEnd(false);
            setEndDate(foramtDate);
          }}
          onCancel={() => {
            setOpenEnd(false);
          }}
        />

        {opening && (
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <AppText title={'Opening'} titleSize={2} titleWeight />
            <AppText
              title={Number(opening).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              titleSize={2}
              titleWeight
            />
          </View>
        )}

        <FlatList
          data={aging}
          contentContainerStyle={{gap: 20, padding: 20}}
          renderItem={({item}) => {
            return (
              <>
                {
                  name == "Items" ? (
                    <View
                style={{
                  padding: 20,
                  backgroundColor: APPCOLORS.Secondary,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'location name'} titleSize={2} />
                  <AppText title={item.location_name} />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'QOH'} titleSize={2} />
                  <AppText title={item.QOH} />
                </View>

              </View>
                  )
                :(
                  
                <View
                style={{
                  padding: 20,
                  backgroundColor: APPCOLORS.Secondary,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'Reference'} titleSize={2} />
                  <AppText title={item.reference} />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'Transaction date'} titleSize={2} />
                  <AppText title={item.tran_date} />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'debit'} titleSize={2} />
                  <AppText title={item.debit} />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'credit'} titleSize={2} />
                  <AppText title={item.credit} />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <AppText title={'balance'} titleSize={2} />
                  <AppText title={item.balance} />
                </View>
                </View>
                )
              }
              </>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Ledger;
