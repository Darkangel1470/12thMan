import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import MyText from './MyText';
import { StyleSheet } from 'react-native';
import TheirText from './TheirText';
import ChatDate from './ChatDate';
import { auth, db } from '../../FirebaseConfig';
import { screen } from '../../styles/SafeViewAndroid';

function Text({item}){
    // console.log('data :>> ', item);
    if(auth.currentUser?.email==item.senderid){
        return (
            <MyText item={item}/>
        )
    }else{
        return (
            <TheirText item={item}/>
        )
    }
}
export default function ChatBody({chats}){
    return (
        <View style={ss.container}>
            {/* <ChatDate /> */}
            <FlatList
                data={chats}
                renderItem={({item})=>(
                    <Text item={item}/>
                )}
            />
        </View>
    )
}

const ss = StyleSheet.create({
    container: {
        paddingTop: 8*2,
        width:screen.width-16,
        // backgroundColor:'yellow',
        position:'absolute',
        bottom:8*10,
        left: 8,
    }
})

