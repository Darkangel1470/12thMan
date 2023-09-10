import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

function DInput({post}){

    const date = new Date(post?.DateTime.seconds*1000);
    return (
        <View style={dtss.date}>
            {/* Date logo */} 
            <Image 
                style={dtss.icon} 
                source = {require("../../assets/Images/Post/DateIcon.png")}
            />
            {/* Date Picker */} 
            <Pressable  style={dtss.input}>
                <Text style={dtss.text} >{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
            </Pressable>
        </View>
    )
}
function TInput({post}){
    const date = new Date(post?.DateTime.seconds*1000);

    var isPast12 = date.getHours() > 12;
    var hour = (isPast12) ? date.getHours()-12 : date.getHours();
    var mins = date.getMinutes();
    mins = mins>9? mins: "0"+mins;
    var AmPm = isPast12 ? "PM": "AM";
    
    return (
        <View style={dtss.time}>
            {/* Time logo */}
            <Image 
                style={dtss.icon} 
                source = {require("../../assets/Images/Post/TimeIcon.png")}
            />
            {/* Time Picker */}
            <Pressable style={dtss.input}>
                <Text style={dtss.text} >{hour}:{mins} {AmPm}</Text>
            </Pressable>
        </View>
    )
}
export default function DetailsSection({post}){

    return (
        <>
            <Text style={ds.Header}>Details</Text>
            <View style={ds.container}>
                {/* Players */}
                <Text style={ds.Player}>{post?.player}v{post?.player}</Text>
                {/* DT Section */}                
                <View style={dtss.dtcontainer}>
                    {/* Date container */}
                    <DInput post={post} />
                    {/* Time container */}
                    <TInput  post={post} />
                </View>
            </View>
        </>
    )
}
const ds = StyleSheet.create({
    Header:{
        color: Colors.AccentWhite,
        fontSize: 25,
        fontWeight: 'bold',
    },
    container:{
        height: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Player:{
        flex:1,
        fontSize:70,
        color: 'white',
        fontWeight: 'bold',
    }
})
const dtss= StyleSheet.create({
    dtcontainer:{
        flex:1,
        width:'100%',
        alignItems: "center",
        color:'white',
    },
    icon:{
        width:35,
        height:35,
        marginRight: 10
    },
    date:{
        flexDirection: 'row',
        marginBottom: 20,
    },
    time:{
        flexDirection: 'row'
    },
    text:{
        fontSize:20,
        textAlign: 'center',
    },
    input:{
        backgroundColor: 'white',
        borderRadius: 10,
        width:120,
        height:40,
        justifyContent: 'center',
    }
})
