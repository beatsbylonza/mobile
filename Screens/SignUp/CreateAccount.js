import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground} from 'react-native';
import CheckBox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../firebase';

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

import logo from '../../assets/logo.png';
import Ellipse6 from '../../assets/Ellipse6.png';
import Ellipse7 from '../../assets/Ellipse7.png';
import Ellipse8 from '../../assets/Ellipse8.png';

export default function CreateAccount({ navigation }) {
    const [terms, setTerms] = useState(false); 
    const [email, setEmail] = useState('');

    const signUp = () => {
        if(terms){
            auth.createUserWithEmailAndPassword(email, 'tempPass')
            .then(userCredentials => {
                verifyEmailFunction();
                navigation.navigate('VerifyEmail', {user: userCredentials.user})
            })  
            .catch((error)=>{
                if(error.message == "The email address is already in use by another account."){
                    auth.signInWithEmailAndPassword(email, 'tempPass')
                    .then(userCredentials => {
                        verifyEmailFunction();
                        navigation.navigate('VerifyEmail', {user: userCredentials.user})
                    })
                }
            })
            
        }
    }

    const verifyEmailFunction = () => {
        auth.currentUser.sendEmailVerification().then(()=> {
            console.log("Email Verification Sent")
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <ImageBackground source={Ellipse6} resizeMode="cover" style={styles.ellipse6} />
            <ImageBackground source={Ellipse7} resizeMode="cover" style={styles.ellipse7} />
            <ImageBackground source={Ellipse8} resizeMode="cover" style={styles.ellipse8} />

            <Image source={logo} style={styles.logo}/>
            <View style={styles.createAccountView}>
                <Text style={styles.createAccountText}>Create Account</Text>
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput} placeholder={'Email'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setEmail} />
            </View>
            <View style={styles.signUpButtonView}>
                <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                    <AntDesign name="caretright" size={RFPercentage(3)} color="#F7941D" />
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.termsAndPrivacyView}>
                <CheckBox value={terms} onValueChange={setTerms} color={terms ? '#303145' : undefined}/>
                <Text style={styles.termsAndPrivacyText}>I agree to the Terms and Privacy Policy</Text>
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

            <View style={styles.bottomTextView}>
                <Text style={styles.bottomText}>Already have an account? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
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
    logo:{
        width: RFPercentage(20),
        height: RFPercentage(20),
    },
    signUpButton:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFFFFF',
        paddingVertical: RFPercentage(1.5),
        paddingHorizontal: RFPercentage(5),
        borderRadius:100,
    },
    signUpButtonView:{
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
    createAccountText:{
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
    termsAndPrivacyView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:RFPercentage(35.5),
    },
    termsAndPrivacyText:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize: RFPercentage(1.75),
    },
    orView:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:RFPercentage(1),
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
    ellipse6:{
        position:'absolute',
        left: RFPercentage(-3),
        top: RFPercentage(-3),
        width:RFPercentage(10),
        height:RFPercentage(10),
    },
    ellipse7:{
        position:'absolute',
        right: RFPercentage(-5),
        top: RFPercentage(-6),
        width:RFPercentage(20),
        height:RFPercentage(20),
    },
    ellipse8:{
        position:'absolute',
        left: RFPercentage(-3),
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
    bottomTextView:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:RFPercentage(2),
    },
    bottomText:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize: RFPercentage(1.75),
    },
    loginText:{
        fontFamily:'RobotoBold',
        color:'#F7941D',
        fontSize: RFPercentage(1.75),
    },
})