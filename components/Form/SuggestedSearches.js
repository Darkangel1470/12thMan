import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View,Text, Pressable } from "react-native";

export default function SuggestedSearches({data, handlePress}){

    // console.log('data :>> ', data);
    

    return (
        <View style={ss.container}>
            <FlatList 
                data={data}
                renderItem={({item})=>(
                    <Pressable style={ss.search} onPress={()=>{handlePress(item)}}>
                        <Text style={ss.searchText}>{item.display_name}</Text>
                    </Pressable>
                )}
                style={ss.list}
            />
        </View>
    )
}

const ss = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        paddingTop: 8*0,
        paddingBottom: 8*0,
        marginTop: 8*0.5,
        marginLeft: 8*2,
        marginRight: 8*2,
    },
    search:{
        padding: 8*2,
        borderBottomWidth:0.2,

    },
    searchText:{
        fontSize: 8*2.5
    },
    list:{
        // height: 8*10,
        flexGrow: 1,
        maxHeight: 8*45
    }
})