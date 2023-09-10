import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function LocationSection({post}){
    return (
        <>
            <Text style={ss.Header}>Location</Text>
            <View style={ss.Container}>
                <Text style={ss.Location}>{post?.location}</Text>
            </View>
        </>
    )
}
const ss = StyleSheet.create({
    Container:{
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 8*30,
    },
    Header:{
        color: Colors.AccentWhite,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 8*5,
    },
    Location:{
        color: 'white',
        fontSize: 8*5,
        fontWeight: 'bold',
    }
})