import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';



export default function Header(){
    //variable
    const navigation = useNavigation()
    //functions
    const handleChats = () => {
        console.log('handle chats pressed')
        navigation.navigate("chat");
    }
    return (
        
        <View style={ss.header}>
            {/* Label */}
            <Text style={ss.label}>12Th Man</Text>
            {/* chatIcon */}
            <Pressable
                onPress={handleChats}
            >
                <Image
                    style={ss.chatIcon}
                    source={require("../assets/Images/ChatIcon.png")}
                />
            </Pressable>

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