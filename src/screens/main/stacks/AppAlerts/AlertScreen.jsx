import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleHeader from '../../../../components/SimpleHeader'
import AlertCards from '../../../../components/AlertCards'
import moment from 'moment'
import axios from 'axios'
import BaseUrl from '../../../../utils/BaseUrl'
import { APPCOLORS } from '../../../../utils/APPCOLORS'

const AlertScreen = ({ navigation }) => {

  const [slider_data, setslider_data] = useState()
  const [AllData, setAllData] = useState()

  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMoneyData()
    })
    return unsubscribe
  }, [navigation])



  const getMoneyData = async () => {
    setLoader(true)


    const options = {
      method: 'GET',
      url: `${BaseUrl}dash_approval.php`,
      headers: {
      },
    };

    try {
      const { data } = await axios.request(options);
      // console.log(data);
      // setslider_data(data)
      setAllData(data)
      setLoader(false)
    } catch (error) {
      console.error(error);
      setLoader(false)
    }
  }

  return (
    <View>
      <SimpleHeader title='Alerts' />
      <View style={{ gap: 30, marginTop: 20 }}>

        {
          loader && (
            <ActivityIndicator size={'large'} color={APPCOLORS.BLACK}/>
          )
        }

        <AlertCards
          AlertHeading={"Sales Alert"}
          HeadingOne={"Quotation approval"}
          ValueOne={AllData?.approval_data?.quotation_approval}
          onValuePressOne={()=> navigation.navigate("ShowUnapprovedDetails",{dataDetail: AllData?.data_unapprove_quote})}


          HeadingTwo={"So approval"}
          ValueTwo={AllData?.approval_data?.so_approval}
          

          HeadingThree={"Po approval"}
          ValueThree={AllData?.approval_data?.po_approval}
          onValuePressThree={()=> navigation.navigate("ShowUnapprovedDetails",{dataDetail: AllData?.data_unapprove_po_order})}

        />
        <AlertCards data={AllData}
        AlertHeading={"Purchase Alert"}
         HeadingOne={"Grn approval"}
          ValueOne={AllData?.approval_data?.grn_approval}

          HeadingTwo={"Invoice approval"}
          ValueTwo={AllData?.approval_data?.po_invoice_approval}

          HeadingThree={"Voucher approval"}
          ValueThree={AllData?.approval_data?.voucher_approval}

        />
        <AlertCards data={AllData} 
         AlertHeading={"Inventory Alert"}
          HeadingOne={"Delivery approval"}
          ValueOne={AllData?.approval_data?.delivery_approval}

          HeadingTwo={"Invoice approval"}
          ValueTwo={AllData?.approval_data?.invoice_approval}

    
        />
      </View>
    </View>
  )
}

export default AlertScreen