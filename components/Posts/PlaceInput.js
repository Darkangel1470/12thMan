import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';



export default function PlaceInput({post, setPost}){


    const handleChange = (place)=>{
        setPost({
            player: post.player,
            dateTime: post.dateTime,
            location: place
        })
    }
    return (
        <View style={ss.container}>
            {/* location icon */}
            <View style={ss.place}>
                <Image 
                    style={ss.icon}
                    source={require("../../assets/Images/Post/locationIcon.png")}
                />
                {/* location input */}
                <TextInput 
                    style={ss.input}
                    placeholder='Location'
                    onChangeText={handleChange}
                    value={post.location}
                />
            </View>
        </View>
    )
}
const ss = StyleSheet.create({
    container:{
        position: 'absolute',
        width:'100%',
        alignItems: "center",
        color:'white',
        paddingTop: 150,    
    },
    place:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        height:30,
        width:20,
        marginRight: 10,
        resizeMode: 'stretch',
    },
    input:{
        backgroundColor: 'white',
        borderRadius: 10,
        width:200,
        height:40,
        justifyContent: 'center',
        paddingLeft: 10,

    }
})