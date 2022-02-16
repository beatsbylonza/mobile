import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';

export default function Music() {
    return (
        <LinearGradient colors={['#303145', '#28364C']} style={styles.container}>
            <StatusBar style="auto" /> 
            
            <Text>Music</Text>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop:RFPercentage(5),
    },

})