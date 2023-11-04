import React from "react";
import { Image, TextInput } from "react-native";
import { StyleSheet, View } from "react-native";

export default function SearchBar({search, setSearch, style, handleSubmit}){

    return (
        <View style={ss.Container}>
            {/* Image */}
            <Image 
                source={require("../../assets/Images/SearchBarIcon.png")}
            />
            {/* Input */}
            <TextInput 
                style={[ss.input, style?.txtinput]}
                value={search}
                onChangeText={setSearch}
                placeholder='Search'
                onSubmitEditing={handleSubmit}
            />
        </View>
    )
}

const ss = StyleSheet.create({
    Container:{
        backgroundColor:"white",
        height: 8*7,
        borderRadius: 8*8,
        alignItems: 'center',
        paddingLeft:8*2,
        flexDirection: 'row',
        
    },
    input:{
        marginLeft: 8*2,
        width: "80%",
        fontSize: 8*3,
        
    }
})