import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';

import { Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';

import { db } from '../../firebase';

export default function Home({ navigation, route }) {
    const { product } = route.params;
    const [id, setId] = useState('');

    const initialFavorite = route.params.favorite;
    const initialCurrentUser = route.params.currentUser;

    const [favorite, setFavorite] = useState(initialFavorite);
    const [currentUser, setCurrentUser] = useState(initialCurrentUser);

    useEffect(()=>{
        db.collection('products').get().then((snapshot)=>{
            snapshot.docs.map((doc)=>{
                if(doc.data().name === product.name && doc.data().price === product.price && doc.data().category === product.category){
                    setId(doc.id)
                }
            })
        })
    },[])

    const removeFavorite = () => {
        var fav = favorite;
        var index = favorite.indexOf(id);
        fav.splice(index, 1);
        
        db.collection('users').doc(currentUser.id).update({
            favorite:fav
        }).then(()=>{
            db.collection('users').doc(currentUser.id).get().then(snapshot => 
                setCurrentUser({currentUser:snapshot.data(), id:snapshot.id})
            )
            setFavorite(fav);
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    const addFavorite = () => {
        var fav = favorite
        fav.push(id);

        db.collection('users').doc(currentUser.id).update({
            favorite:fav
        }).then(()=>{
            db.collection('users').doc(currentUser.id).get().then(snapshot => 
                setCurrentUser({currentUser:snapshot.data(), id:snapshot.id})
            )
            setFavorite(fav);
        }).catch((error)=>{
            console.log(error.message)
        })
        return 0;
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
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

        
            <ScrollView>
                
                <View style={styles.mainView}>
                    <ImageBackground source={{uri:product.picture}} style={styles.productImage} resizeMode='contain'>
                        {
                            favorite.indexOf(id) !== -1 ?
                            <TouchableOpacity style={styles.favoriteView} onPress={removeFavorite}>
                                <AntDesign style={styles.favorite} name="heart" size={RFPercentage(3)} color="#FF7171" />
                            </TouchableOpacity>
                            : 
                            <TouchableOpacity style={styles.favoriteView} onPress={addFavorite}>
                                <AntDesign style={styles.favorite} name="hearto" size={RFPercentage(3)} color="#FF7171" />
                            </TouchableOpacity>
                        }
                    </ImageBackground>
                    <View style={styles.productInfoView}>
                        <View style={styles.categoryView}>
                            <Text style={styles.categoryText}>{capitalize(product.category)}</Text>
                        </View>
                    </View>
                    <View style={styles.nameAndPriceView}>
                        <Text style={styles.nameText}>{capitalize(product.name)}</Text>
                        <Text style={styles.priceText}>$ {product.price}</Text>
                    </View>
                    <View style={styles.idView}>
                        <Text style={styles.idText}>ID no. </Text>
                        <Text style={styles.idText2}>{id}</Text>
                    </View>
                    <View style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>{product.descrpition}</Text>
                    </View>
                    {
                        product.size.length !== 0 ? 
                        <View style={styles.choiceView}>
                            <Text style={styles.choiceTitle}>Size</Text>
                            <View style={styles.choiceBoxView}>
                            {
                                product.size.map((choice, id)=>{
                                    return(
                                        <TouchableOpacity key={id} style={styles.choiceBox}>
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
                        product.color.length !== 0 ? 
                        <View style={styles.choiceView}>
                            <Text style={styles.choiceTitle}>Color</Text>
                            <View style={styles.choiceBoxView}>
                            {
                                product.color.map((choice, id)=>{
                                    return(
                                        <TouchableOpacity key={id} style={styles.choiceBox}>
                                            <Text style={styles.choiceText}>{capitalize(choice)}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </View>
                        </View>
                        : null
                    }
                    {
                        product.style.length !== 0 ? 
                        <View style={styles.choiceView}>
                            <Text style={styles.choiceTitle}>Style</Text>
                            <View style={styles.choiceBoxView}>
                            {
                                product.style.map((choice, id)=>{
                                    return(
                                        <TouchableOpacity key={id} style={styles.choiceBox}>
                                            <Text style={styles.choiceText}>{capitalize(choice)}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            </View>
                        </View>
                        : null
                    }
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.cartView}>
                            <FontAwesome5 name="shopping-bag" size={RFPercentage(3)} color="#3681C3"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buyView}>
                            <Text style={styles.buyText}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

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
})