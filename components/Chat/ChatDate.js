import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

export default function ChatDate(){
    return (
        <View style={ss.container}>
            <Text style={ss.date}>21/09/2023</Text>
        </View>
    )
}
const ss = StyleSheet.create({
    container:{
        // backgroundColor: 'blue',
        alignItems: 'center',
        padding: 8,
    },
    date:{
        color: 'white',
        fontSize: 8*2,
        backgroundColor: Colors.PrimaryGray,
        borderRadius: 8*2,
        padding: 8*1,
        paddingTop: 8*.3,
        paddingBottom: 8*.3,
        opacity: 0.5
    },
})