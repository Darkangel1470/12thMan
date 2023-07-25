import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../styles/Colors';



export default function Header(){
    
    return (
        
        <View style={ss.header}>
            {/* Label */}
            <Text style={ss.label}>12Th Man</Text>
            {/* chatIcon */}
            <Image
                style={ss.chatIcon}
                source={require("../assets/Images/ChatIcon.png")}
            />

        </View>
    )
}

var winwidth = Dimensions.get("window").width
const ss = StyleSheet.create({
    header: {
        position: "absolute",
        flexDirection:"row",

        backgroundColor: Colors.PrimaryBlack,

        justifyContent: "center",
        alignItems: "center",

        height: 70,
        width: winwidth,
        top:0,
        left:0,
        paddingRight: 10,
        paddingLeft: 10,
    },
    label: {
        flex:1,
        fontSize: 20,
        color:"white",
        textAlign: "center",
        
    },
    chatIcon: {
        height:30,
        width: 30,
    },
})