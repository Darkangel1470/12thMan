import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import Font from "../../styles/Font";
import { useNavigation } from '@react-navigation/native';
import JoinPost from "./JoinPost";
import { auth, db } from "../../FirebaseConfig";
import { screen } from "../../styles/SafeViewAndroid";

export default function Post({item}){

    //variables
    const navigation = useNavigation()
    const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    var player,day,hour,min,location,dt;
    // Process Details for presentation
    player = item.player;
    location = item.location;
    dt = new Date(item.DateTime?.seconds*1000)
    day = days[dt.getDay()];hour = dt.getHours();min = dt.getMinutes();min = min>9? min: "0"+min;

    //states
    const [mounted, setMounted] = useState(true);
    const [isJoined, setIsJoined] = useState(false)
    const [playerJoined, setPlayerJoined] = useState(0);

    // functions
    const handleJoin = () => {
        navigation.navigate('postdetails',{ pid: item.pid})
    }

    //useEffect
    useEffect(()=>{if(mounted){//fetch if player has joined
        const sub = db.collection('players').where('postid','==',item.pid).where('userid','==',auth.currentUser?.email)
        sub.onSnapshot((ss)=>{
            ss.docs.map(doc=>{
                // console.log('doc.data() :>> ', doc.data());
                setIsJoined(doc.exists);

            })
        })
    }},[mounted]);

    useEffect(()=>{if(mounted){//fetch players joined
        const sub = db.collection('players').where('postid','==',item.pid)
        sub.onSnapshot(ss=>{
            var pids = ss.docs.map(doc => doc.id);
            setPlayerJoined(pids.length);
        })
    }},[mounted]);

    return (
        <View style={ss.Post}>
            {/* Upper half */}
            <View style={ss.UpperHalf}>
                {/* How many */}
                <View style={ss.Who}>
                    <Text style={ss.TextWhite}>TEAMS</Text>
                    <Text style={ss.Whotext}>{player}v{player}</Text>
                </View>
                {/* when */}
                <View style={ss.When}>
                    <Text style={ss.Whentext}>{day} </Text>
                    <Text style={ss.TextWhite}>{hour}:{min}</Text>
                </View>
            </View>

            {/* Lower half */}
            <View style={ss.LowerHalf}>
                {/* club logo */}
                {/* Where */}
                <View style={ss.Where}>
                    <Text style={ss.TextBlack}>LOCAL</Text>
                    <Text style={ss.Wheretext}>{location?.title}</Text>
                </View>

                {/* Join button */}
                <JoinPost handleJoin={handleJoin} player={player} isJoined={isJoined} playerJoined={playerJoined}/>
            </View>
        </View>
     )
}

const ss = StyleSheet.create({
    Post:{
        backgroundColor: "white",
        borderRadius: 30,
        height: 8*25,
        marginLeft: 8*0,
        marginRight: 8*0,
        marginBottom: 8*2,
        width: screen.width-40
    },
    UpperHalf: {
        flex:1,
        backgroundColor: "#00499F",
        flexDirection: "row",
        TextAlign: 'center',

        justifyContent:"space-evenly",
        
        borderTopLeftRadius: 8*3,
        borderTopRightRadius:  8*3,
        paddingLeft: 8*2,
        paddingRight: 8*2,
    },
    LowerHalf: {
        flex:1,
        flexDirection: "row",
        borderRadius:  8*3,
    
    },
    TextWhite:{
        color: "white",
        fontSize: 8*2,
    },
    Who:{
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "gray",
    },
    When:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth:1,
        borderColor: "white",
        marginTop:35,
        marginBottom:35,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 50,
        
        // backgroundColor: "gray",
    },
    Where:{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",

        // backgroundColor: "gray",
        flex: 1,
        
    },
    Logo:{
        justifyContent: "center",
        alignItems: "center",
        flex: 1
        
    },
    Join:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,

        backgroundColor: Colors.PrimaryGreen,
        margin:30,
        borderRadius: 20,
        borderWidth:1,
    },
    JoinNum: {
        borderWidth:1,
        borderRadius: 10,
        borderColor: "white",
    },
    Whotext:{
        color: "white",
        fontSize: 8*4,
        fontWeight: 900,
        marginTop:-10,
    },
    Whentext: {
        color: "white",
        fontSize: 8*2,
        fontWeight: 900,
    },
    TextBlack:{
        color: 'black',
    },
    Wheretext:{
        color: "black",
        fontSize: 8*2.5,
        fontWeight: 900,
        marginTop:-8,
    }
})
