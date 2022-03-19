import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

import { db } from '../../firebase';

export default function Profile({ navigation, route }) {
    const { currentUser } = route.params;
    
    const [firstName, setFirstName] = useState(currentUser.name.firstName);
    const [middleName, setMiddleName] = useState(currentUser.name.middleName);
    const [lastName, setLastName] = useState(currentUser.name.lastName);

    const [email, setEmail] = useState(currentUser.email);
    
    const [contactNumber, setContactNumber] = useState(currentUser.contactNumber);

    const [street, setStreet] = useState(currentUser.address.street);
    const [city, setCity] = useState(currentUser.address.city);
    const [state, setState] = useState(currentUser.address.state);
    const [zipCode, setZipCode] = useState(currentUser.address.zipCode);

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
            currentUser.name.firstName = firstName;
            currentUser.name.middleName = middleName;
            currentUser.name.lastName = lastName;
            currentUser.email = email;
            currentUser.contactNumber = contactNumber;
            currentUser.address.street = street;
            currentUser.address.city = city;
            currentUser.address.state = state;
            currentUser.address.zipCode = zipCode;

            storeData(currentUser, 'currentUser');
            

            db.collection('users').doc(currentUser.id).update(currentUser).then(()=>{
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