import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { NetworkContext } from '../NetworkContext';

import notif from '../../assets/notif.png';

export default function Notification() {
    const currentUser = React.useContext(NetworkContext);

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    {/* <TouchableOpacity>
                        <Feather name="menu" size={RFPercentage(3)} color="#C2C2C2" />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#C2C2C2"  style={{marginLeft:RFPercentage(3)}}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.mainView}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Notifications</Text>
                    <TouchableOpacity>
                        <Text style={styles.clear}>Clear all</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.notificationView}>
                <ImageBackground source={notif} resizeMode="cover" style={styles.notifImg} />
                <Text style={[styles.clear, {marginTop:RFPercentage(2)}]}>No New Notification!</Text>
            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop:RFPercentage(5),
    },
    mainView:{
        width:'100%',
        paddingHorizontal:RFPercentage(2),
        marginVertical:RFPercentage(2),
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
    },
    title:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize:RFPercentage(2.5),
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
    },
    headerLeft:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        flex:1,
        paddingLeft:RFPercentage(2),
    },
    headerRight:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        flex:1,
        paddingRight:RFPercentage(2),
    },
    clear:{
        fontFamily:'RobotoRegular',
        color:'#FFFFFF',
        fontSize:RFPercentage(1.75),
    },
    notifImg:{
        width:RFPercentage(20),
        height:RFPercentage(20),
    },
    notificationView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:RFPercentage(7.5)
    },
})