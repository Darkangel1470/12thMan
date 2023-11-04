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
import Profile from './screens/Profile';
import Club from './screens/Club';
import CreateClub from './screens/CreateClub';
import ClubDetails from './screens/ClubDetails';
import Chat from './screens/Chat';
import PersonalChat from './screens/PersonalChat';
import MapInput from './components/Posts/MapInput';
import FriendList from './screens/FriendList';
import Search from './screens/Search';

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
        <Stack.Screen name="profile" component={Profile}  />
        <Stack.Screen name="club" component={Club}  />
        <Stack.Screen name="createclub" component={CreateClub}  />
        <Stack.Screen name="clubdetails" component={ClubDetails}  />
        <Stack.Screen name="chat" component={Chat}  />
        <Stack.Screen name="personalchat" component={PersonalChat}  />
        <Stack.Screen name="mapinput" component={MapInput}  />
        <Stack.Screen name="friendlist" component={FriendList}  />
        <Stack.Screen name="search" component={Search}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//style takes a json but stylesheet.create creates an validate object + they may be more optimized
const Colors = StyleSheet.create({
  SecondaryGray: "#D9D9D9",
  PrimaryGray: "#B3B3B3",
})






