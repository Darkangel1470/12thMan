import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import Font from "../../styles/Font";
import { useNavigation } from '@react-navigation/native';
import JoinPost from "./JoinPost";

export default function Post({item}){
    var player,day,hour,min,location,joined;
    player = item.player
    location = item.location
    var dt = new Date(item.DateTime.seconds*1000)
    const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    day = days[dt.getDay()]
    hour = dt.getHours()
    min = dt.getMinutes()
    min = min>9? min: "0"+min;
    console.log('item.id :>> ', item.pid);
    const navigation = useNavigation()
    const handleJoin = () => {
        navigation.navigate('postdetails',{ pid: item.pid})
    }
    return (
        <View style={ss.Post}>
            {/* Upper half */}
            <View style={ss.UpperHalf}>
                {/* How many */}
                <View style={ss.Who}>
                    <Text style={ss.TextWhite}>Players</Text>
                    <Text style={ss.TextWhite}>{player}v{player}</Text>
                </View>
                {/* when */}
                <View style={ss.When}>
                    <Text style={ss.TextWhite}>{day} </Text>
                    <Text style={ss.TextWhite}>{hour}:{min}</Text>
                </View>
                {/* Where */}
                <View style={ss.Where}>
                    <Text style={ss.TextWhite}>Turf</Text>
                    <Text style={ss.TextWhite}>{location}</Text>
                </View>
            </View>

            {/* Lower half */}
            <View style={ss.LowerHalf}>
                {/* club logo */}
                <View style={ss.Logo}>
                    {/* <Image
                        source={require("../../assets/team1.jpg")}
                    /> */}
                    <Text>logo - logo</Text>
                </View>

                {/* Join button */}
                <JoinPost handleJoin={handleJoin} player={player}/>
            </View>
        </View>
     )
}

const ss = StyleSheet.create({
    Post:{
        backgroundColor: "white",
        borderRadius: 30,
        height:220,
        marginBottom: 10,
    },
    UpperHalf: {
        flex:1,
        backgroundColor: "#00499F",
        flexDirection: "row",
        TextAlign: 'center',

        justifyContent:"space-evenly",
        
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    LowerHalf: {
        flex:1,
        flexDirection: "row",
        borderRadius: 30,
    },
    TextWhite:{
        color: "white",
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
    }
})






/*


justifyContent


alignSelf


alignContent

alignItems: Horizontally aligned Texts 

*/