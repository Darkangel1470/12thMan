
import React from 'react';
import { StyleSheet, Text, View } from "react-native"
import NavTabBtn from './NavTabBtn';
import Colors from '../../styles/Colors';
import { screen } from '../../styles/SafeViewAndroid';


export default function NavTab(){
    return (
        <View style={ss.NavTab}>
            {/* home */}
            <NavTabBtn 
                type="home"
                label="Home"
                
            />
            {/* search */}
            <NavTabBtn 
                type="search"
                label="Search"
            />
            {/* create */}
            <NavTabBtn 
                type="create"
                label="Create"
            />
            {/* Community */}
            <NavTabBtn 
                type="community"
                label="Club"
            />
            {/* Profile */}
            <NavTabBtn 
                type="profile"
                label="Profile"
            />
        </View>
    )
}

btnSize = 50

const ss = StyleSheet.create({
    NavTab: {
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.PrimaryBlack,
        height: 80,
        width: screen.width,
        position: 'absolute',
        paddingLeft:20,
        paddingRight:20,
        bottom: 0,
        left: 0,
        
    }
})