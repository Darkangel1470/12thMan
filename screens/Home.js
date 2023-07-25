import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text,SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NextPageBtn from '../components/NextPageBtn';


//custom stylesheet
import SafeViewAndroid from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';
import NavTab from '../components/NavTab comp/NavTab';
import Search from '../components/Search';
import RecommendedPosts from '../components/Posts/RecommendedPosts';
import { auth } from '../FirebaseConfig';

//custon 

export default function Home({navigation}) {



    // Remove default Header
    // const navigation = useNavigation();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])

    return (
      
  <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
    <View style={ss.Home}>
        {/* Search section */}
        <Search />

		{/* welcome user */}
		<Text>{auth.currentUser?.email}</Text>

        
        {/* 5 Recommended Match section  */}
        <RecommendedPosts/>
        {/* NavTab section */}
        <NavTab style={ss.NavTab}/>
    </View>
  </SafeAreaView>
    );
  }

  const ss = StyleSheet.create({
    Home: {
        backgroundColor: Colors.AccentWhite,
        paddingLeft:15,
        paddingRight:15,
        height: '100%',
        paddingTop: 15,
        
    },
    NavTab: {

    },
    Search: {
      
    }
  })
  



