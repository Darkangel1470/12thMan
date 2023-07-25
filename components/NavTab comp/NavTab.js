
import React from 'react';
import { StyleSheet, Text, View } from "react-native"
import NavTabBtn from './NavTabBtn';


export default function NavTab(){
    return (
        <View style={ss.NavTab}>
            {/* home */}
            <NavTabBtn />
            {/* club */}
            <NavTabBtn />
            {/* Community */}
            <NavTabBtn />
            {/* Profile */}
            <NavTabBtn />
            {/* Setting */}
            <NavTabBtn />
        </View>
    )
}

btnSize = 50

const ss = StyleSheet.create({
    NavTab: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 50,
        height: 70,
        width: '100%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        bottom: 20,
        left: 20,
    }
})