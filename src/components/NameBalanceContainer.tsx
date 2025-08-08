import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from './AppText';
import { APPCOLORS } from '../utils/APPCOLORS';
import { responsiveWidth } from '../utils/Responsive';
import AppButton from './AppButton';
import { useNavigation } from '@react-navigation/native';

type props = {
  Name?: string;
  balance?: number;
  percent?: number;
  type?: string;
  item?: any;
};

const NameBalanceContainer = ({
  Name,
  balance = 0,
  percent = 0,
  type,
  item,
}: props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        alignItems: 'center',
        borderColor: '#ccc',
        marginTop: 5,
        
      }}>
      <View style={{ width: responsiveWidth(35) }}>
        <AppText title={Name} titleSize={1.5} titleColor={APPCOLORS.BLACK} />
      </View>

      <View style={{ width: responsiveWidth(22) }}>
        <AppText
          title={Math.round(balance).toLocaleString()}
          titleSize={1.5}
          titleColor={APPCOLORS.BLACK}
        />
      </View>

      <View style={{ width: responsiveWidth(10) }}>
        <AppText title={percent.toString()} titleSize={1.5} />
      </View>

      <View
        style={{
          width: responsiveWidth(30),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 4,
        }}>
        {type === 'Items' ? (
          <AppButton
            title="Ledger"
            btnWidth={15}
            btnHeight={28}
            fontSize={1.2}
            onPress={() =>
              navigation.navigate('Ledger', { name: type, item: item })
            }
          />
        ) : type === 'Customer' || type === 'Suppliers' ? (
          <>
            <AppButton
              title="Ag"
              btnWidth={10}
              btnHeight={28}
              fontSize={1.2}
              onPress={() =>
                navigation.navigate('Aging', { name: type, item: item })
              }
            />
            <AppButton
              title="Led"
              btnWidth={10}
              btnHeight={28}
              fontSize={1.2}
              onPress={() =>
                navigation.navigate('Ledger', { name: type, item: item })
              }
            />
          </>
        ) : null}
      </View>

    </TouchableOpacity>
  );
};

export default NameBalanceContainer;