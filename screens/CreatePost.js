import React, { useLayoutEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import FormButton from '../components/Form/FormButton';
import Colors from '../styles/Colors';
import PostInput from '../components/Posts/PostInput';
import PostPrompt from '../components/Posts/PostPrompt';
import { useNavigation } from '@react-navigation/native';
import SafeViewAndroid from '../styles/SafeViewAndroid';
import { auth, db } from '../FirebaseConfig';

export default function CreatePost(){

    const [page, setPage] = useState(0)

    const [post,setPost] = useState({
        player: 3,
        dateTime: new Date(),
        location: ''
    })

    const createPost =()=>{
        console.log("creating post: ",post)
        db.collection('posts').add({
            player: post.player,
            DateTime: post.dateTime,
            location: post.location,
            timestamp: new Date(),
            hostid: auth.currentUser?.email
        })
    }

    const handleNext = () => {
        setPage(page+1)
        console.log('page :>> ', page);
        console.log('post :>> ', post);
        if(page==2){
            createPost()
            navigation.navigate("home")
            setPage(0)
        }
    };
    const handleBack = () => {
        setPage(page-1)
        console.log('page :>> ', page);
        console.log('post :>> ', post);
        if(page==0){
            setPage(0)
            navigation.navigate('home')
        }
    }

    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerShown:false
        })
    },[])
    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>

            <View style={ss.container}>
                {/* Prompt text */}
                <PostPrompt page={page} />
                {/* Input section */}
                <PostInput page={page} post={post} setPost={setPost}/>

                {/* Navigation button*/}
                <View style={ss.buttonGroup}>
                    <View style={ss.backBtn}>
                        <FormButton
                            title = "<"
                            type = "Secondary"
                            onpress={handleBack}
                        />
                    </View>
                    <View style={ss.nextBtn}>
                        <FormButton
                            title = "Next"
                            type = "Primary"
                            onpress={handleNext}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
const ss = StyleSheet.create({
    container:{
        backgroundColor: Colors.PrimaryBlack,
        height: "100%",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    prompt:{
        color: 'white'
    },
    buttonGroup:{
        position: "absolute",
        bottom: 30,
        flexDirection: "row",
        width:"100%",
        alignSelf:'center',
        paddingLeft:20,
        paddingRight:20,
        
    },
    backBtn:{
        flex:0.2,
        marginRight:30,
    },
    nextBtn:{
        flex:1,
    },
})