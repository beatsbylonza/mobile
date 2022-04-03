import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons, Fontisto } from '@expo/vector-icons';

import Home from './Home/Home';
import Notification from './Notification/Notification';
import Music from './Music/Music';
import Cart from './Cart/Cart';
import Profile from './Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs({ navigation, route }) {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', ()=>true);
    return () => BackHandler.removeEventListener('hardwareBackPress', ()=>true);
  },[]);
  
  return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#FFFFFF"
        backBehavior={'history'}
        shifting={true}
        barStyle={{
          backgroundColor: 'white',
          position: 'absolute',
          overflow: 'hidden',
          borderTopLeftRadius: RFPercentage(2.25),
          borderTopRightRadius: RFPercentage(2.25),
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              focused ? 
              <Ionicons name="ios-home" size={RFPercentage(2.75)} color="white" />:
              <Ionicons name="ios-home-outline" size={RFPercentage(2.75)} color="white" />
            ),
            tabBarColor:'#526B93'
          }}
        />
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({ focused }) => (
              focused ? 
              <Fontisto name="bell-alt" size={RFPercentage(2.75)} color="white" />:
              <Fontisto name="bell" size={RFPercentage(2.75)} color="white" />
            ),
            tabBarColor:'#B7763B'
          }}
        />
        <Tab.Screen
          name="Music"
          component={Music}
          options={{
            tabBarLabel: 'Music',
            tabBarIcon: ({ focused }) => (
              focused ? 
              <Ionicons name="musical-notes" size={RFPercentage(2.75)} color="white" />:
              <Ionicons name="musical-notes-outline" size={RFPercentage(2.75)} color="white" />
            ),
            tabBarColor:'#865293'
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ focused }) => (
              focused ? 
              <Ionicons name="cart" size={RFPercentage(2.75)} color="white" />:
              <Ionicons name="cart-outline" size={RFPercentage(2.75)} color="white" />
            ),
            tabBarColor:'#935265'
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              focused ? 
              <Ionicons name="person" size={RFPercentage(2.75)} color="white" />:
              <Ionicons name="person-outline" size={RFPercentage(2.75)} color="white" />
            ),
            tabBarColor:'#935252'
          }}
        />
      </Tab.Navigator>
  );
}