
import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Image, TouchableWithoutFeedback, StyleSheet, Text, View} from 'react-native';
import Colors from '../styles/Colors';



export default function TitleBar({navigation}) {
    return (
        //Title bar
        <View style={styles.TitleBar}>
            {/* go back */}      
            <View style={styles.BackBtn}>
                <TouchableWithoutFeedback  onPress={() => navigation.goBack()}>
                    <Image style={styles.Image} source={require('../assets/BackBtn.png')} />
                </TouchableWithoutFeedback>
            </View>
            {/* title */}
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Header</Text>
            </View>  
            {/* Blank Box to fill empty space  */}
            <View style={styles.BackBtn}>
                <Image style={styles.Image} />
            </View>
        </View>
    )
}


//style takes a json but stylesheet.create creates an validate object + they may be more optimized
const styles = StyleSheet.create({
    TitleBar:{
        height:70,
        flexDirection: 'row',
        backgroundColor: Colors.PrimaryBlack
    },
    BackBtn:{
        
        flex:1,
        justifyContent: 'center',
        paddingLeft:10,
    },
    Image:{
        height:50,
        width:50,
    },
    TitleContainer:{
        flex:3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Title:{
        fontSize: 30,
        color: Colors.PrimaryGreen,

    }
    
  })
    



/*
1. change image size to tmp size
2. change image position
3. center text

*/