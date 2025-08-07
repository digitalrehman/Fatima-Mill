import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleHeader from '../../../../components/SimpleHeader';
import PieChart from 'react-native-pie-chart';
import AppText from '../../../../components/AppText';
import NameBalanceContainer from '../../../../components/NameBalanceContainer';
import ViewAll from '../../../../components/ViewAll';
import {
  GetBankBalance,
  GetSalesman,
  GetItemBalance,
  GetPayable,
  GetReceivable,
} from '../../../../global/ChartApisCall';

const MoreDetail = ({navigation, route}) => {
  const {slider_data} = route.params;

  const [AllBalanceDataState, setAllBalanceDataState] = useState(null);
  const [BalanceCircleBarState, setBalanceCircleBarState] = useState(null);

  const [AllSalesmanDataState, setAllSalesmanDataState] = useState(null);
  const [SalesmanCircleBarState, setSalesmanCircleBarState] = useState(null);

  const [AllItemBalanceDataState, setAllItemBalanceDataState] = useState(null);
  const [ItemBalanceCircleBarState, setItemBalanceCircleBarState] =
    useState(null);

  const [AllPayableDataState, setAllPayableDataState] = useState(null);
  const [PayableCircleBarState, setPayableCircleBarState] = useState(null);

  const [AllRecivableDataState, setAllRecivableDataState] = useState(null);
  const [RecivableCircleBarState, setRecivableCircleBarState] = useState(null);

  const colors = [
    '#910000',
    '#00FF26',
    '#FF704D',
    '#DA0000',
    '#FF9168',
    '#FF5234',
    '#AD5959',
    '#ABCD12',
    '#910000',
    '#FFAA00',
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBankBalance();
      getSalesman();
      getItemBalance();
      getPayable();
      getReceivable();
    });
    return unsubscribe;
  }, [navigation]);

  const getBankBalance = async () => {
    const allbalancedata = await GetBankBalance();

    if (allbalancedata?.data_bank_bal) {
      const balanceBar = allbalancedata?.data_bank_bal.map((item, index) => {
        const rawValue = parseFloat(Math.round(item.bank_balance));
        const cleanValue = rawValue < 0 ? 5 : rawValue;

        return {
          value: cleanValue,
          color: colors[index % colors.length],
        };
      });
      setBalanceCircleBarState(balanceBar);
    }
    setAllBalanceDataState(allbalancedata);
  };

  const getSalesman = async () => {
    const AllSalesman = await GetSalesman();

    if (AllSalesman?.data_salesman_bal) {
      const SalesmanBar = AllSalesman?.data_salesman_bal.map((item, index) => {
        const rawValue = parseFloat(Math.round(item.Balance));
        const cleanValue = rawValue < 0 ? 5 : rawValue;

        return {
          value: cleanValue,
          color: colors[index % colors.length],
        };
      });
      setSalesmanCircleBarState(SalesmanBar);
    }

    setAllSalesmanDataState(AllSalesman);
  };

  const getItemBalance = async () => {
    const AllItemBalance = await GetItemBalance();

    if (AllItemBalance?.data_item_bal) {
      const ItemBalanceBar = AllItemBalance?.data_item_bal.map(
        (item, index) => {
          const rawValue = parseFloat(Math.round(item.total));
          const cleanValue = rawValue < 0 ? 5 : rawValue;

          return {
            value: cleanValue,
            color: colors[index % colors.length],
          };
        },
      );
      setItemBalanceCircleBarState(ItemBalanceBar);
    }

    setAllItemBalanceDataState(AllItemBalance);
  };

  const getPayable = async () => {
    const AllPayable = await GetPayable();

    if (AllPayable?.data_supp_bal) {
      const Payable = AllPayable?.data_supp_bal.map((item, index) => {
        const rawValue = parseFloat(Math.round(item.Balance));
        const cleanValue = rawValue < 0 ? 5 : rawValue;

        return {
          value: cleanValue,
          color: colors[index % colors.length],
        };
      });
      setPayableCircleBarState(Payable);
    }

    setAllPayableDataState(AllPayable);
  };

  const getReceivable = async () => {
    const AllRecivable = await GetReceivable();

    if (AllRecivable?.data_cust_bal) {
      const Recivable = AllRecivable?.data_cust_bal.map((item, index) => {
        const rawValue = parseFloat(Math.round(item.Balance));
        const cleanValue = rawValue < 0 ? 5 : rawValue;

        return {
          value: cleanValue,
          color: colors[index % colors.length],
        };
      });
      setRecivableCircleBarState(Recivable);
    }

    setAllRecivableDataState(AllRecivable);
  };


  return (
    <View>
      <SimpleHeader title="Details" />
      <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 200}}>
        <View style={{padding: 20}}>
          {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ position: 'absolute', zIndex: 1 }}>
                            <AppText title='Customer balance' titleSize={2} titleWeight />
                        </View>

                        <PieChart widthAndHeight={250} series={series} cover={0.7} style={{ alignSelf: 'center' }} />
                    </View>

                    <View style={styles.headerContainer}>
                        <AppText title='Top 10 Customer Balance' titleSize={2} titleWeight titleSizeWeight={40} />
                        <ViewAll onPress={()=> navigation.navigate("NormalViewAll",{AllData: slider_data?.data_view_cust_bal, dataname: "Customer"})}/>
                    </View>

                    <View style={{ gap: 10, marginTop: 20 }}>

                        <FlatList
                            data={slider_data?.data_cust_bal}
                            contentContainerStyle={{ gap: 10 }}
                            renderItem={({ item }) => {
                                console.log("item", item)
                                return (
                                    <NameBalanceContainer Name={item?.name} balance={item?.Balance} />
                                )

                            }}
                        />
                    </View> */}

          {/* supplier info */}

          {/* <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>

                        <View style={{ position: 'absolute', zIndex: 1 }}>
                            <AppText title='Supplier balance' titleSize={2} titleWeight />
                        </View>

                        <PieChart widthAndHeight={250} series={data_supp_bal} cover={0.7} style={{ alignSelf: 'center' }} />
                    </View>

                    <View style={styles.headerContainer}>
                        <AppText title='Top 10 Supplier Customer' titleSize={2} titleWeight titleSizeWeight={40} />
                        <ViewAll onPress={()=> navigation.navigate("NormalViewAll",{AllData: slider_data?.data_supp_bal_view_all , dataname: "Supplier"})}/>
                    </View>


                    <View style={{ gap: 10, marginTop: 20 }}>

                        <FlatList
                            data={slider_data?.data_supp_bal}
                            contentContainerStyle={{ gap: 10 }}
                            renderItem={({ item }) => {
                                console.log("item", item)
                                return (
                                    <NameBalanceContainer Name={item?.supp_name} balance={item?.Balance} />
                                )

                            }}
                        />
                    </View> */}

          {/* Bank balance info */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{position: 'absolute', zIndex: 1}}>
              <AppText title="Bank balance" titleSize={2} titleWeight />
            </View>

            {BalanceCircleBarState && (
              <PieChart
                widthAndHeight={250}
                series={BalanceCircleBarState}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />
            )}
          </View>

          <View style={styles.headerContainer}>
            <AppText
              title="Top 10 Bank Balance"
              titleSize={2}
              titleWeight
              titleSizeWeight={40}
            />
            <ViewAll
              onPress={() =>
                navigation.navigate('NormalViewAll', {
                  AllData: AllBalanceDataState?.data_bank_bal_view_all,
                  dataname: 'Bank',
                })
              }
            />
          </View>

          <View style={{gap: 10, marginTop: 20}}>
            <FlatList
              data={AllBalanceDataState?.data_bank_bal}
              contentContainerStyle={{gap: 10}}
              renderItem={({item}) => {
                return (
                  <NameBalanceContainer
                    Name={item?.bank_name}
                    balance={item?.bank_balance}
                  />
                );
              }}
            />
          </View>

          {/* Salesman info */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{position: 'absolute', zIndex: 1}}>
              <AppText title="Salesman" titleSize={2} titleWeight />
            </View>

            {SalesmanCircleBarState && (
              <PieChart
                widthAndHeight={250}
                series={SalesmanCircleBarState}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />
            )}
          </View>
          {console.log('AllSalesmanDataState', AllSalesmanDataState)}
          <View style={styles.headerContainer}>
            <AppText
              title="Top 10 Salesman"
              titleSize={2}
              titleWeight
              titleSizeWeight={40}
            />
            <ViewAll
              onPress={() =>
                navigation.navigate('NormalViewAll', {
                  AllData: AllSalesmanDataState?.data_salesman_bal_view_all,
                  dataname: 'salesman',
                })
              }
            />
          </View>

          <View style={{gap: 10, marginTop: 20}}>
            {AllSalesmanDataState?.data_salesman_bal > 0 ? (
              <FlatList
                data={AllSalesmanDataState?.data_salesman_bal}
                contentContainerStyle={{gap: 10}}
                renderItem={({item}) => {
                  return (
                    <NameBalanceContainer
                      Name={item?.salesman_name}
                      balance={item?.Balance}
                    />
                  );
                }}
              />
            ) : (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <AppText title="No top salesman found" titleSize={2} />
              </View>
            )}
          </View>

          {/* Item balacne info */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{position: 'absolute', zIndex: 1}}>
              <AppText title="Item" titleSize={2} titleWeight />
            </View>

            {ItemBalanceCircleBarState && (
              <PieChart
                widthAndHeight={250}
                series={ItemBalanceCircleBarState}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />
            )}
          </View>

          <View style={styles.headerContainer}>
            <AppText
              title="Top 10 Item Balance"
              titleSize={2}
              titleWeight
              titleSizeWeight={40}
            />
            <ViewAll
              onPress={() =>
                navigation.navigate('NormalViewAll', {
                  AllData: AllItemBalanceDataState?.data_item_bal_view_all,
                  dataname: 'item',
                })
              }
            />
          </View>

          <View style={{gap: 10, marginTop: 20}}>
            <FlatList
              data={AllItemBalanceDataState?.data_item_bal}
              contentContainerStyle={{gap: 10}}
              renderItem={({item}) => {
                return (
                  <NameBalanceContainer
                    Name={item?.description}
                    balance={item?.total}
                  />
                );
              }}
            />
          </View>

            
                 {/* Payable info */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{position: 'absolute', zIndex: 1}}>
              <AppText title="Payable balance" titleSize={2} titleWeight />
            </View>

            {PayableCircleBarState && (
              <PieChart
                widthAndHeight={250}
                series={PayableCircleBarState}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />
            )}
          </View>
          
          <View style={styles.headerContainer}>
            <AppText
              title="Top 10 Payable"
              titleSize={2}
              titleWeight
              titleSizeWeight={40}
            />
            <ViewAll
              onPress={() =>
                navigation.navigate('NormalViewAll', {
                  AllData: AllPayableDataState?.data_supp_bal_view_all,
                  dataname: 'Payable',
                })
              }
            />
          </View>

          <View style={{gap: 10, marginTop: 20}}>
            <FlatList
              data={AllPayableDataState?.data_supp_bal}
              contentContainerStyle={{gap: 10}}
              renderItem={({item}) => {
                return (
                  <NameBalanceContainer
                    Name={item?.supp_name}
                    balance={item?.Balance}
                  />
                );
              }}
            />
          </View>


                     {/* Payable info */}

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{position: 'absolute', zIndex: 1}}>
              <AppText title="Receivable" titleSize={2} titleWeight />
            </View>

            {RecivableCircleBarState && (
              <PieChart
                widthAndHeight={250}
                series={RecivableCircleBarState}
                cover={0.7}
                style={{alignSelf: 'center'}}
              />
            )}
          </View>
          
          <View style={styles.headerContainer}>
            <AppText
              title="Top 10 Receivable"
              titleSize={2}
              titleWeight
              titleSizeWeight={40}
            />
            <ViewAll
              onPress={() =>
                navigation.navigate('NormalViewAll', {
                  
                  AllData: AllRecivableDataState?.data_view_cust_bal,
                  dataname: 'Receivable',
                })
              }
            />
          </View>

          <View style={{gap: 10, marginTop: 20}}>
            <FlatList
              data={AllRecivableDataState?.data_cust_bal}
              contentContainerStyle={{gap: 10}}
              renderItem={({item}) => {
                return (
                  <NameBalanceContainer
                    Name={item?.name}
                    balance={item?.Balance}
                  />
                );
              }}
            />
          </View>



              
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreDetail;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
