import React from "react";
import { Image, Pressable, TextInput } from "react-native";
import { StyleSheet, View } from "react-native";

export default function SearchBar({search, setSearch, style, handleSubmit, handleFilter}){

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
            <Pressable
                onPress={handleFilter}
            >
                <Image 
                    source={require("../../assets/Images/Search/FilterIcon.png")}
                />
            </Pressable>
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
        paddingRight:8*2,
        flexDirection: 'row',
        marginLeft: 8*1,
        marginRight: 8*1,
    },
    input:{
        flex: 1,
        marginLeft: 8*2,
        width: "80%",
        fontSize: 8*3,
    }
})