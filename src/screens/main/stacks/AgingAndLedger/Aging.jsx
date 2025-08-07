import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../../../../utils/BaseUrl';
import { APPCOLORS } from '../../../../utils/APPCOLORS';
import AppHeader from '../../../../components/AppHeader';
import SimpleHeader from '../../../../components/SimpleHeader';
import AppText from '../../../../components/AppText';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
// import FileViewer from 'react-native-file-viewer';

const Aging = ({ navigation, route }) => {
  const { name, item } = route.params;

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


  // generate pdf 
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const readImages = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          );
          const readDocs = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_DOCUMENTS
          );
          return (
            readImages === PermissionsAndroid.RESULTS.GRANTED &&
            readDocs === PermissionsAndroid.RESULTS.GRANTED
          );
        } else if (Platform.Version >= 29) {
          // Android 10/11: No WRITE_EXTERNAL_STORAGE needed
          return true;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };



  const generatePDF = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Storage permission is required.');
      return;
    }

    let tableRows = aging.map(row => `
      <tr>
        <td>${row.reference}</td>
        <td>${row.tran_date}</td>
        <td>${row.days}</td>
        <td>${row.Allocated}</td>
        <td>${row.Invoice_amount}</td>
        <td>${row.invoce_balance}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 6px; font-size: 12px; text-align: center; }
            th { background-color: #f0f0f0; }
          </style>
        </head>
        <body>
          <h2 style="text-align:center;">Aging Report</h2>
          <table>
            <tr>
              <th>Reference</th>
              <th>Transaction Date</th>
              <th>Days</th>
              <th>Allocated</th>
              <th>Invoice Amount</th>
              <th>Invoice Balance</th>
            </tr>
            ${tableRows}
          </table>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'Aging_Report',
        directory: 'Download', // This makes it save to Downloads folder
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF path:', file.filePath);

      Alert.alert('PDF Saved', `File saved to:\n${file.filePath}`);
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Something went wrong while generating PDF.');
    }
  };





  return (
    <View>
      <SimpleHeader title="Aging" />
      <TouchableOpacity
        style={{
          backgroundColor: APPCOLORS.Primary,
          margin: 20,
          padding: 15,
          borderRadius: 10,
        }}
        onPress={generatePDF}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Download PDF</Text>
      </TouchableOpacity>

      <FlatList
        data={aging}
        contentContainerStyle={{ gap: 20, padding: 20, paddingBottom: 150 }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                padding: 20,
                backgroundColor: APPCOLORS.Secondary,
                borderRadius: 10,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText title={'Reference'} titleSize={2} />
                <AppText title={item.reference} />
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText title={'Transaction date'} titleSize={2} />
                <AppText title={item.tran_date} />
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText title={'Days'} titleSize={2} />
                <AppText title={item.days} />
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText title={'Allocated'} titleSize={2} />
                <AppText title={item.Allocated} />
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <AppText title={'Invoice amount'} titleSize={2} />
                <AppText title={item.Invoice_amount} />
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
