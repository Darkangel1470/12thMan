import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Colors from '../../styles/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeInput from './TimeInput.js';
import PlaceInput from './PlaceInput';
import NumberInput from './NumberInput';
// remove number please npm



export default function PostInput({page,post,setPost}){
    return (
        <View style={ss.container}>
            {page==0
                ? <NumberInput post={post} setPost={setPost} />
                : page==1
                    ? <TimeInput post={post} setPost={setPost} />
                    : <PlaceInput post={post} setPost={setPost} />
            }
        </View>
    )
}
const ss = StyleSheet.create({
    container:{
        backgroundColor:'white',
        
    },
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
        width:100,
        backgroundColor: Colors.SecondaryGray,
        padding: 20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
        alignItems: "center",
    },
})

