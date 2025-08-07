import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import SimpleHeader from '../../../../components/SimpleHeader';
import {APPCOLORS} from '../../../../utils/APPCOLORS';
import AppText from '../../../../components/AppText';
import {responsiveWidth} from '../../../../utils/Responsive';
import AppButton from '../../../../components/AppButton';

const ApprovalScreen = () => {
  return (
    <View style={{paddingBottom:100}}>
      <SimpleHeader title="Approval screen" />

    
    <FlatList
    data={[1, 2, 3, 4, 5]}
    renderItem={()=>{
        return(
            <View style={{padding: 20}}>
        <View style={{padding: 20, backgroundColor: APPCOLORS.Secondary, borderRadius:15}}>
          <AppText title="Lorem ipsum" titleSize={2.2} titleWeight/>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{gap: 10}}>
              <AppButton title="Approve" btnWidth={80} />
              <AppButton title="Disapprove" btnWidth={80} />
            </View>
          </View>

        </View>
      </View>
        )
    }}
    />
      
    </View>
  );
};

export default ApprovalScreen;
