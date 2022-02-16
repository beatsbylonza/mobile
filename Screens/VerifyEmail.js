import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, BackHandler} from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import Ellipse6 from '../assets/Ellipse6.png';
import Ellipse7 from '../assets/Ellipse7.png';
import Ellipse8 from '../assets/Ellipse8.png';
import { auth, db } from '../firebase';

export default function CreateAccount({ navigation, route }) {
    const { user } = route.params;

    const [terms, setTerms] = useState(false); 
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setcCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);
    const [verified, setVerified] = useState(false);
    const [page, setPage] = useState(true);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
        auth.onAuthStateChanged(user => {
            if(user.emailVerified){
                setVerified(true)
            }
        })
        return () => BackHandler.removeEventListener('hardwareBackPress', false);
    },[]);

    const backAction = () => {
        navigation.navigate('CreateAccount');
        return true;
    }

    const resendVerfication = () => {
        auth.currentUser.sendEmailVerification().then(()=> {
            console.log("Email Verification Sent")
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    const signUp = () => {

        if(firstName && middleName && lastName && street && city && state && zipCode && password === confirmPassword && terms && password.length > 6){
            db.collection('users').add({
                name:{
                    firstName:firstName,
                    middleName:middleName,
                    lastName:lastName
                },
                email:user.email,
                password:password,
                address:{
                    street:street,
                    city:city,
                    state:state,
                    zipCode:zipCode
                },
                contactNumber:'',
                notification:{

                },
                favorite:[],
                cart:{},
                toShip:{},
                toReceive:{},
                history:{},
            })
        }
        
    }

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <ImageBackground source={Ellipse6} resizeMode="cover" style={styles.ellipse6} />
            <ImageBackground source={Ellipse7} resizeMode="cover" style={styles.ellipse7} />
            <ImageBackground source={Ellipse8} resizeMode="cover" style={styles.ellipse8} />

            {
                (verified) ?
                    (page) ?
                        <>
                            <View style={styles.barView}>
                                <TouchableOpacity style={styles.bar}></TouchableOpacity>
                                <TouchableOpacity style={styles.barActive} onPress={()=>setPage(true)}></TouchableOpacity>
                                <TouchableOpacity style={styles.bar} onPress={()=>setPage(false)}></TouchableOpacity>
                            </View>

                            <View style={styles.textView}>
                                <Text style={styles.mainText}>Tell us about yourself</Text>
                                <Text style={styles.subText}>Only provide information that is true and correct.</Text>
                            </View>

                            <View style={styles.nameView}>
                                <Text style={styles.titleText}>Full Name</Text>
                                <TextInput style={styles.textInput} placeholder={'First Name'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setFirstName} />
                                <TextInput style={styles.textInput} placeholder={'Middle Name'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setMiddleName} />
                                <TextInput style={styles.textInput} placeholder={'Last Name'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setLastName} />
                            </View>
                            
                            <View style={styles.nameView}>
                                <Text style={styles.titleText}>Delivery Address</Text>
                                <TextInput style={styles.textInput} placeholder={'Street'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setStreet} />
                                <TextInput style={styles.textInput} placeholder={'City'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setcCity} />
                                <TextInput style={styles.textInput} placeholder={'State'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setState} />
                                <TextInput style={styles.textInput} placeholder={'Zip Code'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setZipCode} />
                            </View>

                            <View style={styles.signInButtonView}>
                                <TouchableOpacity style={styles.signInButton} onPress={()=>setPage(false)}>
                                    <AntDesign name="caretright" size={RFPercentage(3)} color="#F7941D" />
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    :
                        <>
                            <View style={styles.barView}>
                                <TouchableOpacity style={styles.bar}></TouchableOpacity>
                                <TouchableOpacity style={styles.bar} onPress={()=>setPage(true)}></TouchableOpacity>
                                <TouchableOpacity style={styles.barActive} onPress={()=>setPage(false)}></TouchableOpacity>
                            </View>

                            <View style={styles.textView}>
                                <Text style={styles.mainText}>Set Your Password</Text>
                                <Text style={styles.subText}>Provide strong password for your account security.</Text>
                            </View>

                            <View style={styles.nameView}>
                                <View style={styles.passwordView}>
                                    <TextInput style={styles.textInput2} placeholder={'Password'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setPassword} secureTextEntry={!eye1}/>
                                    {
                                        eye1 ?
                                        <TouchableOpacity onPress={()=> setEye1(false)}>
                                            <Feather name="eye" size={RFPercentage(3)} color="#D6D5CB" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=> setEye1(true)}>
                                            <Feather name="eye-off" size={RFPercentage(3)} color="#D6D5CB" />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <View style={styles.passwordView}>
                                    <TextInput style={styles.textInput2} placeholder={'Confirm Password'} placeholderTextColor={'#D6D5CB'} fontSize={RFPercentage(1.75)} fontFamily={'RobotoBold'} onChangeText={setConfirmPassword} secureTextEntry={!eye2}/>
                                    {
                                        eye2 ?
                                        <TouchableOpacity onPress={()=> setEye2(false)}>
                                            <Feather name="eye" size={RFPercentage(3)} color="#D6D5CB" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={()=> setEye2(true)}>
                                            <Feather name="eye-off" size={RFPercentage(3)} color="#D6D5CB" />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>

                            <View style={styles.termsAndPrivacyView}>
                                <CheckBox value={terms} onValueChange={setTerms} color={terms ? '#303145' : undefined}/>
                                <Text style={styles.termsAndPrivacyText}>I agree to the Terms and Privacy Policy</Text>
                            </View>

                            <View style={styles.signUpButtonView}>
                                <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                                    <AntDesign name="caretright" size={RFPercentage(3)} color="#F7941D" />
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                :
                <>
                    <View style={styles.barView}>
                        <View style={styles.barActive}></View>
                        <View style={styles.bar}></View>
                        <View style={styles.bar}></View>
                    </View>

                    <View style={styles.textView}>
                        <Text style={styles.mainText}>Email Verification</Text>
                        <Text style={styles.subText}>We’ve sent a verification link to your email address.</Text>
                        <TouchableOpacity style={styles.resendButton} onPress={resendVerfication}>
                            <Text style={styles.resendText}>Resend Code</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal:RFPercentage(5),
        paddingVertical:RFPercentage(13),
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
    termsAndPrivacyView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:RFPercentage(35.5),
        marginVertical:RFPercentage(3),
        marginTop:RFPercentage(30)
    },
    termsAndPrivacyText:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize: RFPercentage(1.75),
    },
    passwordView:{
        flexDirection:'row',
        width:RFPercentage(40),
        borderColor:'#B6B6B6',
        color:'#FFFFFF',
        borderWidth: 1,
        marginVertical: RFPercentage(1),
        paddingHorizontal: RFPercentage(2.5),
        paddingVertical: RFPercentage(.3),
        borderRadius: RFPercentage(1),
        alignItems:'center'
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
        marginTop:RFPercentage(4),
    },
    buttonText:{
        fontFamily:'RobotoBold',
        color: '#000000',
        fontSize: RFPercentage(2),
        textAlign: 'center',
        paddingHorizontal:RFPercentage(1),
        width:RFPercentage(20),
    },
    nameView:{
        alignSelf:'flex-start',
        paddingHorizontal: RFPercentage(1),
        marginTop:RFPercentage(2)
    },
    titleText:{
        color:'white',
        fontFamily:'RobotoRegular'
    },
    textInput2:{
        width:RFPercentage(31),
        color:'#FFFFFF',
        marginRight:RFPercentage(1.5)
    },
    textInput:{
        width:RFPercentage(40),
        borderColor:'#B6B6B6',
        color:'#FFFFFF',
        borderWidth: 1,
        marginVertical: RFPercentage(1),
        paddingHorizontal: RFPercentage(2.5),
        paddingVertical: RFPercentage(.3),
        borderRadius: RFPercentage(1),
    },
    mainText:{
        fontSize:RFPercentage(3),
        fontFamily:'RobotoBold',
        color:'white',
        marginVertical:RFPercentage(2)
    },
    subText:{
        fontSize:RFPercentage(2),
        fontFamily:'RobotoBold',
        color:'white',
        marginBottom:RFPercentage(1)
    },
    resendButton:{
        backgroundColor:'#F7941D',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        width:RFPercentage(20),
        borderRadius:RFPercentage(10),
        height:RFPercentage(5),
        marginTop:RFPercentage(10)
    },
    resendText:{
        color:'white',
        fontFamily:'RobotoRegular'
    },
    textView:{
        alignSelf:'flex-start',
        marginLeft:RFPercentage(.8),
    },
    barView:{
        flexDirection:'row',
        alignItems:'center',
        height:RFPercentage(3),
        width:RFPercentage(15),
        alignSelf:'flex-start',
    },
    barActive:{
        flex:1,
        borderWidth:1,
        borderColor:'#F7941D',
        margin:RFPercentage(.5),
        borderRadius:RFPercentage(10),
        height:RFPercentage(.75),
        backgroundColor:'#F7941D',
    },
    bar:{
        flex:1,
        borderWidth:1,
        borderColor:'#E6E6E6',
        margin:RFPercentage(1),
        borderRadius:RFPercentage(10),
        height:RFPercentage(.75),
        backgroundColor:'#E6E6E6',
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
})