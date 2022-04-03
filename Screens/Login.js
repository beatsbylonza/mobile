import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Modal, Alert} from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import logo from '../assets/logo.png';
import Ellipse3 from '../assets/Ellipse3.png';
import Ellipse4 from '../assets/Ellipse4.png';
import Ellipse5 from '../assets/Ellipse5.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function Login({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const getData = async (key) => {
            try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch(e) {
            // error reading value
            }
        }
        getData('listOfUsers').then((data)=>{
            setUsers(data)});
    },[])

    const storeData = async (value, key) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          // saving error
        }
    }

    const signIn = () => {
        axios.post('http://192.168.1.3:3000/api/login', {
            "email": email,
            "password": password
        }).then((response)=>{
            const { token } = response.data;
            setEmail('');
            setPassword('');
            storeData(token, 'currentUser')
            navigation.navigate('MyTabs');
        }, (error)=>{
            const { message } = error.response.data;
            Alert.alert('Login Failed', message, [
                { text: 'OK' },
            ]);
        })
    }

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            {
                (modalVisible) ?
                <View style={styles.backBlack}/>
                : null
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <TouchableOpacity style={styles.forgotPasswordTouchable} onPress={()=> {setModalVisible(false)}}>
                    
                </TouchableOpacity>
                <View style={styles.forgotPasswordModalView}>
                    <Text style={styles.forgotPasswordModalMainText}>Forgot your password?</Text>
                    <Text style={styles.forgotPasswordModalSubText}>Enter your email address and we will share a link to create new password</Text>
                    <TextInput placeholder='Email' style={styles.forgotPasswordTextInput}/>
                    <TouchableOpacity style={styles.forgotPasswordButton}>
                        <Feather name="send" size={RFPercentage(3)} color="white" />
                        <Text style={styles.send}>Send</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
 

            <ImageBackground source={Ellipse3} resizeMode="cover" style={styles.ellipse3} />
            <ImageBackground source={Ellipse4} resizeMode="cover" style={styles.ellipse4} />
            <ImageBackground source={Ellipse5} resizeMode="cover" style={styles.ellipse5} />

            <Image source={logo} style={styles.logo}/>
            <View style={styles.signInView}>
                <Text style={styles.signInText}>Sign in</Text>
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput} placeholder={'Email'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setEmail} value={email}/>
                <View style={styles.passwordView}>
                    <TextInput style={styles.textInput2} placeholder={'Password'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setPassword} secureTextEntry={!eye} value={password}/>
                    {
                        eye ?
                        <TouchableOpacity onPress={()=> setEye(false)}>
                            <Feather name="eye" size={RFPercentage(2.5)} color="#D6D5CB" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=> setEye(true)}>
                            <Feather name="eye-off" size={RFPercentage(2.5)} color="#D6D5CB" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={styles.signInButtonView}>
                <TouchableOpacity style={styles.signInButton} onPress={signIn}>
                    <AntDesign name="caretright" size={RFPercentage(3)} color="#F7941D" />
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomTextView}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('CreateAccount')}>
                    <Text style={styles.createAccountText}>Create Account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.orView}>
                <View style={styles.line}></View>
                <Text style={styles.orText}>or</Text>
                <View style={styles.line}></View>
            </View>
            <TouchableOpacity style={styles.continueView}>
                <View style={styles.continueIconView}>
                    <FontAwesome5 name="facebook" size={RFPercentage(2)} color="white"/>
                </View>
                <View style={styles.continueTextView}>
                    <Text style={styles.continueText}>Continue with Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueView}>
                <View style={styles.continueIconView}>
                    <FontAwesome5 name="google-plus" size={RFPercentage(2)} color="white" />
                </View>
                    <View style={styles.continueTextView}>
                <Text style={styles.continueText}>Continue with Google</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueView}>
                <View style={styles.continueIconView}>
                    <FontAwesome5 name="apple" size={RFPercentage(2)} color="white" />
                </View>
                <View style={styles.continueTextView}>
                    <Text style={styles.continueText}>Continue with Apple</Text>
                </View>
            </TouchableOpacity>
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
    textInput2:{
        width:RFPercentage(26),
        color:'#FFFFFF',
        marginRight:RFPercentage(1.5)
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
    passwordView:{
        flexDirection:'row',
        width:RFPercentage(35),
        borderColor:'#B6B6B6',
        color:'#FFFFFF',
        borderWidth: 1,
        marginVertical: RFPercentage(1),
        paddingHorizontal: RFPercentage(2.5),
        paddingVertical: RFPercentage(.3),
        borderRadius: RFPercentage(1),
        alignItems:'center'
    },
    logo:{
        width: RFPercentage(20),
        height: RFPercentage(20),
    },
    signInButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(5),
        borderRadius:100,
    },
    signInButtonView:{
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
    signInText:{
        fontFamily:'RobotoBold',
        color: '#FFFFFF',
        fontSize: RFPercentage(3),
        marginTop:RFPercentage(2),
    },
    textInputView:{
        marginVertical: RFPercentage(2),
    },
    bottomTextView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:RFPercentage(35),
    },
    forgotPasswordText:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize: RFPercentage(1.75),
    },
    createAccountText:{
        fontFamily:'RobotoBold',
        color:'#F7941D',
        fontSize: RFPercentage(1.75),
    },
    orView:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:RFPercentage(2.5),
    },
    orText:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize: RFPercentage(1.75),
    },
    line:{
        borderWidth:.5,
        height:0,
        width:RFPercentage(15),
        marginHorizontal:RFPercentage(1),
        borderColor:'#787878',
        marginVertical:RFPercentage(3)
    },
    continueView:{
        borderColor:'#B6B6B6',
        width:RFPercentage(35),
        borderWidth:1,
        flexDirection:'row',
        padding:RFPercentage(1),
        marginVertical:RFPercentage(1),
        alignItems:'center',
        borderRadius: RFPercentage(1),
    },
    continueText:{
        fontFamily:'RobotoRegular',
        color:'#FFFFFF',
        fontSize: RFPercentage(1.75),
        marginHorizontal:RFPercentage(2),
        textAlign:'left',
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
    continueIconView:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center',
    },
    continueTextView:{
        flex:4,
        justifyContent:'center',
    },
    forgotPasswordTouchable:{
        flex: 11,
    },
    forgotPasswordModalView:{
        backgroundColor:'#FFFFFF',
        flex: 10,
        borderTopLeftRadius:RFPercentage(3),
        borderTopRightRadius:RFPercentage(3),
        paddingHorizontal:RFPercentage(8),
        paddingVertical:RFPercentage(5)
    },
    forgotPasswordModalMainText:{
        color:'#363636',
        fontFamily:'RobotoBold',
        fontSize:RFPercentage(2.5),
        textAlign:'center'
    },
    forgotPasswordModalSubText:{
        color:'#747474',
        fontFamily:'RobotoRegular',
        fontSize:RFPercentage(1.75),
        textAlign:'center',
        marginTop:RFPercentage(1),
    },
    forgotPasswordTextInput:{
        borderColor:'#B6B6B6',
        borderWidth:1,
        paddingVertical:RFPercentage(.75),
        paddingHorizontal:RFPercentage(2.5),
        borderRadius:RFPercentage(2),
        color:'#373737',
        marginVertical:RFPercentage(2),
    },
    forgotPasswordButton:{
        backgroundColor:'#F7941D',
        flexDirection:'row',
        padding:RFPercentage(1),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:RFPercentage(5),
        marginVertical:RFPercentage(2),
    },
    send:{
        color:'white',
        fontSize:RFPercentage(2),
        marginHorizontal:RFPercentage(1),
        fontFamily:'RobotoRegular',
    },
    backBlack:{
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(0,0,0,.5)',
        zIndex:1,
    },
})