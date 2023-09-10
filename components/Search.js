import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';


export default function Search(){

    return (
        <View style={ss.Search}>
            <Image 
                style={ss.SearchIcon}
                source={require('./../assets/SearchIcon.jpg')}
            />
            <TextInput>Search Your location</TextInput>
        </View>
    )
}




//style
const ss = StyleSheet.create({
    Search: {
        backgroundColor: "rgba(255, 255, 255, 0.50)",
        borderRadius: 30,
        width: "100%",
        height: 50,
        padding: 10,
        paddingLeft: 15,
        flexDirection: "row",
    },
    SearchIcon: {
        flex:0.2,
        backgroundColor: 'gray',
    },
    Input:{
        width: "100%",
        

    }
})