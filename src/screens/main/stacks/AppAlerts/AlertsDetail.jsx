import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import SimpleHeader from '../../../../components/SimpleHeader'
import AlertCards from '../../../../components/AlertCards'
import DropButtons from '../../../../components/DropButtons'
import { responsiveWidth } from '../../../../utils/Responsive'
import { APPCOLORS } from '../../../../utils/APPCOLORS'

const AlertsDetail = () => {

    const headers = ['Lorem', 'Lorem', 'Lorem', 'Lorem', 'Approvals'];
    const rowData = ['Ipsum', 'Ipsum', 'Ipsum', 'Approved', 'Approved'];



    return (
        <View>
            <SimpleHeader title='Alerts Details' />
            <View style={{ gap: 30, marginTop: 20 }}>
                <View style={{ padding: 20, gap: 20 }}>

                    <View style={styles.container}>
                        <DropButtons title='Customer' buttonWith={40} />
                        <DropButtons title='Customer' buttonWith={40} />
                    </View>

                    <View style={styles.container}>
                        <DropButtons title='Customer' buttonWith={40} />
                        <DropButtons title='Customer' buttonWith={40} />
                    </View>

                    <View style={styles.container}>
                        <DropButtons title='Customer' buttonWith={40} />
                        <DropButtons title='Customer' buttonWith={40} />
                    </View>

                    <View style={styles.container}>
                        <DropButtons title='Customer' buttonWith={40} />
                        <DropButtons title='Customer' buttonWith={40} />
                    </View>

                    <View style={styles.container}>
                        <DropButtons title='Customer' buttonWith={40} />
                        <DropButtons title='Customer' buttonWith={40} />
                    </View>

                </View>


                {/* <View style={{ gap: 50 }}>

                    <View style={{ width: responsiveWidth(100), height: 1, backgroundColor: APPCOLORS.BLACK }} />

                    <View style={{ width: responsiveWidth(100), height: 1, backgroundColor: APPCOLORS.BLACK }} />

                    <View style={{ position: 'absolute', zIndex: 1, gap: responsiveWidth(20), flexDirection: 'row' }}>

                        <View style={{ width: 1, height: responsiveWidth(100), backgroundColor: APPCOLORS.BLACK, alignSelf: 'center' }} />
                        <View style={{ width: 1, height: responsiveWidth(100), backgroundColor: APPCOLORS.BLACK, alignSelf: 'center' }} />

                        <View style={{ width: 1, height: responsiveWidth(100), backgroundColor: APPCOLORS.BLACK, alignSelf: 'center' }} />

                        <View style={{ width: 1, height: responsiveWidth(100), backgroundColor: APPCOLORS.BLACK, alignSelf: 'center' }} />
                        <View style={{ width: 1, height: responsiveWidth(100), backgroundColor: APPCOLORS.BLACK, alignSelf: 'center' }} />


                    </View>
                </View> */}

                <ScrollView horizontal>
                    <View style={styles.table}>
                        {/* Header Row */}
                        <View style={styles.row}>
                            {headers.map((header, i) => (
                                <View key={i} style={styles.cell}>
                                    <Text style={styles.headerText}>{header}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Data Row */}
                        <View style={styles.row}>
                            {rowData.map((data, i) => (
                                <View key={i} style={styles.cell}>
                                    <Text style={styles.cellText}>{data}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>


            </View>
        </View>
    )
}

export default AlertsDetail


const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    table: {
        borderWidth: 1,
        borderColor: '#000',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        width: 100,
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cellText: {
        textAlign: 'center',
    },
})