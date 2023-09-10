import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../styles/Colors";
import { screen } from "../styles/SafeViewAndroid";
import ChatInput from "../components/Chat/ChatInput";
import ChatBody from "../components/Chat/ChatBody";
import { auth, db } from "../FirebaseConfig";

export default function PersonalChat(){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    })

    //variables
    const navigation = useNavigation();
    const route = useRoute();

    var userid =  route.params?.userid;
    
    
    
    //states
    const [receiverid, setReceiverid] = useState();
    const [chats, setChats] = useState([])

    const [mount,setMount] = useState(true)




    //auto set
    useEffect(()=>{if(mount){console.log('loading receiverid...')
        db.collection('users').doc(auth.currentUser?.email)
        .get().then((doc)=>{
            var user = doc.data();
            var rid;
            var cl = user.conversationlist || []
            cl.forEach(item=>{
                if(item.user==userid){
                    console.log('found conversation')
                    rid=item.receiverid;
                    setReceiverid(item.receiverid);
                }
            })
            // if new conversation
            if(!rid){
                console.log('creating new conversation')
                startConversation(userid, cl);
            }
        })
    }},[mount])

    useEffect(()=>{if(receiverid){console.log('loading chats...')
        const sub = db.collection('chat')
                    .orderBy('timestamp')
                    .where('receiverid','==',receiverid);
        sub.onSnapshot(ss=>{
            var chatsArr = ss.docs?.map(item=>{
                // console.log('chats :>> ', item.data());
                return {...item.data(),id: item.id}
            })
            setChats(chatsArr);
        })
    }},[receiverid])

    //functions
    function startConversation(userid, mycl){
        //create rid
        var rid = userid+auth.currentUser?.email+"";
        console.log('receiverid :>> ', receiverid);

        //add conversation to myuser
        mycl.push({user: userid, receiverid: rid})
        console.log('mycl :>> ', mycl);
        db.collection('users').doc(auth.currentUser?.email)
        .update({
            conversationlist: mycl
        })
        //add conversation to otheruser
        var ocl;
        db.collection('users').doc(userid)
        .get().then(doc=>{
            var user = doc.data();
            ocl = user.conversationlist || [];
            console.log('ocl :>> ', ocl);
            ocl.push({user: auth.currentUser?.email, receiverid: rid})
            db.collection('users').doc(userid)
            .update({
                conversationlist: ocl
            })
        })

    }
    return (
        <SafeAreaView style={ss.container}>
            {/* header */}
            <View style={ss.Header}>
                {/* back button */}
                <Pressable 
                    onPress={navigation.goBack}
                >
                    <Image
                        style={ss.backIcon}
                        source={require('../assets/BackBtn.png')}                    
                    />
                </Pressable>
                {/* User image */}
                {/* User name */}
                <Text style={ss.name}>Nihar Kunder</Text>
            </View>
            {/* chatBody */}
                {/* their textz */}
                {/* my textz */}
                <ChatBody 
                    chats={chats}
                    setChats={setChats}
                />
            {/* inputField */}
                <View style={ss.chatInput}>
                    <ChatInput receiverid={receiverid}/>
                </View>
        </SafeAreaView>
    )
}

const ss = StyleSheet.create({
    container:{
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
        width: screen.width,
        padding: 8*2,
    },
    Header:{
        flexDirection: 'row',
    },
    backIcon: {
        height:8*5,
        width: 8*6,
    },
    name:{
        fontSize: 8*2,
        fontWeight: 100*9,
        color: 'white',
        textAlign: 'center',
    },
    chatInput:{
        position: 'absolute',
        bottom: 8*3,
        left: 8,
        width: screen.width,
        paddingRight: 8*3,
        paddingLeft: 8*3,
    },
})