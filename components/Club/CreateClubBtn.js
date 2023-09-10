import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';

export default function CreateClubBtn({onpress}){

    const navigation = useNavigation()

    return (
        <Pressable style={ss.container} onPress={onpress}>
            <Text style={ss.create}>CREATE</Text>
        </Pressable>
    )
}

const ss = StyleSheet.create({
    container:{
        backgroundColor: "#43DF00",
        width: 8*15,
        height: 8*5,
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: Colors.AccentWhite,
        borderTopWidth: 1,
        alignSelf: 'center',
        margin: 8*3,
    },
    create:{
        color: 'white',
        fontSize: 8*2,
    }
})