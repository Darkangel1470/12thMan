import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from '../../styles/Colors';

export default function MyText({item}){
    return (
        <View style={ss.container}>
            {/* text */}
            <Text style={ss.text}>{item.text}</Text>
            {/* time */}
            <Text style={ss.time}>10:52 pm</Text>

        </View>
    )
}

const ss = StyleSheet.create({
    container:{
        backgroundColor: Colors.PrimaryGray,
        paddingLeft: 8*2,
        paddingRight: 8*2,
        paddingTop: 8*.5,
        paddingBottom: 8*.5,
        borderRadius: 8*1,
        borderBottomRightRadius: 0,
        alignSelf: 'flex-end',
        marginBottom: 8*2,
        marginLeft: 8,
    

    },
    text: {
        color: 'white',
        alignSelf: 'flex-end',
    },
    time:{
        color: 'white',
        alignSelf: 'flex-end',
        opacity: 0.4,
    }
})