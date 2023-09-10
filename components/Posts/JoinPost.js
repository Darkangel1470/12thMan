import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import { auth, db } from "../../FirebaseConfig";



function JoinButton({handleJoin, player}){
    return (        
        <Pressable style={ss.Join} onPress={handleJoin}>
            <Text style={{color: Colors.SecondaryBlue}}>Join  </Text>
            <View style={ss.JoinNum}>
                <Text style={{color: Colors.SecondaryBlue}}> 5/{player*2} </Text>
            </View>
        </Pressable>
    )

}

function LeaveButton({handleJoin, player}){
    return (
        <Pressable style={[ss.Join, ss.Leave]} onPress={handleJoin}>
            <Text style={{color: Colors.AccentWhite}}>Leave  </Text>
            <View style={ss.JoinNum}>
                <Text style={{color: Colors.AccentWhite}}> 5/{player*2} </Text>
            </View>
        </Pressable>
    )
}

export default function JoinPost({handleJoin, player, isJoined}){

 
    return (
        <>
            {(isJoined)
            ?<LeaveButton handleJoin={handleJoin} player={player}/>
            :<JoinButton handleJoin={handleJoin} player={player}/>
            }
        </>
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
    },
    Leave:{
        backgroundColor: Colors.SecondaryGray,
    },
})