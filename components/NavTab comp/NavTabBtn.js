import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { auth, db } from '../../FirebaseConfig';

export default function NavTabBtn({type, label }){
    var sauce= require("../../assets/Images/NavTabIcons/HomeIcon.png");
    const navigation = useNavigation()
    var handlePress;
    switch(type){
        case "home":
            handlePress = () =>{
                console.log("Pressed: "+auth.currentUser?.email)
                navigation.navigate("home")
            }
            sauce = require("../../assets/Images/NavTabIcons/HomeIcon.png")
            break;
        case "search":
            sauce = require("../../assets/Images/NavTabIcons/SearchIcon.png")
            break;
        case "create":
            handlePress = () =>{
                console.log("Pressed")
                navigation.navigate("createpost")
            }
            sauce = require("../../assets/Images/NavTabIcons/CreateIcon.png")
            break;
        case "community":
            
            handlePress = () =>{
                console.log("Pressed club")

                db.collection('users').doc(auth.currentUser?.email)
                .get().then(doc=>{
                    // console.log('doc.club :>> ', doc.data().club);
                    if(doc.data().club){
                        navigation.navigate('clubdetails',{cid: doc.data().club})
                    }else{
                        navigation.navigate('club');
                    }
                }).catch(err=>{
                    console.error(err);
                })
            }
            sauce = require("../../assets/Images/NavTabIcons/CommunityIcon.png")
            break;
        case "profile":
            handlePress = () =>{
                console.log("Pressed")
                navigation.navigate("profile")
            }
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