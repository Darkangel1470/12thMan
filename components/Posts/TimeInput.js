import React, { useState } from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from '../../styles/Colors';


function DInput({post, setPost}){

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    console.log("post.dateTime :>> " , post.dateTime);
    console.log('post.dateTime :>> ', post.dateTime.getHours());
    const handleConfirm = (date)=>{
        setPost({
            player: post.player,
            dateTime: date,
            location: post.location
        })
        setDatePickerVisibility(false)
    }

    return (
        <View style={dtss.date}>
            {/* Date logo */} 
            <Image 
                style={dtss.icon} 
                source = {require("../../assets/Images/Post/DateIcon.png")}
            />
            {/* Date Picker */} 
            <Pressable onPress={() => setDatePickerVisibility(true)} style={dtss.input}>
                <Text style={dtss.text} >{post.dateTime.getDate()+"/"+post.dateTime.getMonth()+"/"+post.dateTime.getFullYear()}</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={()=>{setDatePickerVisibility(false)}}
            />
        </View>
    )
}

function TInput({post, setPost}){
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    console.log("post.dateTime :>> " , post.dateTime);
    console.log('post.dateTime :>> ', post.dateTime.getHours());
    const handleConfirm = (date)=>{
        setPost({
            player: post.player,
            dateTime: date,
            location: post.location
        })
        setDatePickerVisibility(false)
    }
    var isPast12 = post.dateTime.getHours() > 12;
    var hour = (isPast12) ? post.dateTime.getHours()-12 : post.dateTime.getHours();
    var mins = post.dateTime.getMinutes();
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
            <Pressable onPress={() => setDatePickerVisibility(true)} style={dtss.input}>
                <Text style={dtss.text} >{hour+":"+mins+" "+AmPm}</Text>
            </Pressable>
            <DateTimePickerModal isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={()=>{setDatePickerVisibility(false)}}
            />
        </View>
    )
}
export default function TimeInput({ post, setPost}){
    return (
        <View style={dtss.dtcontainer}>
            {/* Date container */}
            <DInput post={post} setPost={setPost}/>
            {/* Time container */}
            <TInput  post={post} setPost={setPost}/>
        </View>
    )
}
const dtss= StyleSheet.create({
    dtcontainer:{
        position: 'absolute',
        width:'100%',
        alignItems: "center",
        color:'white',
        paddingTop: 150,
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
