import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Dimensions, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { backgroundColor, borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation, route }) {
    const { product } = route.params;

    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(()=>{
        if(product.colors){
            setColor(product.colors[0])
        }
        if(product.sizes){
            setSize(product.sizes[0])
        }
    },[])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const changeColor = (color) =>{
        setColor(color)
    }

    const changeSize = (size) =>{
        setSize(size)
    }

    const increase = () =>{
        if(quantity != product.available){
            setQuantity((prev)=>prev+1)
        }
    }

    const decrease = () =>{
        if(quantity != 1){
            setQuantity((prev)=>prev-1)
        }
    }

    const getData = async (key) => {
        try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
        // error reading value
            console.log(e)
        }
    }


    const addToCart = () =>{
        getData('currentUser').then((result)=>{
            console.log(result)
            axios.post('http://192.168.1.3:3000/api/carts/add', {
                "product_id": product._id,
                "quantity": quantity,
                "size": size,
                "color": color
            }, {
                headers:{Authorization: `Bearer ${result}`}
            }).then(()=>{
                Alert.alert('Success', `${product.name} added to your cart`, [
                    { text: 'OK' },
                ]);
            }).catch((err)=>{
                console.log(err.response)
                Alert.alert('Error', `${err.response.data.message}`, [
                    { text: 'OK' },
                ]);
            })
        })
    }

    return (
        <ScrollView>
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Feather name="arrow-left" size={RFPercentage(3)} color="#C2C2C2" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#C2C2C2"  style={{marginLeft:RFPercentage(3)}}/>
                    </TouchableOpacity>
                </View>
            </View>

        

                
                <View style={styles.mainView}>
                    <ImageBackground source={{uri:product.imageUrl}} style={styles.productImage} resizeMode='contain'>
                    </ImageBackground>
                    <View style={styles.productInfoView}>
                        <View style={styles.categoryView}>
                            <Text style={styles.categoryText}>{capitalize(product.category)}</Text>
                        </View>
                    </View>
                    <View style={styles.nameAndPriceView}>
                        <Text style={styles.nameText}>{capitalize(product.name)}</Text>
                        <Text style={styles.priceText}>$ {product.price.value.$numberDecimal}</Text>
                    </View>
                    <View style={styles.idView}>
                        <Text style={styles.idText}>ID no. </Text>
                        <Text style={styles.idText2}>{product._id}</Text>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>{product.descrpition}</Text>
                    </View>
                    {
                        product.sizes.length !== 0 ? 
                        <View style={styles.choiceView}>
                            <Text style={styles.choiceTitle}>Size</Text>
                            <View style={styles.choiceBoxView}>
                            {
                                product.sizes.map((choice, id)=>{
                                    return(
                                        <TouchableOpacity onPress={()=>changeSize(choice)} key={id} style={[styles.choiceBox, {backgroundColor:(size === choice) ? '#F8A139' : '#28364C'}]}>
                                            <Text style={styles.choiceText}>{choice}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </View>
                        </View>
                        : null
                    }
                    {
                        product.colors.length !== 0 ? 
                        <View style={styles.choiceView}>
                            <Text style={styles.choiceTitle}>Color</Text>
                            <View style={styles.choiceBoxView}>
                            {
                                product.colors.map((choice, id)=>{
                                    return(
                                        <TouchableOpacity onPress={()=> changeColor(choice)} key={id} style={[styles.choiceBox, {backgroundColor:(color === choice) ? '#F8A139' : '#28364C'}]}>
                                            <Text style={styles.choiceText}>{capitalize(choice)}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </View>
                        </View>
                        : null
                    }
                    <View style={styles.choiceView}>
                        <Text style={styles.choiceTitle}>Quantity</Text>
                        <View style={styles.choiceBoxView}>
                            <View style={styles.quantityView}>
                                {
                                    quantity != 1?
                                    <TouchableOpacity onPress={decrease} style={styles.quantityButton}><Text style={styles.quantityText}>-</Text></TouchableOpacity>:
                                    <TouchableOpacity disabled onPress={decrease} style={[styles.quantityButton, styles.disabledButton]}><Text style={styles.quantityText}>-</Text></TouchableOpacity>
                                }
                                <Text style={styles.quantityText}>{quantity}</Text>
                                {
                                    quantity != product.available?
                                    <TouchableOpacity onPress={increase} style={styles.quantityButton}><Text style={styles.quantityText}>+</Text></TouchableOpacity>:
                                    <TouchableOpacity disabled onPress={increase} style={[styles.quantityButton, styles.disabledButton]}><Text style={styles.quantityText}>+</Text></TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.cartView} onPress={addToCart}>
                            <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#3681C3"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buyView}>
                            <Text style={styles.buyText}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

        </LinearGradient>
        </ScrollView>
    );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    favoriteView:{
        position:'absolute',
        right:RFPercentage(3.5),
        top:RFPercentage(2.5),
        backgroundColor:'#E2E2E2',
        padding:RFPercentage(1),
        borderRadius:RFPercentage(.25)
    },
    cartView:{
        backgroundColor:'#BFBFBF',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:RFPercentage(2),
        paddingHorizontal:RFPercentage(2.25),
        borderRadius:RFPercentage(10),
    },
    buyText:{
        fontFamily:'RobotoBold',
        color:'white',
    },
    buyView:{
        backgroundColor:'#3681C3',
        paddingHorizontal:RFPercentage(10),
        paddingVertical:RFPercentage(2),
        borderRadius:RFPercentage(10),
        marginHorizontal:RFPercentage(2)
    },
    buttonView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:RFPercentage(3),
        marginBottom:RFPercentage(2)
    },
    choiceText:{
        color:'white',
    },
    choiceBox:{
        borderWidth:RFPercentage(.1),
        paddingHorizontal:RFPercentage(2.5),
        paddingVertical:RFPercentage(1.5),
        borderColor:'white',
        borderRadius:RFPercentage(1),
        marginLeft:RFPercentage(1.5),
        marginBottom:RFPercentage(1)
    },
    choiceBoxView:{
        flexDirection:'row',
        flex:3,
        justifyContent:'flex-end',
        flexWrap:'wrap',
    },
    choiceTitle:{
        fontFamily:'RobotoBold',
        color:'white',
        fontSize:RFPercentage(2.5),
        flex:1,
    },
    choiceView:{
        marginHorizontal:RFPercentage(3),
        marginVertical:RFPercentage(2),
        flexDirection:'row',
        alignItems:'center'
    },
    descriptionText:{
        color:'white',
        fontFamily:'RobotoRegular',
    },
    descriptionView:{
        marginHorizontal:RFPercentage(3),
        marginTop:RFPercentage(2)
    },
    idView:{
        flexDirection:'row',
        marginHorizontal:RFPercentage(3),
        justifyContent:'flex-start',
    },
    idText:{
        color:'white',
        fontFamily:'RobotoRegular',
        fontSize:RFPercentage(1.5),
    },
    idText2:{
        color:'#F8A139',
        fontFamily:'RobotoRegular',
        fontSize:RFPercentage(1.5),
    },
    priceText:{
        color:'white',
        fontFamily:'RobotoBold',
        flex:1,
        textAlign:'right',
        fontSize:RFPercentage(2.25),
    },
    nameText:{
        color:'white',
        fontFamily:'RobotoBold',
        flex:3,
        fontSize:RFPercentage(2.25),
    },
    nameAndPriceView:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:RFPercentage(3),
    },
    categoryText:{
        color:'white',
        fontFamily:'RobotoBold'
    },
    categoryView:{
        backgroundColor:'#F8A139',
        borderRadius:RFPercentage(.5),
        paddingVertical:RFPercentage(1),
        paddingHorizontal:RFPercentage(1.75)
    },
    productInfoView:{
        marginHorizontal:RFPercentage(3),
        marginVertical:RFPercentage(1),
        alignItems:'flex-start'
    },
    productImage:{
        width:'100%',
        height:RFPercentage(40)
    },
    mainView:{
        width:'100%',
        marginTop:RFPercentage(5),
    },
    container: {
        flex: 1,
        backgroundColor: '#E2E2E2',
        alignItems: 'center',
        paddingTop:RFPercentage(5),
        paddingBottom:RFPercentage(5),
        minHeight: windowHeight,
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

    quantityView:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end'
    },
    quantityButton:{
        width: 20,
        height:20,
        borderWidth: 1,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'white',
        borderRadius:5,
        marginHorizontal:10,
        backgroundColor:'#F8A139'
    },
    quantityText:{
        color:'white',
    },
    disabledButton:{
        backgroundColor:'#28364C'
    },
})