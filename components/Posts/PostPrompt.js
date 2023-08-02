import React from 'react';
import { StyleSheet, Text, View } from 'react-native';



export default function PostPrompt({page}){

    const prompts = ["How many players per team?","When do you want to play","Where do you want to play"]

    return (
        <View style={ss.container}>
            <Text style={ss.font}>{prompts[page]}</Text>
        </View>
    )
}



const ss = StyleSheet.create({
    container: {
        // backgroundColor: "purple",
        alignItems: "center",
        marginTop: 80,
    },
    font:{
        textAlign:"center",
        color: 'white',
        fontSize: 30,
    }

})