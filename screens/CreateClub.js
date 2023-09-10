import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../styles/Colors';
import NavTab from '../components/NavTab comp/NavTab';
import Header from '../components/Header';
import InputField from '../components/Form/InputField';
import { useState } from 'react';
import CreateClubBtn from '../components/Club/CreateClubBtn';
import ClubTypeInput from '../components/Club/ClubTypeInput';
import { auth, db } from '../FirebaseConfig';

export default function CreateClub(){
    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    })
    const [name, setName] = useState()
    const [bio, setBio] = useState()
    const [isOpen, setIsOpen] = useState(true)
    
    const handleCreate = ()=>{
        //create club
        db.collection('clubs').add({
            name: name,
            bio: bio,
            isOpen: isOpen,
            captain: auth.currentUser?.email
        }).then((club)=>{
            // console.log('club.id :>> ', club.id);
            //join club
            db.collection('clubmembers').add({
                clubid: club.id,
                userid: auth.currentUser?.email,
                isCaptain: true //
            }).catch((err)=>{
                console.error(err);
            })
            db.collection('users').doc(auth.currentUser?.email)
            .update({ 
                club: club?.id,
            })
        }).catch((err)=>{
            console.error(err);
        })
        navigation.navigate('clubdetails',{cid: club.id});
    }

    return (
        <SafeAreaView style={ss.container}>
            {/* header with back btn */}
            <View style={ss.backbtn}>
                <Image 
                    source={require("../assets/Images/BackBtn2.png")}

                />
            </View>
            {/* Form */}
            <View style={ss.form}>
                {/* header  */}
                <Text style={ss.Title}>REGISTER A NEW CLUB</Text>
                {/* Name Input */}
                <InputField 
                    label="CLUB NAME"
                    state={name}
                    setState={setName}
                />
                <View style={ss.gap} />
                {/* Bio input */}
                <InputField 
                    label="CLUB BIO"
                    state={bio}
                    setState={setBio}
                />
                <View style={ss.gap} />
                {/* type input */}
                <ClubTypeInput isOpen={isOpen} setIsOpen={setIsOpen}/>
                <View style={ss.gap} />
                {/* Register Button */}
                <CreateClubBtn onpress={handleCreate}/>
            {/* Navigation */}
            </View>
            <NavTab />

        </SafeAreaView>
    )
}

const ss = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
    },
    backbtn:{
        position: 'absolute',
        top: 8*5,
        left: 8*3,
    },
    form:{
        paddingLeft:8*3,
        paddingRight:8*3,
    },
    Title:{
        color: Colors.LightBlue,
        fontSize: 8*3,
        fontWeight: 100*9,
        alignSelf: 'center',
        marginTop:8*15,
        marginBottom: 8*5
    },
    gap:{
        width: 8*4,
        height: 8*6
    }
})



/*
28th 6



*/