import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../styles/Colors';

export default function PostPrompt({page}){

    const prompts = ["How many players per team?","When do you want to play", "Where do you want to play?"]

    return (
        <View style={[ss.container,page==2 && ss.mapContainer]}>
            <Text style={ss.font}>{prompts[page]}</Text>
        </View>
    )
}



const ss = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBlack,
        alignItems: "center",
        paddingTop: 80,
    },
    mapContainer:{
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomLeftRadius: 8*2,
        borderBottomRightRadius: 8*2,
    },
    font:{
        textAlign:"center",
        color: 'white',
        fontSize: 30,
    }

})