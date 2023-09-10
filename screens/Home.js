import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text,SafeAreaView, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NextPageBtn from '../components/NextPageBtn';


//custom stylesheet
import SafeViewAndroid, { screen } from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';
import NavTab from '../components/NavTab comp/NavTab';
import Search from '../components/Search';
import RecommendedPosts from '../components/Posts/RecommendedPosts';
import { auth } from '../FirebaseConfig';
import Header from '../components/Header';
import JoinedMatches from '../components/Posts/JoinedMatches';
import { useState } from 'react';

//custon 
export default function Home({navigation}) {
    // Remove default Header
    // const navigation = useNavigation();

    const [update,setUpdate] = useState(false);
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])

    function reload(){setUpdate(!reload); console.log("Reloaded")};

    useEffect(()=>{
      console.log('home loaded')
      reload();
      return () =>{}
    },[])


    return (
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={ss.Home}>
            {/* Header */}
            <Header />
            {/* welcome user */}
            {/* <Text>{auth.currentUser?.email}</Text> */}
            <ScrollView>
              {/* if joined then show joined Matches */}
              {<JoinedMatches />}
              
              {/* 5 Recommended Match section  */}
              {<RecommendedPosts/>}
            </ScrollView>

            {/* NavTab section */}
        {/* <View style={ss.NavTabContainer}> */}
          <NavTab />
        {/* </View> */}
        </View>
      </SafeAreaView>
    );
  }

  const ss = StyleSheet.create({
    Home: {
        backgroundColor: Colors.PrimaryBlack,
        // paddingLeft:15,
        // paddingRight:15,
        height: '100%',
        width: screen.width,
        paddingTop: 60,
      
        
    },
    NavTabContainer:{
        width: screen.width,
    },
    Search: {
      
    }
  })
  



