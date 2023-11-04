import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screen } from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';
import Divider from '../components/Divider';
import { FieldValue, auth, db } from '../FirebaseConfig';
import Player from '../components/Posts/Player';
import NavTab from '../components/NavTab comp/NavTab';
function CDDetailsSection({club,isJoined, forceUpdate}) {
    if(!club){return;}
    const navigation = useNavigation()
    //conditional rendering states
    const [showSettings, setShowSettings] = useState(false)
    const handleJoin = ()=>{
        if(!isJoined){
            db.collection('clubmembers').add({
            clubid: club?.cid,
                userid: auth.currentUser?.email,
                isCaptain: false
            }).catch((err)=>{
                console.error(err);
            })
            db.collection('users').doc(auth.currentUser?.email)
            .update({ 
                club: club?.cid,
            })
            forceUpdate();
        }else{
            console.log('already joined')
            navigation.navigate('chat')
        }
    }
    const handleSetting = ()=>{
        console.log('settings pressed')
        setShowSettings(!showSettings);
    }
    const handleLeave = ()=>{
        //check if user is captain
        if(club.captain==auth.currentUser?.email){
            console.log('captain cant leave')
        }else{
            console.log('leaving')
            db.collection('clubmembers').where('userid','==',auth.currentUser?.email)
            .get().then(ss=>{
                ss.forEach(doc=>{
                    doc.ref.delete().then(()=>{
                        navigation.navigate('club')
                    });
                })
            })
            db.collection('users').doc(auth.currentUser?.email)
            .update({ 
                club: "",
            })
            console.log('FieldValue :>> ', FieldValue);
        }
        //if not then delete from clubmember
    }
    function updateClubDetails(){
        navigation.navigate('clubdetails',{cid: club.cid})
    }
    return (
        <View style={dsss.Container}>
            <View style={dsss.NonBio}>
                {/* Member num */}
                <View style={dsss.DetailsLeft}>
                    <View>
                        <Text style={dsss.MemNum}>12/22</Text>
                    </View>
                    {/* Name */}
                    <View>
                        <Text style={dsss.Name}>{club?.name}</Text>
                    </View>
                </View>
                {/* Settings icon */}
                {isJoined &&
                <Pressable
                    style={dsss.ImageContainer}
                    onPress={handleSetting}
                >
                    <Image
                        style={dsss.Image}
                        source={require("../assets/Images/Club/Settings.png")}
                    />
                </Pressable>}
                {showSettings && 
                    <View style={dsss.settingOptions}>
                        <Pressable
                        onPress={handleLeave}>
                            <Text>Leave</Text>
                        </Pressable>
                    </View>
                }      
            </View>
            {/* BIO */}
            <View>
                <Text style={dsss.Bio}>{club?.bio}</Text>
            </View>
            {/* CLUB Button */}
            <Pressable 
                style={[dsss.ClubButton, !isJoined && dsss.isJoined]}
                onPress={handleJoin}
            >
                <Text style={dsss.ClubBut}>{isJoined?"CLUB CHAT": 'JOIN CLUB'}</Text>
            </Pressable>
            <View style={dsss.divider}>
                <Divider />
            </View>
        </View>
    )
}
function ClubMemberList({clubid, forceUpdate, ignore}){
    //states
    const [memberList, setMemberList] = useState([])
    const [clubmemberlist, setclubmemberlist] = useState([ ])
    const [renderfl, setRenderfl] = useState(false)
    const [mounted, setMounted] = useState(true)
    const [clfetched, setClfetched] = useState(false)


    //functions
    function fetchClubMember(){
        console.log('fetching cl member')
        // fetch list of club member for clubid
        const sub = db.collection('clubmembers').where('clubid','==',clubid)
        sub.onSnapshot(ss=>{
            ss.forEach(doc=>{
                var dummy = clubmemberlist;
                dummy.push(doc.data())
                setclubmemberlist(dummy)
            })
            setClfetched(true)
        })
    }
    function fetchUsers(){
        console.log('cml :>> ', clubmemberlist);
        // fetch list of users for uid
        var users = []
        clubmemberlist.forEach(item=>{
            db.collection('users').where('email','==',item.userid)
            .get().then((ss)=>{
                ss.forEach(doc=>{
                    users.push(doc.data());
                })
                setMemberList(users);
            })
            return;
        })
    }
    useEffect(() =>{
        fetchClubMember()
    },[mounted,ignore])
    useEffect(() =>{
        fetchUsers()
    },[clfetched,ignore])
    return (
        <View style={mlss.cml}>
                <FlatList 
                    style={mlss.flatlist}
                    data={memberList}
                    extraData={ignore}
                    renderItem={({item})=>(
                        <Player 
                            item={item}
                        />
                    )}
                />
        </View>
    )
}
export default function ClubDetails(){
    const route= useRoute()
    const navigation = useNavigation()
    const clubid = route.params.cid
    const [club, setClub] = useState()
    const [isJoined, setIsJoined] = useState(false)
    const [ignore, forceUpdate] = useReducer(x=>x+1,0);
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    })
    useEffect(()=>{
        const sub = db.collection('clubs').doc(clubid)
        sub.onSnapshot(ss=>{
            setClub({...ss.data(),cid: ss.id})
        })
        //check if user has joined
        console.log('checking joined status')
        db.collection('clubmembers')
        .where('clubid','==',clubid)
        .where('userid','==',auth.currentUser?.email)
        .get().then(ss =>{
            ss.forEach(doc=>{
                if(doc.exists){
                    // console.log('found :>> ', doc.data());
                    setIsJoined(true)
                }else{
                    // console.log('not found :>> ', doc.data());
                    setIsJoined(false)
                }
            })
        }).catch(err =>{
            console.error(err);
        })
    },[ignore, isJoined]);
    return (
        <SafeAreaView style={ss.Container}>
            {/*  details */}
            <CDDetailsSection ignore={ignore} club={club} isJoined={isJoined} forceUpdate={forceUpdate} />
            {/* Player list */}
            <ClubMemberList clubid={clubid} forceUpdate={forceUpdate}/>
            {/* navtab */}
            <NavTab />
        </SafeAreaView>
    )
}
const dsss = StyleSheet.create({
    Container: {
        paddingTop: 8*9,
        alignItems: 'center',
    },
    DetailsLeft: {
        // backgroundColor: 'pink',   
        flex : 1,
    },
    NonBio:{
        flexDirection: 'row',
    },
    MemNum: {
        color: Colors.AccentWhite,
        fontSize: 8*2,
        fontWeight: 100*3,        
    },
    Name: {
        color: Colors.AccentWhite,
        fontSize: 8*4,
        fontWeight: 100*9,
    },
    Bio: {
        color: Colors.LightBlue,
        fontSize: 8*2,
        fontWeight: 100*4,
        textAlign: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 8*5,
        marginBottom: 8*2,
    },
    ImageContainer:{
        justifyContent: 'flex-end',
    },
    Image: {
        height: 8*5,
        width: 8*5,
    },
    ClubButton:{
        backgroundColor: Colors.LightBlue,
        borderTopWidth: 2,
        borderColor: Colors.AccentWhite,
        height: 8*6,
        width: 8*35,
        alignItems: "center",
        justifyContent: "center",
    },
    ClubBut:{
        color: Colors.AccentWhite,
        fontWeight: 100*9,
    },
    divider:{
        height: 4,
        width: '100%',
        marginTop: 8*2,
    },
    isJoined:{
        backgroundColor: Colors.PrimaryGreen,
    },
    settingOptions:{
        position:'absolute',
        right: 0,
        bottom:-8*5,
        backgroundColor: Colors.AccentWhite,
        paddingLeft: 8*2,
        paddingRight: 8*2,
        padding: 8
    }
})
const mlss= StyleSheet.create({
    flatlist:{
        padding: 8,
    },
    cml:{
        paddingBottom: 8*9,
    }
})
const ss = StyleSheet.create({
    Container:{
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
        width: screen.width,
        padding: 8*2,
    },
})
