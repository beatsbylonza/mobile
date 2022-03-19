import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Modal} from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import logo from '../../assets/logo.png';
import Ellipse3 from '../../assets/Ellipse3.png';
import Ellipse4 from '../../assets//Ellipse4.png';
import Ellipse5 from '../../assets/Ellipse5.png';

export default function ChangePassword() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <ImageBackground source={Ellipse3} resizeMode="cover" style={styles.ellipse3} />
            <ImageBackground source={Ellipse4} resizeMode="cover" style={styles.ellipse4} />
            <ImageBackground source={Ellipse5} resizeMode="cover" style={styles.ellipse5} />

            <View style={styles.changePasswordView}>
                <Text style={styles.changePasswordText}>Change Password</Text>
                <Text style={styles.changePasswordTextSub}>Please change your password in order to be more secure</Text>
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput} placeholder={'Enter New Password'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'}/>
                <TextInput style={styles.textInput} placeholder={'Confirm New Password'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'}/>
            </View>
            <View style={styles.changePasswordButtonView}>
                <TouchableOpacity style={styles.changePasswordButton}>
                    <AntDesign name="caretright" size={RFPercentage(3)} color="#F7941D" />
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    changePasswordButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(5),
        borderRadius:100,
    },
    changePasswordButtonView:{
        marginBottom:RFPercentage(4),
    },
    buttonText:{
        fontFamily:'RobotoBold',
        color: '#000000',
        fontSize: RFPercentage(2),
        textAlign: 'center',
        paddingHorizontal:RFPercentage(1),
        width:RFPercentage(20),
    },
    changePasswordText:{
        fontFamily:'RobotoBold',
        color: '#FFFFFF',
        fontSize: RFPercentage(3),
        marginTop:RFPercentage(2),
    },
    textInputView:{
        marginVertical: RFPercentage(2),
    },
    textInput:{
        width:RFPercentage(35),
        borderColor:'#B6B6B6',
        color:'#FFFFFF',
        borderWidth: 1,
        marginVertical: RFPercentage(1),
        paddingHorizontal: RFPercentage(2.5),
        paddingVertical: RFPercentage(.3),
        borderRadius: RFPercentage(1),
    },
    ellipse3:{
        position:'absolute',
        left: RFPercentage(-5),
        top: RFPercentage(-5),
        width:RFPercentage(20),
        height:RFPercentage(20),
    },
    ellipse4:{
        position:'absolute',
        right: RFPercentage(-3),
        top: RFPercentage(-2),
        width:RFPercentage(10),
        height:RFPercentage(10),
    },
    ellipse5:{
        position:'absolute',
        right: RFPercentage(-3),
        bottom: RFPercentage(-3),
        width:RFPercentage(10),
        height:RFPercentage(10),
    },
    changePasswordTextSub:{
        fontFamily:'RobotoRegular',
        color: '#FFFFFF',
        fontSize: RFPercentage(2),
        marginTop:RFPercentage(2),
        textAlign:'center'
    },
    changePasswordView:{
        alignItems:'center',
        justifyContent:'center',
        width:RFPercentage(35),
    }
})