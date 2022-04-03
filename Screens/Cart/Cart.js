import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notif from '../../assets/notif.png';
import Checkbox from 'expo-checkbox';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


export default function Cart({ navigation }) {
    
    const [loading, setLoading] = useState(true);
    const [userCart, setUserCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [token, setToken] = useState('');

    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused){
            fetchUserCart();
        }
    }, [isFocused]);

    const fetchUserCart = () =>{
        getData('currentUser').then((result)=>{
            axios.get('http://192.168.1.3:3000/api/carts/', {
                headers: {
                    Authorization:`Bearer ${result}`
                }
            }).then((response)=>{
                const { data } = response.data;
                setUserCart(data);
                setLoading(false);
                setToken(result);
            }).catch((err)=>{
                // console.log("Error", err.response.data.message)
                console.log(err)
            })
        })
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

    if(loading){
        return(
            <Text>Loading...</Text>
        )
    }

    const calculatePrice = (price) =>{
        setTotalPrice(price + totalPrice)
    }

    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
        <StatusBar style="auto" /> 

            <View style={styles.headerView}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Cart</Text>
                </View>
            </View>

            <View style={styles.mainView}>
                <ScrollView>
                    {
                        userCart.map((product, index)=>{
                            return(<ProductComponent product={product} key={index} calculatePrice={calculatePrice} token={token} fetchUserCart={fetchUserCart}/>)
                        })
                    }
                </ScrollView>
            </View>
            <View style={styles.totalView}>
                <Text style={styles.buyText}>Total</Text>
                <Text style={[styles.buyText, {fontWeight:'bold'}]}> $ {totalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Buy Now</Text>
            </TouchableOpacity>
        </LinearGradient> 
    );
}

const ProductComponent = ({ product, calculatePrice, token, fetchUserCart }) =>{
    const [checkBox, setCheckBox] = useState(product.is_enabled);
    const [quantity, setQuantity] = useState(product.quantity);

    const increase = () =>{
        if(quantity != product.product.available){
            axios.put(`http://192.168.1.3:3000/api/carts/${product._id}`, {
                "quantity": quantity+1,
                "is_enabled": checkBox
            }, {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }).then((response)=>{
                if(checkBox){
                    calculatePrice(product.product.price.value.$numberDecimal * 1)
                }
                setQuantity(response.data.data.quantity)
            }).catch((err)=>{
                // console.log("Error", err.response.data.message)
                console.log(err.response.data.message)
            })
        }
    }

    const decrease = () =>{
        if(quantity != 1){
            axios.put(`http://192.168.1.3:3000/api/carts/${product._id}`, {
                "quantity": quantity-1,
                "is_enabled": checkBox
            }, {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }).then((response)=>{
                if(checkBox){
                    calculatePrice(-(product.product.price.value.$numberDecimal * 1))
                }
                setQuantity(response.data.data.quantity)
                
                console.log(response.data.message)
            }).catch((err)=>{
                // console.log("Error", err.response.data.message)
                console.log(err.response.data.message)
            })
        }
    }

    const checkBoxChange = (value) =>{
        if(value){
            calculatePrice(product.product.price.value.$numberDecimal * (quantity));
        }else{
            calculatePrice(-(product.product.price.value.$numberDecimal * (quantity)));
        }

        axios.put(`http://192.168.1.3:3000/api/carts/${product._id}`, {
            "quantity": quantity,
            "is_enabled": value
        }, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            setCheckBox(response.data.data.is_enabled);
        }).catch((err)=>{
            // console.log("Error", err.response.data.message)
            console.log(err.response.data.message)
        })
    }

    const deleteProduct = () =>{
        axios.delete(`http://192.168.1.3:3000/api/carts/${product._id}`, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            calculatePrice(-(product.product.price.value.$numberDecimal * (quantity)));
            fetchUserCart();
            console.log(response.data.message);
        }).catch((err)=>{
            // console.log("Error", err.response.data.message)
            console.log(err.response.data.message)
        })
    }

    return(
        <View style={styles.productView}>
            <View style={styles.checkBoxView}>
                <Checkbox
                    style={styles.checkbox}
                    value={checkBox}
                    onValueChange={checkBoxChange}
                    color={true ? '#28364C' : undefined}
                />
            </View>
            <View style={styles.imageView}>
                <ImageBackground style={styles.productImage} resizeMode='cover' source={{uri:product.product.imageUrl}}/>
            </View>
            <View style={styles.infoView}>
                <Text style={styles.nameText}>{product.product.name}</Text>
                <View style={styles.sizeAndColorView}>
                    {
                        product.product.size &&
                        <View style={styles.chipView}>
                            <Text style={styles.chipText}>Size: <Text style={styles.productText}>{product.product.size}</Text></Text>
                        </View>
                    }
                    {
                        product.product.color && 
                        <View style={styles.chipView}>
                            <Text style={styles.chipText}>Color: <Text style={styles.productText}>{product.product.color}</Text></Text>
                        </View>
                    }
                </View>
                <Text style={styles.priceText}>$ {product.product.price.value.$numberDecimal}</Text>
            </View>
            <View style={styles.deleteView}>
                <TouchableOpacity onPress={deleteProduct} style={styles.trashCanView}>
                    <FontAwesome5 name="trash-alt" size={10} color="#3681C3" />
                </TouchableOpacity>
                <View style={styles.quantityView}>
                    <TouchableOpacity onPress={decrease} style={styles.buttonView}><Text style={styles.buttonText}>-</Text></TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={increase} style={styles.buttonView}><Text style={styles.buttonText}>+</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop:RFPercentage(5),
    },

    mainView:{
        width:'100%',
        paddingHorizontal:RFPercentage(4),
        marginVertical:RFPercentage(2),
        height:'75%',
    },

    headerView:{
        width:'100%',
        paddingHorizontal:RFPercentage(2),
    },

    titleView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
    },

    title:{
        fontFamily:'RobotoBold',
        color:'#FFFFFF',
        fontSize:RFPercentage(2.5),
    },

    productView:{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        height: RFPercentage(13),
        borderRadius: 5,
        padding: 5,
        backgroundColor:'white',
        marginVertical: 5,
    },

    checkBoxView:{
        flex:1,
    },

    checkbox: {
        alignSelf: "center",
    },

    imageView:{
        display: 'flex',
        borderRadius: 5,
        overflow:'hidden',
        marginHorizontal: 5,
    },

    productImage:{
        width:50,
        height:50,
    },

    infoView:{
        display: 'flex',
        flex:6,
        marginRight: 5,
        justifyContent:'space-between'
    },

    deleteView:{
        display: 'flex',
        flex:2,
        alignItems:'center',
        justifyContent:'space-between',
        height:'100%',
        paddingVertical:10,
    },

    sizeAndColorView:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },  
    
    chipView:{
        borderWidth:1,
        borderRadius: 20,
        borderColor:'#707070',
        paddingVertical:2,
        paddingHorizontal:10,
        marginHorizontal:3,
        marginVertical:2,
    },

    chipText:{
        color:"#707070",
        fontSize: 10,
    },

    productText:{
        fontSize: 10,
        color:'black',
        fontWeight:'bold'
    },

    quantityView:{
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
    },

    buttonView:{
        width:16,
        height:16,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        borderWidth:1,
        borderColor:'#848484'
    },

    trashCanView:{
        backgroundColor:'#D6D6D6',
        padding:10,
        borderRadius:50,
    },

    quantityText:{
        fontSize: 10,
        marginHorizontal:5,
    },

    buttonText:{
        fontSize:10,
    },

    nameText:{
        fontSize: 14,
        fontWeight:'bold',
    },

    priceText:{
        fontSize: 12,
    },

    buyButton:{
        backgroundColor:'#3681C3',
        width:'80%',
        paddingVertical:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
    },

    buyText:{
        color:'white'
    },

    totalView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        width:'80%'
    },
})