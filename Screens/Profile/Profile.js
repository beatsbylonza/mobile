import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { useIsFocused } from '@react-navigation/native';

export default function Profile({ navigation }) {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);

    const getData = async (key) => {
        try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        // error reading value
            console.log(e)
        }
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused){
            getData('currentUser').then((token)=>{
                const decoded = jwt_decode(token);
                setCurrentUser(decoded)
                setLoading(false)
            })
        }
    },[isFocused]);

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
        console.log('Done.')
      }
      

    const logoutFunction = () =>{
        clearAll().then(()=>{
            navigation.navigate('GetStarted');
        })
    }

    if(!loading){
        return (
            <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
                <StatusBar style="auto" /> 
                
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                    </View>
                    <View style={styles.headerRight}>
                        {/* <TouchableOpacity>
                            <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#C2C2C2"  style={{marginLeft:RFPercentage(3)}}/>
                        </TouchableOpacity> */}
                    </View>
                </View>
    
                <View style={styles.mainView}>
                    <ScrollView>
                        <View style={styles.profileView}>
                            <Text style={styles.nameText}>{`${currentUser.firstName} ${currentUser.middleName[0]}. ${currentUser.lastName}`}</Text>
                            <Text style={styles.emailText}>{currentUser.email}</Text>
                        </View>
                        <View style={styles.profileSettingsView}>
                            <TouchableOpacity style={styles.profileSettingsSquare} onPress={()=>navigation.push('PersonalInformation')}>
                                <View style={styles.profileSettingsLeft}>
                                    <Ionicons name="person-outline" size={RFPercentage(2.75)} color="#161616" />
                                    <Text style={styles.profileSettingsText}>Personal Information</Text>
                                </View>
                                <MaterialIcons name="arrow-forward-ios" size={RFPercentage(2.75)} color="#161616" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileSettingsSquare} onPress={()=>{navigation.navigate('ChangePassword')}}>
                                <View style={styles.profileSettingsLeft}>
                                    <Ionicons name="key-outline" size={RFPercentage(2.75)} color="#161616" />
                                    <Text style={styles.profileSettingsText}>Change Password</Text>
                                </View>
                                <MaterialIcons name="arrow-forward-ios" size={RFPercentage(2.75)} color="#161616" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileSettingsSquare}>
                                <View style={styles.profileSettingsLeft}>
                                    <MaterialIcons name="history" size={RFPercentage(2.75)} color="#161616" />
                                    <Text style={styles.profileSettingsText}>Transaction History</Text>
                                </View>
                                <MaterialIcons name="arrow-forward-ios" size={RFPercentage(2.75)} color="#161616" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileSettingsSquare}>
                                <View style={styles.profileSettingsLeft}>
                                    <Feather name="box" size={RFPercentage(2.75)} color="#161616" />
                                    <Text style={styles.profileSettingsText}>Shipment Status</Text>
                                </View>
                                <MaterialIcons name="arrow-forward-ios" size={RFPercentage(2.75)} color="#161616" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.logoutView} onPress={logoutFunction}>
                            <MaterialIcons name="logout" size={RFPercentage(3)} color="white" />
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
    
            </LinearGradient>
        );
    }else{
        return(<Text>Loading</Text>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop:RFPercentage(5),
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
    mainView:{
        flex:1,
        marginBottom:RFPercentage(7.5),
        width:'100%',
    },
    profileImg:{
        width:RFPercentage(15),
        height:RFPercentage(15),
    },
    dpView:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:RFPercentage(100),
        width:RFPercentage(15),
        height:RFPercentage(15),
        overflow:'hidden',
        marginBottom:RFPercentage(2),
    },
    profileView:{
        alignItems:'center',
        padding:RFPercentage(3),
        marginTop:RFPercentage(5)
    },
    nameText:{
        fontFamily:'RobotoRegular',
        fontSize:(20),
        color:'white',
        marginBottom:RFPercentage(.5)
    },
    emailText:{
        fontFamily:'RobotoRegular',
        fontSize:(13),
        color:'white',
    },
    profileSettingsView:{

    },
    profileSettingsSquare:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        marginHorizontal:RFPercentage(5),
        borderRadius:RFPercentage(.5),
        marginVertical:RFPercentage(1),
        padding:RFPercentage(2.25),
    },
    profileSettingsLeft:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    profileSettingsText:{
        fontFamily:'RobotoBold',
        color:'#000000',
        marginLeft:RFPercentage(2)
    },
    cameraView:{
        backgroundColor:'white',
        borderRadius:RFPercentage(.75),
        height:RFPercentage(3),
        width:RFPercentage(3),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:RFPercentage(14),
        right:RFPercentage(19.5)
    },
    logoutView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3681C3',
        width:RFPercentage(42),
        alignSelf:'center',
        paddingHorizontal:RFPercentage(5),
        paddingVertical:RFPercentage(2),
        borderRadius:RFPercentage(5),
        marginTop:RFPercentage(5),
    },
    logoutText:{
        fontFamily:'RobotoRegular',
        fontSize:(15),
        color:'white',
        marginHorizontal:RFPercentage(1),
    }
})