import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fav from '../../assets/fav.png';

export default function Favorite({ navigation }) {
    const [products, setProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused){
            getData('currentUser').then((currentUser)=>{
                setCurrentUser(currentUser)
                let tempFavorite = []
                if(currentUser.favorite !== []){
                    currentUser.favorite.map((data)=>{
                        tempFavorite.push(data)
                    })
                }
                setFavorite(tempFavorite)

                getData('listOfProducts').then((products)=>{
                    let tempProducts = []
                    products.map((product)=>{
                        if(currentUser.favorite.indexOf(product.id) !== -1){
                            tempProducts.push(product)
                        }
                    })
                    setProducts(tempProducts)
                    setLoading(false)
                })
            })
        }else{
            currentUser.favorite = favorite;
            storeData(currentUser, 'currentUser');
        }
    },[isFocused]);

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

    const removeFavorite = (id) => {
        var fav = favorite;
        var index = favorite.indexOf(id);
        fav.splice(index, 1);
        setFavorite([...fav]);
    }

    const addFavorite = (id) => {
        let fav = favorite
        fav.push(id);
        setFavorite([...fav]);
    }
    
    if(!loading){
        return (
            <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
                <StatusBar style="auto" /> 
                
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {/* <TouchableOpacity>
                            <Feather name="menu" size={RFPercentage(3)} color="#C2C2C2" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#C2C2C2"  style={{marginLeft:RFPercentage(3)}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    currentUser.favorite.length === 0 ?
                    <>
                        <View style={styles.mainView}>
                            <View style={styles.titleView}>
                                <Text style={styles.title}>Favorites</Text>
                            </View>
                        </View>
    
                        <View style={styles.favoriteView1}>
                            <ImageBackground source={fav} resizeMode="cover" style={styles.favImg} />
                            <Text style={[styles.clear, {marginTop:RFPercentage(2)}]}>Looks like you don’t have any favorites yet!</Text>
                            <TouchableOpacity style={styles.button} onPress={()=>navigation.jumpTo('Home')}>
                                <Text style={styles.buttonText}>Go Shopping!</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <ScrollView>
                            <View style={styles.productView}>
                                <View style={styles.productViewLeft}>
                                    {
                                        products.map((product, id) => {
                                            if(id % 2 === 0 && product.category !== 'music'){
                                                return (
                                                    <TouchableOpacity key={id} onPress={()=>navigation.navigate('Product', {product:product, favorite:favorite, currentUser:currentUser})}>
                                                        <ImageBackground style={styles.productImageView} resizeMode='cover' source={{uri:product.picture}}/>
                                                        <View style={styles.productInfoView}>
                                                            <Text style={styles.productNameText}>{product.name}</Text>
                                                            <Text style={styles.productPriceText}>${product.price}</Text>
                                                        </View>
                                                    {
                                                            favorite.indexOf(product.id) !== -1 ?
                                                            <TouchableOpacity style={styles.favoriteView} onPress={()=>removeFavorite(product.id)}>
                                                                <AntDesign style={styles.favorite} name="heart" size={RFPercentage(1.5)} color="#FF7171" />
                                                            </TouchableOpacity>
                                                        : 
                                                            <TouchableOpacity style={styles.favoriteView} onPress={()=>addFavorite(product.id)}>
                                                                <AntDesign style={styles.favorite} name="hearto" size={RFPercentage(1.5)} color="#FF7171" />
                                                            </TouchableOpacity>
                                                    }
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })
                                    }
                                </View>
                                <View style={styles.productViewRight}>
                                    {
                                        products.map((product, id) => {
                                            if(id % 2 !== 0 && product.category !== 'music'){
                                                return (
                                                    <TouchableOpacity key={id} onPress={()=>navigation.navigate('Product', {product:product, favorite:favorite, currentUser:currentUser})}>
                                                        <ImageBackground style={styles.productImageView} resizeMode='cover' source={{uri:product.picture}}/>
                                                        <View style={styles.productInfoView}>
                                                            <Text style={styles.productNameText}>{product.name}</Text>
                                                            <Text style={styles.productPriceText}>${product.price}</Text>
                                                        </View>
                                                        {
                                                            favorite.indexOf(product.id) !== -1 ?
                                                            <TouchableOpacity style={styles.favoriteView} onPress={()=>removeFavorite(product.id)}>
                                                                <AntDesign style={styles.favorite} name="heart" size={RFPercentage(1.5)} color="#FF7171" />
                                                            </TouchableOpacity>
                                                        : 
                                                        <TouchableOpacity style={styles.favoriteView} onPress={()=>addFavorite(product.id)}>
                                                                <AntDesign style={styles.favorite} name="hearto" size={RFPercentage(1.5)} color="#FF7171" />
                                                            </TouchableOpacity>
                                                    }
                                                    </TouchableOpacity>
                                                )
                                            }
                                        })
                                    }
                                </View>
                            </View>
                        </ScrollView>
                    </>
                }
    
            </LinearGradient> 
        );
    }else{
        return(<Text>Loading</Text>)
    }
}

const styles = StyleSheet.create({
    favoriteView:{
        position:'absolute',
        right:RFPercentage(3.5),
        top:RFPercentage(2.5),
        backgroundColor:'#E2E2E2',
        padding:RFPercentage(.25),
        borderRadius:RFPercentage(.25)
    },
    productNameText:{
        color:'white',
        fontFamily:'RobotoBold',
        fontSize:RFPercentage(2)
    },
    productPriceText:{
        color:'white',
        fontFamily:'RobotoRegular',
        fontSize:RFPercentage(2)
    },
    productInfoView:{
        paddingHorizontal:RFPercentage(2),
        marginBottom:RFPercentage(3)
    },
    productImageView:{
        height:RFPercentage(25),
        marginHorizontal:RFPercentage(2),
        marginVertical:RFPercentage(1),
        borderRadius:RFPercentage(2),
        overflow:'hidden'
    },
    productView:{
        flexDirection:'row',
        padding:RFPercentage(1),
        marginBottom:RFPercentage(7)
    },
    productViewRight:{
        width:'50%',
    },
    productViewLeft:{
        width:'50%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop:RFPercentage(5),
    },
    mainView:{
        width:'100%',
        paddingHorizontal:RFPercentage(2),
        marginVertical:RFPercentage(2),
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
    clear:{
        fontFamily:'RobotoRegular',
        color:'#FFFFFF',
        fontSize:RFPercentage(1.75),
    },
    favImg:{
        width:RFPercentage(20),
        height:RFPercentage(20),
    },
    favoriteView1:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:RFPercentage(7.5)
    },
    button:{
        width:RFPercentage(23),
        height:RFPercentage(5),
        backgroundColor:'#3681C3',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:RFPercentage(5),
        marginTop:RFPercentage(5)
    },
    buttonText:{
        fontFamily:'RobotoRegular',
        color:'#FFFFFF',
        
    },
})