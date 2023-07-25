import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, Text,SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function NextPageBtn({ navigation }){
    return (        
        <View style={styles.NextBtn}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('login')}>
            <Image source={require('../assets/Nextpage.png')} />
            </TouchableWithoutFeedback>
        </View>
    );
}

//style takes a json but stylesheet.create creates an validate object + they may be more optimized
const styles = StyleSheet.create({
    NextBtn: {
      position: "absolute",
      bottom:50,
      right:42,
    }  
  })
    