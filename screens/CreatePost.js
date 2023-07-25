import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import FormButton from '../components/Form/FormButton';
import Colors from '../styles/Colors';


export default function CreatePost(){

    

    return (
        <View style={ss.container}>

            {/* Text prompt */}
            <Text style={ss.label}>How many players per team?</Text>
            {/* Input */}
            <TextInput
                style={ss.input}
            />
            {/* Navigation */}
            <View style={ss.buttonGroup}>
                <FormButton
                    style={ss.backBtn}
                    title = "<"
                    type = "Secondary"
                    onpress={() => console.log("back pressed")}
                />
                <FormButton
                    style={ss.nextBtn}
                    title = "Next"
                    type = "Primary"
                    onpress={() => console.log("next")}
                />
            </View>
        </View>
    )
}


const ss = StyleSheet.create({
    container:{
        backgroundColor: Colors.PrimaryBlack,
        height: "100%",
        width: "100%",
    },
    label:{},
    input:{},
    buttonGroup:{
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width:"100%",
        backgroundColor: "white",
        justifyContent: "space-around"
    },
    backBtn:{
        width: "20%",
    },
    nextBtn:{
        width: "80%",
    },
})