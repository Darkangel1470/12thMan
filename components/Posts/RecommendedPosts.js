import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Post from './Post';

export default function RecommendedPosts(){

    return (
        <View style={{padding: 10}}>
            <Text>Recommended posts</Text>
            <Text></Text>
            <Post/>
            <Text></Text>
            <Post/>
        </View>
    )

}


// const ss = StyleSheet.create({
//     Container: {

//     },
//     Post: {
//         marginTop: 10,
//     }
// })