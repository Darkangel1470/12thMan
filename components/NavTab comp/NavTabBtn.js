
import React from 'react';
import { StyleSheet, Text, View } from "react-native"


export default function NavTabBtn(){
    return (
        <View style={ss.NavTabBtn}>
            <Text>
                
            </Text>
        </View>
    )
}

btnSize = 50

const ss = StyleSheet.create({
    NavTabBtn: {
        backgroundColor: "black",
        width: btnSize,
        height: btnSize,
        borderRadius: 20
    }
})