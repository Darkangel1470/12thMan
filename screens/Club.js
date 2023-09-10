import { useIsFocused, useNavigation } from '@react-navigation/native';
import Reat, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Search from '../components/Search';
import Colors from '../styles/Colors';
import { screen } from '../styles/SafeViewAndroid';
import SearchBar from '../components/Club/SearchBar';
import SuggestedClubs from '../components/Club/SuggestedClubs';
import CreateClubBtn from '../components/Club/CreateClubBtn';
import NavTab from '../components/NavTab comp/NavTab';
import { auth, db } from '../FirebaseConfig';

export default function Club(){

    //variables
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    })

    // //setters
    // useEffect(()=>{
    //     console.log('isFocused :>> ', isFocused);
    //     db.collection('clubmembers')
    //     .where('userid','==',auth.currentUser?.email)
    //     .get().then((ss)=>{
    //         ss.forEach(doc=>{
    //             if(doc.exists){
    //                 console.log('user club :>> ', doc.data());
    //                 navigation.navigate('clubdetails',{cid: doc.data().clubid})
    //             }else{
    //                 console.log('havent joined a club')
    //             }
    //         })
    //     })
    // },[isFocused])

    const handleCreate = ()=>{
        navigation.navigate('createclub')
    }

    return (
            <SafeAreaView style={ss.Container}>
                {/* Search */} 
                <SearchBar />
                {/* Suggested Club */}
                <SuggestedClubs />
                {/* Create Club */}
                <CreateClubBtn onpress={handleCreate} />
                {/* NavTab */}
                <NavTab />
            </SafeAreaView>

    )
}

const ss = StyleSheet.create({
    Container: {
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
        paddingLeft:8*2,
        paddingRight:8*2,
        paddingTop:8*2,
    }
})