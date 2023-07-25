

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"



export default function NavTabBtn({type, label}){

    const navigation = useNavigation()

    var sauce= require("../../assets/Images/NavTabIcons/HomeIcon.png");
    var handlePress = () =>{
        navigation.navigate('createpost')
    }
    switch(type){
        case "home":
            
            sauce = require("../../assets/Images/NavTabIcons/HomeIcon.png")
            break;
        case "search":
            sauce = require("../../assets/Images/NavTabIcons/SearchIcon.png")
            break;
        case "create":
            sauce = require("../../assets/Images/NavTabIcons/CreateIcon.png")
            break;
        case "community":
            sauce = require("../../assets/Images/NavTabIcons/CommunityIcon.png")
            break;
        case "profile":
            sauce = require("../../assets/Images/NavTabIcons/ProfileIcon.png")
            break;
        default:
            sauce = require("../../assets/Images/NavTabIcons/HomeIcon.png")
            break;
    }


    return (
        <TouchableWithoutFeedback onPress={handlePress}> 
            <View style={ss.NavTabBtn}>
                {/* image */}
                <Image
                    style={ss.NavIcon}
                    source={sauce}
                />
                {/* Label */}
                <Text style={ss.label}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

btnSize = 50

const ss = StyleSheet.create({
    NavTabBtn: {
        // backgroundColor: "",
        width: btnSize,
        height: btnSize,
        borderRadius: 20,

    },
    NavIcon: {
        width: 30,
        height: 30,
        alignSelf: "center",
        marginBottom:4,
    },
    label: {
        color: "white",
        alignSelf: "center",
        fontSize:9

    }
})