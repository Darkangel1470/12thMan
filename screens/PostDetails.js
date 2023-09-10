import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View,Image, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../styles/Colors';
import { auth, db } from '../FirebaseConfig';
import DetailsSection from '../components/Posts/DetailsSection';
import PlayersSection from '../components/Posts/PlayersSection';
import LocationSection from '../components/Posts/LocationSection';




export default function PostDetails({}){
    //variables
    const route = useRoute()
    const navigation = useNavigation()

    //states
    const [post, setPost] = useState()
    const [isJoined, setIsJoined] = useState(false)
    const [isHost, setIsHost] = useState(false)

    useLayoutEffect(()=>{
        navigation.setOptions({
          headerShown:false
        })
    },[])
    
    //auto compute
    useEffect(()=>{
        //getposts
        db.collection('posts').doc(route.params.pid).get()
            .then(post => {
                var p = post.data();
                p.pid = post.id
                setPost(p)
            })
        
        //get is joined and isHost
        db.collection('players')
        .where('userid','==',auth.currentUser?.email)
        .where('postid','==',route.params.pid)
        .get().then(ss=>{
            ss.forEach(doc=>{
                console.log('players :>> ', doc.data().ishost);
                setIsHost(doc.data().ishost);
                setIsJoined(true)
            })
        })
        return () => {}

    },[])

    const handleJoin = ()=>{
        //check if joined:
            db.collection('players').add({
                postid: route.params.pid,
                userid: auth.currentUser?.email,
                ishost: false,
            })
    }
    const handleLeave = () => {
        if(isHost){
            console.log('host cant leave')
        }else{
            console.log('Leaving post')
            db.collection('players')
            .where('userid','==', auth.currentUser?.email) 
            .where('postid','==', route.params.pid) 
            .get().then(ss=>{
                ss.forEach(doc=>{
                    doc.ref.delete().then(()=>{
                        setIsJoined(false);
                    })
                })
            })
        }
    }
    var player = 3;
    return (
        <SafeAreaView 
            // style={SafeViewAndroid.AndroidSafeArea}
            style={{backgroundColor: Colors.PrimaryBlack}}>
            <ScrollView>
                <View style={ss.container}>
                    {/* back button */}
                    <Pressable style={ss.backbtn} onPress={()=>{navigation.goBack()}}>
                        <Image
                            style={ss.backImage}
                            source={require("../assets/BackBtn.png")}    
                        />
                    </Pressable>
                    {/* turf Image */}
                    <View>
                        <Image
                            style = {ss.turfImage}
                            source={require('../assets/Images/Post/TurfImage.png')}
                        />
                    </View>
                    <View style={ss.body}>
                        {/* join button */}
                        {!isJoined? 
                        <View style={ss.joinSection}>
                            <Pressable style={ss.Join} onPress={handleJoin}>
                                <Text style={ss.JoinText}>Join  </Text>
                                <View style={ss.JoinNum}>
                                    <Text style={ss.Status}> 5/{player*2} </Text>
                                </View>
                            </Pressable>
                        </View> : 
                        <View style={ss.joinSection}>
                            <Pressable style={[ss.Join, ss.Leave]} onPress={handleLeave}>
                                <Text style={ss.JoinText}> Leave </Text>
                                <View style={ss.JoinNum}>
                                    <Text style={ss.Status}> 5/{player*2} </Text>
                                </View>
                            </Pressable>
                        </View> 
                        }
                        {/* details section */}
                        <DetailsSection post={post} />
                        {/* Players section */}
                        <PlayersSection pid={route.params.pid}/>
                        {/* Location Section */}
                        <LocationSection post={post} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const ss = StyleSheet.create({
    container:{
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
    },
    turfImage:{
        height: 200,

    },
    backbtn:{
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 8*2,
        width: 50,
        height: 50,
        zIndex: 1,

    },
    backImage:{
    },
    joinSection:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        // paddingRight: 10,
        borderColor: 'white',

    },
    Join:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 8*7,
        width: 8*20,
        backgroundColor: Colors.PrimaryGreen,
        borderRadius: 8*5,
        borderWidth: 1,
        borderColor: Colors.AccentWhite,
    },
    Leave:{
        backgroundColor: 'red',
    },
    JoinText:{
        color: Colors.PrimaryBlack,
        fontSize: 8*3,
        fontWeight: 'bold',
    },
    JoinNum: {
        height: 8*5,
        width: 8*6,
        borderWidth:1.5,
        borderRadius: 8*3,
        borderColor: "white",
        justifyContent: 'center',
        alignItems: 'center',

    },
    Status:{
        fontSize: 8*2,
    },
    body:{
        padding: 20,
    },
})
