import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Player({item}){
    const navigation = useNavigation();
    useEffect(()=>{
        // console.log('player :>> ', item);
    })
    
    const handlePress = ()=>{
        // console.log('item.userid :>> ', item.email);
        navigation.navigate("profile",{
            email: item.email
        })        
    }
    return (
        <Pressable style={ss.Container} onPress={handlePress}>
            <View style={ss.Image}><Text>t</Text></View>
            <View>
                <Text style={ss.Name}>{item.fname}</Text>
                <Text style={ss.Host}>{item.ishost? "Host":null}</Text>
            </View>
        </Pressable>
    )
}

const ss = StyleSheet.create({
    Container:{
        flexDirection: 'row',
        backgroundColor:'white',
        width: '100%',
        height: 80,
        borderRadius: 20,
        padding: 15,
        paddingLeft: 10,
        marginBottom: 20,
    },
    Image: {
        height:50, 
        width:50, 
        borderRadius: 3,
        backgroundColor: 'gray',
        marginRight: 20,
    },
    Name: {
        color: 'black',
        fontWeight: 'bold',
    },
    Host: {
        color: 'black',
        
    }
})