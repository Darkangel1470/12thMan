import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

export default function JoinPost({handleJoin, player}){

    return (
        <Pressable style={ss.Join} onPress={handleJoin}>
            <Text style={{color: Colors.SecondaryBlue}}>Join  </Text>
            <View style={ss.JoinNum}>
                <Text style={{color: Colors.SecondaryBlue}}> 5/{player*2} </Text>
            </View>
        </Pressable>
    )
}

const ss = StyleSheet.create({
    Join:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,

        backgroundColor: Colors.PrimaryGreen,
        margin:30,
        borderRadius: 20,
        borderWidth:1,
    },
    JoinNum: {
        borderWidth:1,
        borderRadius: 10,
        borderColor: "white",
    }
})