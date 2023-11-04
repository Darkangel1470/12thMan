import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Player from "../components/Posts/Player";
import { auth, db } from "../FirebaseConfig";
import { screen } from "../styles/SafeViewAndroid";

function FriendRequest({actions, item}){

    //states
    const [mount, setMount] = useState(true)
    const [frl1, setfrl1] = useState([]);//my friendlist
    const [frl2, setfrl2] = useState([]);//their friendlist

    //useeffects
    //fetch friendlist for me
    useEffect(()=>{if(mount){
        const sub = db.collection('users').doc(auth.currentUser?.email)
        sub.onSnapshot(doc=>{
            console.log('frl1 :>> ', doc.data().friendlist);
            var frarray = doc.data().friendlist || [];
            setfrl1(frarray);
        })
    }},[mount])
    //fetch friendlist for them
    useEffect(()=>{if(mount){
        const sub = db.collection('users').doc(item.email)
        sub.onSnapshot(doc=>{
            console.log('frl2 :>> ', doc.data().friendlist);
            var frarray2 = doc.data().friendlist || [];
            setfrl2(frarray2);
        })
    }},[mount])
    //function
    function handleReject(){
        //delete friend request
        db.collection('friendrequests').doc(item.email+auth.currentUser?.email)
        .delete();
        db.collection('friendrequests').doc(auth.currentUser?.email+item.email)
        .delete();
    }
    function handleAccept(){
        console.log('accepting request')
        //add a to friendlist of user b
        var frlist1 = frl1 || []
        frlist1.push(item.email)
        db.collection('users').doc(auth.currentUser?.email)
            .update({
                friendlist: frlist1
            });  
        //add b to friendlist of user a
        var frlist2 = frl2 || []
        frlist2.push(auth.currentUser?.email)
        db.collection('users').doc(item.email)
        .update({
            friendlist: frlist2
        });
        //delete friend request
        db.collection('friendrequests').doc(item.email+auth.currentUser?.email)
        .delete();
        db.collection('friendrequests').doc(auth.currentUser?.email+item.email)
        .delete();
    }
    return (
        <View style={ss.fritem}>
            <View style={ss.player}>
                <Player   
                    item={{
                        email: item.email,
                        fname: item.fname,
                        ishost: false,
                    }}
                />
            </View>
            {/* buttons */}
            <View style={ss.responses}>
                {/* reject */}
                <Pressable 
                    style={ss.reject}
                    onPress={handleReject}
                >
                    <Text style={ss.responseText}>REJECT</Text>
                </Pressable>
                {/* Accept */}
                <Pressable 
                    style={ss.accept}
                    onPress={handleAccept}
                >
                    <Text style={ss.responseText}>ACCEPT</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default function FriendList() {
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    })
    //variable
    const navigation = useNavigation();
    const route = useRoute();
    const userid = route.params?.email || auth.currentUser?.email;

    //state
    const [mount, setMount] = useState(true);
    const [friendrequests, setFriendRequests] = useState([]);
    const [fetchingfr, setFetchingfr] = useState(true)
    const [requests, setRequests] = useState()
    const [requestsFetched, setrequestsFetched] = useState(false)
    const [friendlist, setFriendlist] = useState();
    const [friends, setFriends] = useState();

    // functions
    const handleReject = ()=>{
        console.log('rejected')
    };
    const handleAccept = ()=>{
        console.log('accepted')
    };
    //useeffects
    //fetch friend requests
    useEffect(()=>{if(mount){
        const sub = db.collection('friendrequests').where('receiver','==',auth.currentUser?.email)
        sub.onSnapshot(ss=>{
            var requestArray = ss.docs?.map(doc=>{
                return {...doc.data(), id:doc.id}
            })
            setFriendRequests(requestArray)
        })
    }},[mount])
    //fetch users projile from requests
    useEffect(()=>{
        console.log('loading requests')
        var users = [];
        friendrequests.forEach(req=>{
            db.collection('users').doc(req.sender)
            .get().then((doc)=>{
                users.push({...doc.data(), id: doc.id})
                console.log('fetched users requests');
            }).catch((err)=>{
                console.error(err);
            }).then(()=>{
                console.log('request complete');
                setRequests(users);
                setrequestsFetched(true);
            })

        })
    },[friendrequests])
    //fetch friend list email
    useEffect(()=>{
        const sub = db.collection('users').doc(auth.currentUser?.email)
        sub.onSnapshot(doc=>{
            // console.log('doc.data().friendlist :>> ', doc.data().friendlist);
            var data = doc.data().friendlist;
            setFriendlist(data);
        })
    },[])
    useEffect(()=>{if(friendlist){
        console.log('friendlist :>> ', friendlist);
        var frnd = []
        friendlist.forEach(email =>{
            db.collection('users').doc(email)
            .get().then(doc=>{
                if(doc.exists){
                    frnd.push(doc.data());
                    setFriends(frnd)
                }
            })
        })        
    }},[friendlist])
    return(
        <SafeAreaView style={ss.container}>
            {/* header */}
            <View style={ss.header}>
                {/* back button */}
                <Pressable style={ss.backbtn} onPress={navigation.goBack}>
                    <Image 
                        source={require('../assets/BackBtn.png')}
                    />
                </Pressable>
                {/* Friendlist title */}
                <Text style={ss.headerText}>FRIENDLIST</Text>
                <View style={ss.empty}></View>
            </View>
            <ScrollView>
                {/* Friend request section */}
                {requests?.length ? <View style={ss.frsection}>
                    {/* Friend request title */}
                    <Text style={ss.frtitle}>Friend Requests</Text>
                    {/* Friend request list */}
                    <ScrollView horizontal={true} style={ss.hor}>
                        <FlatList 
                            style={ss.frlist}
                            data={requests}
                            renderItem={({item})=>( 
                                <FriendRequest actions={{handleReject: handleReject, handleAccept: handleAccept}} item={item} />
                            )}
                        />
                    </ScrollView>
                    {/* <FriendRequest actions={{handleReject: handleReject, handleAccept: handleAccept}} item={friendrequests} /> */}
                </View>: null}
                {/* Friend list section */}
                <View style={ss.flsection}>
                    <Text style={ss.fltitle}>Friend List</Text>
                    {/* Friend list item */}
                    <ScrollView horizontal={true} style={ss.frlist}>
                        <FlatList                         
                            style={ss.frlist}
                            data={friends}
                            renderItem={({item})=>(
                                <Player item={{
                                    email: item.email,
                                    fname: item.fname,
                                    ishost: false,
                                }}/>  
                            )}
                        />                    
                    </ScrollView>
                </View> 
            </ScrollView>
        </SafeAreaView>
    )
}
const ss = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backbtn:{
        flex: 1,
    },
    headerText:{
        flex:4,
        fontSize: 8*3,
        fontWeight: 100*7,
        color: Colors.PrimaryGreen,
        // backgroundColor:'white',
        textAlign: 'center',
    },
    empty: {
        flex:1,
    },
    flsection:{
        paddingLeft: 10,
        paddingRight:20,
    },
    fltitle: {
        fontSize: 8*3,
        color: 'white',
        marginBottom: 8*1
    },
    frsection:{
        padding:10,
    },
    frtitle: {
        fontSize: 8*3,
        color: 'white',
        marginBottom: 8*2
    },
    fritem:{
        flexDirection: 'row',
        backgroundColor:'white',
        width: '100%',
        borderRadius: 20,
        height: 80,
        marginBottom: 20,
    },
    player:{
        flex:1,
    },
    responses:{
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8*1,        
    },
    responseText:{
        fontSize:8*1.5,
        fontWeight: 100*6,
        color: 'white',
    },
    reject:{
        width:8*8,
        height:8*4,
        backgroundColor: 'red',
        borderRadius: 8*1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accept:{
        width:8*8,
        height:8*4,
        backgroundColor: Colors.PrimaryGreen,
        borderRadius: 8*1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hor:{
    },
    frlist:{
        width: screen.width-20
    }
})