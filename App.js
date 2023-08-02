import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';

//Screens
import OnboardingPages from './screens/OnboardingScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import CreatePost from './screens/CreatePost';
import PostDetails from './screens/PostDetails';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name="onboarding" component={OnboardingPages}  />
        <Stack.Screen name="login" component={Login}  />
        <Stack.Screen name="register" component={Register}  />
        <Stack.Screen name="home" component={Home}  />
        <Stack.Screen name="createpost" component={CreatePost}  />
        <Stack.Screen name="postdetails" component={PostDetails}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
//style takes a json but stylesheet.create creates an validate object + they may be more optimized
const Colors = StyleSheet.create({
  SecondaryGray: "#D9D9D9",
  PrimaryGray: "#B3B3B3",
})






