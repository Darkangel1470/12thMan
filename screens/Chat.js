// reference: https://www.freecodecamp.org/news/building-a-real-time-chat-app-with-reactjs-and-firebase/
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../styles/Colors';
import { screen } from '../styles/SafeViewAndroid';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatBody from '../components/Chat/ChatBody';
import ChatInput from '../components/Chat/ChatInput'; 
import { auth, db } from '../FirebaseConfig';
import PersonalChatList from '../components/Chat/PersonalChatList';

export default function Chat(){
    const navigation = useNavigation()
    const [chatMode, setChatMode] = useState('chats')
    const [receiverid, setReceiverid] = useState('community')
    const [ignore, forceUpdate] = useReducer(x=>x+1)
    const [chats, setChats] = useState([]);
    
    useLayoutEffect(() =>{
        navigation.setOptions({
            headerShown: false,
        })
    })
    useEffect(()=>{
        console.log('Loading Texts...')
        console.log('chatMode :>> ', chatMode);
        console.log('receriverid :>> ', receiverid);
        const subscriber= db.collection('chat')
                            .orderBy('timestamp')
                            .where('receiverid','==',receiverid)

        subscriber.onSnapshot(ss=>{
                var chatsArr = ss.docs?.map(item=>{
                    return {...item.data(),id: item.id}
                })
                setChats(chatsArr);
            })
        // return ()=> subscriber();
    },[receiverid])

    useEffect(()=>{if(chatMode=="chats"){    
        console.log('loading chats')
        setReceiverid("chats")
        
    }},[chatMode]);

    useEffect(()=>{if(chatMode=="club"){  
        console.log('loading Club of: ', auth.currentUser?.email)
        db.collection('users').doc(auth.currentUser?.email)
        .get().then(doc=>{
            console.log('doc.data() :>> ', doc.data().club);
            if(!doc.data().club){
                navigation.navigate('club');
            }else{
                setReceiverid(doc.data().club);
            }

        }).catch(err => console.log(err))
    }},[chatMode]);

    useEffect(()=>{if(chatMode=="community"){ 
        console.log('loading Community')        
        setReceiverid("community")
    }},[chatMode]);

    const handleSwitchChats=() =>{
        console.log('show chats')
        setChatMode('chats')
    }
    const handleSwitchClub=() =>{
        console.log('show clubs')
        setChatMode('club')
    }
    const handleSwitchCommunity=() =>{
        console.log('show community')
        setChatMode('community')
    }

    return (        
        <SafeAreaView style={ss.Container}>
            {/* header */}
            <View style={ss.Header}>
                {/* Community button */}
                <Pressable
                    onPress={navigation.goBack}
                >
                    <Image
                        style={ss.CommunityIcon}
                        source={require('../assets/BackBtn.png')}                    
                    />
                </Pressable>
                {/* Notification */}
                <Image
                    style={ss.NotificationIcon}
                    source={require('../assets/Images/Chats/NotificationIcon.png')}
                />
            </View>
                {/* CLub or community switch */}
                <View style={ss.SwitchContainer}>
                    <View
                        style={ss.Switch}
                    >
                        <Pressable
                            style={[ss.chatModes, chatMode=='chats' && ss.Active]}
                            onPress={handleSwitchChats}
                        >
                            <Text style={[ss.chatOption,chatMode=="chats" && ss.ActiveChatOption]}>Chats</Text>
                        </Pressable>
                        <Pressable 
                            style={[ss.chatModes, chatMode=='club' && ss.Active]}
                            onPress={handleSwitchClub}
                        >
                            <Text style={[ss.chatOption,chatMode=="club" && ss.ActiveChatOption]}>Club</Text>
                        </Pressable>
                        <Pressable 
                            style={[ss.chatModes, chatMode=='community' && ss.Active]}
                            onPress={handleSwitchCommunity}
                        >
                            <Text style={[ss.chatOption,chatMode=="community" && ss.ActiveChatOption]}>Community</Text>
                        </Pressable>
                    </View>
                </View>
            {/* body */}
            {chatMode=='chats'
            ?<PersonalChatList />
            :<ChatBody 
                    chats={chats}
                    setChats={setChats}
                />
            }
            {/* Text input */}
            {chatMode!='chats' &&
                <View style={ss.chatInput}>
                    <ChatInput receiverid={receiverid}/>
                </View>
            }
        </SafeAreaView>
    )
}
const ss = StyleSheet.create({
    Container:{
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
        width: screen.width,
        padding: 8*2,
    },
    Header:{
        flexDirection: 'row',
    },
    SwitchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',    
        marginBottom:8*2,    
    },
    Switch:{
        flexDirection: 'row',
    },
    chatModes:{
        flex: 1,
        padding: 8,
        // paddingLeft: 8*3,
        // paddingRight: 8*3,
        backgroundColor: Colors.PrimaryGray,
        borderRadius: 8,
        margin:4,
    },
    chatOption:{
        color: 'white',
        fontSize: 8*1.5,  
        fontWeight: 100*7,
        textAlign: 'center',
    },
    Active: {
        backgroundColor: Colors.AccentWhite,
    },
    ActiveChatOption:{
        color: 'black',
    },
    CommunityIcon: {
        height:8*5,
        width: 8*6,
    },
    NotificationIcon:{
        height:8*5,
        width: 8*5,
    },
    chatInput:{
        position: 'absolute',
        bottom: 8*3,
        left: 8,
        width: screen.width,
        paddingRight: 8*3,
        paddingLeft: 8*3,
    }
})