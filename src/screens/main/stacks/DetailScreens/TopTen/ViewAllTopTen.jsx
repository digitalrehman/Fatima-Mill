import { View, Text, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import NameBalanceContainer from '../../../../../components/NameBalanceContainer'
import AppText from '../../../../../components/AppText'
import SimpleHeader from '../../../../../components/SimpleHeader'

const ViewAllTopTen = ({ navigation, route }) => {
  const { name, allData } = route.params;

  const [filteredData, setFilteredData] = useState(allData);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(allData);
    } else {
      const lowerText = text.toLowerCase();
      const filtered = allData.filter(item => {
        if (name === 'Suppliers') {
          return item?.supp_name?.toLowerCase().includes(lowerText);
        } else if (name === 'Banks') {
          return item?.bank_name?.toLowerCase().includes(lowerText);
        } else if (name === 'Items') {
          return item?.description?.toLowerCase().includes(lowerText);
        } else if (name === 'Salesman') {
          return item?.salesman_name?.toLowerCase().includes(lowerText);
        } else {
          return item?.name?.toLowerCase().includes(lowerText);
        }
      });
      setFilteredData(filtered);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SimpleHeader title={`All ${name}`} />

      <View style={{ marginTop: 20, padding: 20 }}>
        <AppText title={`All ${name}`} titleSize={2} titleWeight />

        {/* Search Bar */}
        <TextInput
          value={searchText}
          onChangeText={handleSearch}
          placeholder={`Search ${name}`}
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            marginVertical: 10,
          }}
        />

        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => {
            return (
              <NameBalanceContainer
                Name={
                  name === 'Suppliers'
                    ? item?.supp_name
                    : name === 'Items'
                    ? item.description
                    : name === 'Banks'
                    ? item?.bank_name
                    : name === 'Salesman'
                    ? item?.salesman_name
                    : item?.name
                }
                balance={
                  name === 'Items'
                    ? item.total
                    : name === 'Banks'
                    ? item?.bank_balance
                    : item?.Balance
                }
                type={name}
                item={item}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default ViewAllTopTen;
