import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import { useIsFocused } from '@react-navigation/native';

import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';

import Discover1 from '../../assets/Discover1.png';
import Discover2 from '../../assets/Discover2.png';
import Discover3 from '../../assets/Discover3.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselItems = [Discover1, Discover2, Discover3]
    const carouselItemsTemp = [1,2,3]

    const [products, setProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [favorite, setFavorite] = useState([]);

    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();
    
    useEffect(() => {
        if(isFocused){
            getData('currentUser').then((currentUser)=>{
                setCurrentUser(currentUser)
                let tempFavorite = []
                currentUser.favorite.map((data)=>{
                    tempFavorite.push(data)
                })
                setFavorite(tempFavorite)
            })
            getData('listOfProducts').then((products)=>{
                setProducts(products)
                setLoading(false)
            })
        }else{
            currentUser.favorite = favorite;
            storeData(currentUser, 'currentUser');
        }
    },[isFocused]);


    const _renderItem = (image) => {
        return (
            <ImageBackground source={carouselItems[image.index]} resizeMode="cover" style={styles.carouselImage}/>
        )
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
                <ScrollView>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {/* <TouchableOpacity>
                            <Feather name="menu" size={RFPercentage(3)} color="#C2C2C2" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Feather name="search" size={RFPercentage(3)} color="#C2C2C2" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#C2C2C2"  style={{marginLeft:RFPercentage(3)}}/>
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.mainView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Discover</Text>
                    </View>
                    <View style={styles.carouselView}>
                        <Carousel
                            layout={'default'} layoutCardOffset={RFPercentage(5)}
                            data={carouselItemsTemp}
                            sliderWidth={RFPercentage(48.5)}
                            itemWidth={RFPercentage(32)}
                            renderItem={_renderItem}
                            firstItem={1}
                            onSnapToItem = { index => setActiveIndex({activeIndex:index})} 
                        />
                    </View>
                </View>
    
                {/* <View style={styles.mainView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>New Arrivals</Text>
                        <TouchableOpacity>
                            <Feather name="arrow-right" size={RFPercentage(3)} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.mainView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Men's</Text>
                        <TouchableOpacity>
                            <Feather name="arrow-right" size={RFPercentage(3)} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.mainView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Women's</Text>
                        <TouchableOpacity>
                            <Feather name="arrow-right" size={RFPercentage(3)} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.mainView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Kid's</Text>
                        <TouchableOpacity>
                            <Feather name="arrow-right" size={RFPercentage(3)} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View> */}
    
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
            </LinearGradient>
        );
    }else{
        return (<Text>Loading</Text>)
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
        marginTop:RFPercentage(8)
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
    carouselView:{
        marginVertical:RFPercentage(2),
        alignItems:'center',
        justifyContent:'center'
    },
    carouselImage:{
        width:RFPercentage(30),
        height:RFPercentage(30),
    },
})