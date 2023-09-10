import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { screen } from '../../styles/SafeViewAndroid';
import Colors from '../../styles/Colors';
import { auth } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

function Option({label, onpress}){
    return (
        
        <Pressable style={ss.Option} onPress={onpress}>
            <Text>{label}</Text>
        </Pressable>
    )
}
export default function Settings(){

    const navigation = useNavigation()


    const handleEdit = () => {}
    const handleLogout = () => {
        auth.signOut();
        navigation.navigate('login')
        
    }
    return (
        <View style={ss.Shadow}>
            <View style={ss.Container}>
                <Option label={"Edit Profile"} onpress={handleEdit}/>
                <Option label={"Logout"} onpress={handleLogout}/>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    Shadow:{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: screen.width,
        height: screen.height,
    },
    Container: {

        alignSelf: 'flex-end',
        backgroundColor: Colors.PrimaryBlack,
        height: screen.height,
        width: screen.width*0.7,
        padding:10,
    },
    Option:{
        backgroundColor: Colors.AccentWhite,
        marginBottom: 10,
        padding:8*2,
        borderRadius:8*1,
    }
})