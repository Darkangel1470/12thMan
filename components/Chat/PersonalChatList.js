import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function PersonalChatList(){

    // variables
    const navigation = useNavigation();

    // states
    const [mount, setMount] = useState(true);
    const [conversationlist, setConversationList] = useState();
    
    useEffect(() => {if(mount){
        const sub = db.collection('users').doc(auth.currentUser?.email)
        sub.onSnapshot(doc=>{
            var cl = doc.data().conversationlist
            setConversationList(cl);
        })
    }},[mount])
    return (
        <View style={ss.container}>

            <FlatList 
                data={conversationlist}
                renderItem={({item})=>(
                    <Pressable style={ss.PC}
                        onPress={()=>{navigation.navigate('personalchat',{userid: item.user})}}
                    >
                        <View style={ss.profile}>
                            <Text>t</Text>
                        </View>
                        {/* name */}
                        <View style={ss.name}>
                            <Text style={ss.nameText}>{item.user}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    )
}

const ss = StyleSheet.create({
    container:{
        // backgroundColor: 'white',
    },
    PC:{
        flexDirection: 'row',
        // backgroundColor: 'white',
        height: 8*7,
        alignItems: 'center',
        marginBottom:8*1,
    },
    profile:{
        backgroundColor: 'gray',
        height: 8*7,
        width: 8*7,
        borderRadius: 8*5,
        marginRight: 8*2,
    },
    name:{
        backgroundColor: 'white',
        borderRadius:8*1, 
        width: '76%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 8*2,
    },
    nameText:{
        fontSize: 8*2,
        fontWeight: 100*5,


    }
    
})