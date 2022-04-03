import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Profile({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [token, setToken] = useState('');

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getData('currentUser').then((token)=>{
            const decoded = jwt_decode(token);
            setToken(token)
            
            setFirstName(decoded.firstName);
            setMiddleName(decoded.middleName);
            setLastName(decoded.lastName);

            setEmail(decoded.email);
            setUserName(decoded.username);
            setContactNumber(decoded.contactNumber);

            setStreet(decoded.address.street);
            setCity(decoded.address.city);
            setState(decoded.address.state);
            setZipCode(decoded.address.zipcode);

            setLoading(false)
        })
    },[])

    const getData = async (key) => {
        try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        // error reading value
            console.log(e)
        }
    }

    const storeData = async (value, key) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          // saving error
        }
    }

    const saveChanges = () =>{
        if(firstName && middleName && lastName && email && street && city && state && zipCode){
            axios.put('http://192.168.1.3:3000/api/users/update', {
                "username" : userName,
                "firstName" : firstName,
                "middleName" : middleName,
                "lastName" : lastName,
                "contactNumber" : contactNumber,
                "address" : {
                    "city" : city,
                    "state" : state,
                    "street" : street,
                    "zipcode" : zipCode
                }
            }, 
            {headers: {
                Authorization:`Bearer ${token}`
            }}).then((response)=>{
                const newToken = response.data.token;
                storeData(newToken, 'currentUser');
                Alert.alert(
                    "Personal Information",
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
            }, (error)=>{
                const { message } = error.response.data;
                Alert.alert(
                    "Error",
                    message,
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
            })
        }
    }

    if(loading){
        <View>Loading</View>
    }

    return (
        <ScrollView>
            <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                <MaterialIcons style={styles.arrow} name="arrow-back" size={RFPercentage(3)} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.mainText}>Personal Information</Text>
            <View style={styles.mainView}>
                <Text style={styles.title}>Full Name</Text>
                <View style={styles.textInputView}>
                    <TextInput style={styles.textInput} placeholder='First Name' value={firstName} onChangeText={setFirstName}/>
                    <TextInput style={styles.textInput} placeholder='Middle Name' value={middleName} onChangeText={setMiddleName}/>
                    <TextInput style={styles.textInput} placeholder='Last Name' value={lastName} onChangeText={setLastName}/>
                </View>
            </View>

            <View style={styles.mainView}>
                <Text style={styles.title}>Email</Text>
                <View style={styles.textInputView}>
                    <TextInput editable={false} style={styles.textInput} placeholder='Email' value={email} onChangeText={setEmail}/>
                </View>
            </View>

            <View style={styles.mainView}>
                <Text style={styles.title}>Username</Text>
                <View style={styles.textInputView}>
                    <TextInput style={styles.textInput} placeholder='Username' value={userName} onChangeText={setUserName}/>
                </View>
            </View>

            <View style={styles.mainView}>
                <Text style={styles.title}>Contact Number</Text>
                <View style={styles.textInputView}>
                    <TextInput style={styles.textInput} placeholder='Contact Number' value={contactNumber} onChangeText={setContactNumber} keyboardType='number-pad'/>
                </View>
            </View>

            <View style={styles.mainView}>
                <Text style={styles.title}>Delivery Address</Text>
                <View style={styles.textInputView}>
                    <TextInput style={styles.textInput} placeholder='Street' value={street} onChangeText={setStreet}/>
                    <TextInput style={styles.textInput} placeholder='City' value={city} onChangeText={setCity}/>
                    <TextInput style={styles.textInput} placeholder='State' value={state} onChangeText={setState}/>
                    <TextInput style={styles.textInput} placeholder='Zip Code' value={zipCode} onChangeText={setZipCode}/>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            </LinearGradient>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        marginTop:RFPercentage(2)
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

        borderColor:'red',
        justifyContent:'space-between'
    },
    textInput:{
        backgroundColor:'white',
        paddingHorizontal:RFPercentage(3),
        marginVertical:RFPercentage(.75),
        borderRadius:RFPercentage(1),
        height:RFPercentage(4.5)
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal:RFPercentage(4),
        paddingVertical:RFPercentage(4),
    },
})