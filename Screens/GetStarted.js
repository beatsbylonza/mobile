import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import Ellipse1 from '../assets/Ellipse1.png';
import Ellipse2 from '../assets/Ellipse2.png';
import { useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { db } from '../firebase';
import axios from 'axios';

export default function GetStarted({ navigation }) {
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){
            let tempUsers = []
            let tempProducts = []
            // db.collection('users').get().then((snapshot)=>{
            //     snapshot.docs.map((doc)=>{
            //         let tempUser = doc.data()
            //         tempUser['id'] = doc.id
            //         tempUsers.push(tempUser);
            //     })
            //     storeData(tempUsers, 'listOfUsers');
            // })  
            
            // db.collection('products').get().then((querySnapshot) => {
            //     querySnapshot.forEach((doc, index)=>{
            //         let tempProduct = doc.data();
            //         tempProduct['id'] = doc.id
            //         tempProducts.push(tempProduct)
            //     })
            //     storeData(tempProducts, 'listOfProducts');
            // })

            axios.get('http://192.168.1.3:3000/api/customers', {
                headers: {
                    Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNmMDY2MTZmOTgwMWY0ZjdlZDFiMmUiLCJmaXJzdE5hbWUiOiJBZG1pbiIsIm1pZGRsZU5hbWUiOiJBZG1pbiIsImxhc3ROYW1lIjoiQWRtaW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDgzNjQ2NjksImV4cCI6MTY1MDk1NjY2OX0.B3XtuyHmBmbqR-UMf8E7uN4GOXUOfsMFp7Rmz_93JjA'
                }
            }).then((response)=>{
                console.log(response.data.data[0].email)
            })
            // axios.post('https://beatsbylonza.herokuapp.com/api/login', {
            //     "email": "admin@admin.com",
            //     "password": "12345"
            // }).then((reponse)=>{
            //     console.log(reponse.data)
            // })



            const storeData = async (value, key) => {
                try {
                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem(key, jsonValue)
                } catch (e) {
                // saving error
                }
            }
            const getData = async (key) => {
                try {
                const jsonValue = await AsyncStorage.getItem(key)
                return jsonValue != null ? JSON.parse(jsonValue) : null;
                } catch(e) {
                // error reading value
                }
            }
            getData('currentUser').then((data)=>{
                if(data){
                    navigation.navigate('MyTabs', {currentUser:data});
                }
            });
        }
    },[isFocused])

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <ImageBackground source={Ellipse1} resizeMode="cover" style={styles.ellipse1} />
            <ImageBackground source={Ellipse2} resizeMode="cover" style={styles.ellipse2} />

            <View style={styles.mainView}>
                <Text style={styles.tagline1Text}>Rediscover A Great</Text>
                <Text style={styles.tagline1Text}>Shopping Tradition</Text>
                <Text  style={styles.tagline2Text}>Providing memories with music</Text>
            </View>

            <View style={styles.getStartedView}>
                <TouchableOpacity style={styles.getStartedButton} onPress={()=>navigation.navigate('CreateAccount')}>
                    <AntDesign name="caretright" size={RFPercentage(3)} color="#F7941D" />
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bottomTextView}>
                <Text style={styles.alreadyText}>Already have an account? </Text>
                <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate('Login')}>
                    <Text style={styles.loginText}>Login</Text>
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
    mainView: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: RFPercentage(30),
    },
    tagline1Text:{
        fontFamily:'RobotoBold',
        color: '#FEBB2D',
        fontSize: RFPercentage(4),
        textAlign: 'center',
    },
    tagline2Text:{
        fontFamily:'RobotoBold',
        color: '#FFFFFF',
        fontSize: RFPercentage(2),
        textAlign: 'center',
        marginTop:RFPercentage(2),
    },
    alreadyText:{
        fontFamily:'RobotoBold',
        color: '#FFFFFF',
        fontSize: RFPercentage(1.5),
        textAlign: 'center',
    },
    loginText:{
        fontFamily:'RobotoBold',
        color: '#F7941D',
        fontSize: RFPercentage(1.5),
        textAlign: 'center',
    },
    loginButton:{
        alignItems:'center',
        justifyContent:'center'
    },
    bottomTextView:{
        flexDirection:'row'
    },
    buttonText:{
        fontFamily:'RobotoBold',
        color: '#000000',
        fontSize: RFPercentage(2),
        textAlign: 'center',
        paddingHorizontal:RFPercentage(1),
    },
    getStartedButton:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(5),
        borderRadius:100,
    },
    getStartedView:{
        marginBottom:RFPercentage(4),
    },
    ellipse1:{
        position:'absolute',
        left: RFPercentage(27),
        top: RFPercentage(-10),
        width:RFPercentage(40),
        height:RFPercentage(40),
    },
    ellipse2:{
        position:'absolute',
        left: RFPercentage(-10),
        top: RFPercentage(12),
        width:RFPercentage(25),
        height:RFPercentage(25),
    }
})