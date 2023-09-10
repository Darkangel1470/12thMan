import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';

export default function SearchBar(){
    const [search, setSearch] = useState()

    return (
        <View style={ss.Container}>
            {/* Image */}
            <Image 
                source={require("../../assets/Images/SearchBarIcon.png")}
            />
            {/* Input */}
            <TextInput 
                style={ss.input}
                value={search}
                onChangeText={setSearch}
                placeholder='Search'
            />
        </View>
    )
}

const ss = StyleSheet.create({
    Container:{
        backgroundColor:"#667285",
        height: 8*7,
        borderRadius: 8*8,
        alignItems: 'center',
        paddingLeft:8*2,
        flexDirection: 'row',
        
    },
    input:{
        marginLeft: 8*2,
        width: "80%",
    }
})