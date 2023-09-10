import React, { useState } from 'react';
import { Text } from 'react-native';
import { Image, View, Pressable, StyleSheet } from 'react-native';
import Colors from '../../styles/Colors';
import { db } from '../../FirebaseConfig';

export default function ClubTypeInput({isOpen, setIsOpen}){
    const handleToggle = ()=>{
        setIsOpen(!isOpen);
    }
    return (
        <View style={ss.Container}>
            <Text></Text>
            <View style={ss.topBorder}>
                {/* left btn */}
                <Pressable onPress={handleToggle} style={ss.leftBtn}>
                    <Image 
                        style={ss.lefticon}
                        source={require("../../assets/Images/Club/LeftBtn.png")}
                    />
                </Pressable>
                {/* body */}
                <View style={ss.body}>
                    <Text style={ss.type}>{isOpen ? "OPEN": "CLOSED"}</Text>
                </View>
                {/* right btn */}
                <Pressable onPress={handleToggle} style={ss.rightBtn}>
                    <Image 
                        style={ss.righticon}
                        source={require("../../assets/Images/Club/RightBtn.png")}
                    />
                </Pressable>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    Container: {
        // backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    topBorder:{
        flexDirection: 'row',
        borderTopColor: 'white',
        borderTopWidth: 1,

    },
    body: {
        backgroundColor: Colors.LightBlue,
        width: 8*15,
        height: 8*5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftBtn:{
        backgroundColor: '#245998',
    },
    rightBtn:{
        backgroundColor: '#245998',
    },
    lefticon:{
        width: 8*5,
    },
    righticon:{
        width: 8*5,

    },
})