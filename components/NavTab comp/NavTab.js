
import React from 'react';
import { StyleSheet, Text, View } from "react-native"
import NavTabBtn from './NavTabBtn';
import Colors from '../../styles/Colors';


export default function NavTab({nav}){
    return (
        <View style={ss.NavTab}>
            {/* home */}
            <NavTabBtn 
                type="home"
                label="Home"
                nav={nav}
                
            />
            {/* search */}
            <NavTabBtn 
                type="search"
                label="Search"
                nav={nav}
            />
            {/* create */}
            <NavTabBtn 
                type="create"
                label="Create"
                nav={nav}
            />
            {/* Community */}
            <NavTabBtn 
                type="community"
                label="Community"
                nav={nav}
            />
            {/* Profile */}
            <NavTabBtn 
                type="profile"
                label="Profile"
                nav={nav}
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
        width: '110%',  
        position: 'absolute',
        paddingLeft:20,
        paddingRight:20,
        bottom: 0,
        left: 0,
        
    }
})