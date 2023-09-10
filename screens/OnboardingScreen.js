import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text,SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NextPageBtn from '../components/NextPageBtn';

//custon 

export default function OnboardingPages({navigation}) {

    // Remove default Header
    // const navigation = useNavigation();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])

    return (
      
  <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
    <View style={OnboardingPage.Page1}>
      {/* Image section */}
      <View style={OnboardingPage.Image1}>
      </View>

      {/* NextBtn  */}
      <NextPageBtn navigation={navigation} />
    </View>
  </SafeAreaView>
    );
  }
  

  // Change image and text to next page
  function onpress() {
      console.log("button pressed");
    }
  // Change image and text to next page
  function Nextpage() {

  }
  // Change Image and text to previous page
  function PrevPage() {
    
  }


//modified for android notch cameras
const SafeViewAndroid= StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});
  

//style takes a json but stylesheet.create creates an validate object + they may be more optimized
const Colors = StyleSheet.create({
  SecondaryGray: "#D9D9D9",
  PrimaryGray: "#B3B3B3",
})

//style takes a json but stylesheet.create creates an validate object + they may be more optimized
const OnboardingPage = StyleSheet.create({
  SecondaryGray: "#D9D9D9",
  PrimaryGray: "#B3B3B3",
  Red: "red",

  Page1:{
    flex:1,
    backgroundColor: Colors.PrimaryGray,
    justifyContent: "center",
    alignItems: "center",
  },
  Image1: {
    flex:0.25,
    backgroundColor: Colors.SecondaryGray,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 100
  },
  NextBtn: {
    position: "absolute",
    bottom:50,
    right:42,

  }  
})
  

