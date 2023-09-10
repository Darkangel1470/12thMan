import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { auth, db } from '../../FirebaseConfig';

export default function ChatInput({receiverid}) {

    const senderid = auth.currentUser?.email
    const [text, setText] = useState('')
    const timestamp = new Date();
    useEffect(() => {
        console.log('receiverid while seding :>> ', receiverid);
    })
    
    const handlePress = ()=>{

        console.log('text :>> ', text);
        console.log('senderid :>> ', senderid);
        console.log('receiverid :>> ', receiverid);
        console.log('timestamp :>> ', timestamp);
        db.collection('chat').add({
            senderid: senderid,
            receiverid: receiverid,
            text: text,
            timestamp: timestamp,
        })

        setText('');
    }
    return (
        <View style={ss.container}>
            <View style={ss.inputField}>
                <TextInput
                    style={ss.input}
                    value={text}
                    onChangeText={text=>setText(text)}
                />
            </View>
            <Pressable
                onPress={handlePress}
            >
                <Image 
                    source={require('../../assets/Images/Chats/SendIcon.png')}
                />
            </Pressable>
            
        </View>
    )
}

const ss = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'white',
    },
    inputField:{
        backgroundColor: 'gray',
        height: 8*6,
        flex: 1,
        borderRadius: 20,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8*2,
        paddingRight: 8*2,
        marginRight: 8,
    },
    input:{
        fontSize: 8*2.5,
        color: 'white',
    },
    sendButton:{

    },
})