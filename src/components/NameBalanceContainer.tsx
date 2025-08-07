import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppText from './AppText';
import {APPCOLORS} from '../utils/APPCOLORS';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveWidth} from '../utils/Responsive';
import AppButton from './AppButton';
import {useNavigation} from '@react-navigation/native';
type props = {
  Name?: string;
  balance?: number;
  percent?: number;
  type?: string;
  item?: any;
  onPress?: () => void;
};
const NameBalanceContainer = ({
  Name,
  type,
  balance,
  percent,
  onPress,
  item,
}: props) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#E6E6E6', '#ACD7E5']}
      style={{padding: 20, borderRadius: 20}}>
      <TouchableOpacity >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AppText
            title="Name"
            titleSize={1.6}
            titleWeight
            titleColor={APPCOLORS.BLACK}
          />

          <View style={{flexDirection: 'row', gap: 50}}>
            <AppText
              title="Balance"
              titleSize={1.6}
              titleWeight
              titleColor={APPCOLORS.BLACK}
            />
            <AppText
              title="%"
              titleSize={1.6}
              titleWeight
              titleColor={APPCOLORS.BLACK}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{width: responsiveWidth(44)}}>
            <AppText
              title={Name}
              titleSize={1.8}
              titleColor={APPCOLORS.BLACK}
            />
          </View>

          <View style={{flexDirection: 'row', gap: 40}}>
            <AppText
              title={Math.round(balance).toLocaleString()}
              titleSize={1.8}
              titleColor={APPCOLORS.BLACK}
            />
            <AppText title="0" titleSize={1.8} titleColor={APPCOLORS.BLACK} />
          </View>
        </View>
      </TouchableOpacity>

      {type == 'Customer' || type == 'Suppliers' || type == 'Items' ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          {type == 'Items' ? (
            <AppButton
              title="Ledger"
              btnWidth={80}
              onPress={() =>
                navigation.navigate('Ledger', {name: type, item: item})
              }
            />
          ) : (
            <>
              <AppButton
                title="Aging"
                btnWidth={37}
                onPress={() =>
                  navigation.navigate('Aging', {name: type, item: item})
                }
              />
              <AppButton
                title="Ledger"
                btnWidth={37}
                onPress={() =>
                  navigation.navigate('Ledger', {name: type, item: item})
                }
              />
            </>
          )}
        </View>
      ) : null}
    </LinearGradient>
  );
};

export default NameBalanceContainer;
