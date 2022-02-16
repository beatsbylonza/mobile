import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { db } from '../firebase';

export default function Profile({ navigation, route }) {
    const { currentUser } = route.params;
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);
    const [eye3, setEye3] = useState(false);

    const saveChanges = () =>{
        if(currentPassword === currentUser.currentUser.password && newPassword === reEnterPassword && newPassword !== currentPassword){
            db.collection('users').doc(currentUser.id).update({
                password:newPassword
            }).then(()=>{
                Alert.alert(
                    "Change Password",
                    "Successfully Updated",
                    [
                      {
                        text: "Proceed",
                        onPress: () => navigation.goBack(),
                        style: "default",
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  );
            }).catch(()=>{
                Alert.alert(
                    "Error",
                    "Unsuccesful Update",
                    [
                      {
                        text: "Proceed",
                        onPress: () => navigation.goBack(),
                        style: "default",
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  );
            });
        }
    }

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
        <StatusBar style="auto" /> 

        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <MaterialIcons style={styles.arrow} name="arrow-back" size={RFPercentage(3)} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.mainText}>Change Password</Text>

        <View style={styles.mainView}>
            <Text style={styles.title}>Current Password</Text>
            <View style={styles.textInputView}>
                <TextInput secureTextEntry={!eye1} style={styles.textInput} onChangeText={setCurrentPassword}/>
                {
                    eye1 ?
                    <TouchableOpacity onPress={()=>setEye1(false)}>
                        <Feather style={styles.eye} name="eye" size={RFPercentage(2.5)} color="#28364C" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>setEye1(true)}>
                        <Feather style={styles.eye} name="eye-off" size={RFPercentage(2.5)} color="#28364C" />
                    </TouchableOpacity>
                }
            </View>
        </View>

        <View style={styles.mainView}>
            <Text style={styles.title}>New Password</Text>
            <View style={styles.textInputView}>
                <TextInput secureTextEntry={!eye2} style={styles.textInput} onChangeText={setNewPassword}/>
                {
                    eye2 ?
                    <TouchableOpacity onPress={()=>setEye2(false)}>
                        <Feather style={styles.eye} name="eye" size={RFPercentage(2.5)} color="#28364C" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>setEye2(true)}>
                        <Feather style={styles.eye} name="eye-off" size={RFPercentage(2.5)} color="#28364C" />
                    </TouchableOpacity>
                }
            </View>
        </View>

        <View style={styles.mainView}>
            <Text style={styles.title}>Re-enter Password</Text>
            <View style={styles.textInputView}>
                <TextInput secureTextEntry={!eye3} style={styles.textInput} onChangeText={setReEnterPassword}/>
                {
                    eye3 ?
                    <TouchableOpacity onPress={()=>setEye3(false)}>
                        <Feather style={styles.eye} name="eye" size={RFPercentage(2.5)} color="#28364C" />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=>setEye3(true)}>
                        <Feather style={styles.eye} name="eye-off" size={RFPercentage(2.5)} color="#28364C" />
                    </TouchableOpacity>
                }
            </View>
        </View>


        <TouchableOpacity style={styles.button} onPress={saveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    eye:{
        marginRight:RFPercentage(.5)
    },
    arrow:{
        marginBottom:RFPercentage(2)
    },
    button:{
        width:RFPercentage(45),
        height:RFPercentage(7),
        backgroundColor:'#3681C3',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:RFPercentage(2),
        marginTop:RFPercentage(5)
    },
    buttonText:{
        fontFamily:'RobotoBold',
        color:'white',
    },
    mainText:{
        fontFamily:'RobotoBold',
        color:'white',
        fontSize:RFPercentage(3),
        marginBottom:RFPercentage(3)
    },
    mainView:{
        marginBottom:RFPercentage(2)
    },
    title:{
        fontFamily:'RobotoRegular',
        color:'white',
        marginBottom:RFPercentage(.5),
        fontSize:RFPercentage(2)
    },
    textInputView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:RFPercentage(2)
    },
    textInput:{
        backgroundColor:'white',
        paddingHorizontal:RFPercentage(2),
        marginVertical:RFPercentage(.75),
        borderRadius:RFPercentage(1),
        height:RFPercentage(4.5),
        width:RFPercentage(40),

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal:RFPercentage(4),
        paddingVertical:RFPercentage(4),
    },
})