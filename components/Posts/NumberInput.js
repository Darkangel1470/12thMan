import React, { useState } from 'react';
import {  StyleSheet, Text,  TouchableOpacity,  View } from 'react-native';

export default function NumberInput({post,setPost}){
    const [players,setPlayers]= useState(post)
    const handleIncrease = () => {
        if(post.player==6){
        }else{
            setPost({
                player: post.player+1,
                dateTime: post.dateTime,
                location: post.location
            })
        }
    }
    const handleDecrease = () => {
        if(post.player==3){
        }else{
            setPost({
                player: post.player-1,
                dateTime: post.dateTime,
                location: post.location
            })
        }
    }
    return (
        <View style={ss.NumberInput}>
            {/* increase button */}
            <TouchableOpacity style={ss.upbtn} onPress={handleIncrease}>
                <Text style={ss.text}>Up</Text>
            </TouchableOpacity>
            {/* text button */}
            <Text style={ss.players}>{post.player}</Text>
            {/* descrease button */}
            <TouchableOpacity style={ss.downbtn} onPress={handleDecrease}>
                <Text style={ss.text}>Down</Text>
            </TouchableOpacity>
        </View>
    )
}
const ss = StyleSheet.create({
    NumberInput:{
        position: 'absolute',
        width:'100%',
        alignItems: "center",
        color:'white',
        paddingTop: 150,
    },
    upbtn:{
        width:100,
        backgroundColor: Colors.SecondaryGray,
        padding: 20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
        alignItems: "center",
    },
    text:{
        fontSize:20,
        fontWeight: "bold"
        
    },
    players:{
        fontSize:40,
        fontWeight: "bold",
        color: Colors.AccentWhite,
    },
    downbtn:{
        width:8*14,
        backgroundColor: Colors.SecondaryGray,
        padding: 20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
        alignItems: "center",
    },
})

