import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";

export default function TheirText ({item}) {

    return (
        <View style={ss.row}>

            <Image
                source={require("../../assets/Images/Chats/FakeProfileIcon.png")}                
            />
            <View style={ss.container}>
                {/* text */}
                <Text style={ss.text}>{item.text}</Text>
                {/* time */}
                <Text style={ss.time}>10:52 pm</Text>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    row:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    container:{
        backgroundColor: Colors.SecondaryBlue,
        paddingLeft: 8*2,
        paddingRight: 8*2,
        paddingTop: 8*.5,
        paddingBottom: 8*.5,
        borderRadius: 8*1,
        borderBottomLeftRadius: 0,
        alignSelf: 'flex-start',
        marginBottom: 8*2,
        marginLeft: 8,
    },
    text: {
        color: 'white',
        alignSelf: 'flex-start',
    },
    time:{
        color: 'white',
        alignSelf: 'flex-end',
        opacity: 0.4,
    }
})