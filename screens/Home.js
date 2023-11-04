import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';

//custom stylesheet
import SafeViewAndroid, { screen } from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';
import NavTab from '../components/NavTab comp/NavTab';
import RecommendedPosts from '../components/Posts/RecommendedPosts';
import Header from '../components/Header';
import JoinedMatches from '../components/Posts/JoinedMatches';
import { useState } from 'react';

//custon 
export default function Home() {
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])

    // variables
    const navigation = useNavigation();

    // states
    const [update,setUpdate] = useState(false);

    // auto compute
    useEffect(()=>{
        console.log('home loaded')
    },[])
    return (
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View style={ss.Home}>
          {/* Header */}
          <Header />
          {/* welcome user */}
          <ScrollView>
            {/* if joined then show joined Matches */}
            {<JoinedMatches />}
            {/* 5 Recommended Match section  */}
            {<RecommendedPosts/>}
          </ScrollView>
          {/* NavTab section */}
          <NavTab />
        </View>
      </SafeAreaView>
    );
  }

const ss = StyleSheet.create({
	Home: {
		backgroundColor: Colors.PrimaryBlack,
		height: '100%',
		width: screen.width,
		paddingTop: 60,
	},
	NavTabContainer:{
		width: screen.width,
	}
})
