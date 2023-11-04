import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import Post from './Post';
import { db } from '../../FirebaseConfig';
import { screen } from '../../styles/SafeViewAndroid';

export default function RecommendedPosts(){
    //states
    const [posts, setPosts] = useState()
    const [mounted, setMounted] = useState(true)

    //auto compute
    useEffect(() => {if(mounted){
        db.collection('posts')
        .orderBy('DateTime')
        // .where('DateTime','>',new Date())
        .get()
        .then(snapshot => {
            var post = [];
            snapshot.forEach(doc => {
                post.push({...doc.data(),pid: doc.id})
            });
            setPosts(post);
        }).catch(err => {
            console.error("error at recommendedPost:");
        })
    }}, [mounted]);

    return (
        <View style={ss.Container}>
            <Text style={ss.Header}>Recommended Posts</Text>
            <ScrollView horizontal={true} style={ss.hor}>
            <FlatList
                data={posts}
                style={ss.postlist}
                // horizontal={true}
                renderItem={({item}) => (
                    <Post item={item}/>
                )}
            />
            </ScrollView>
        </View>
    )
}
const ss = StyleSheet.create({
    Container:{
        padding: 20,
        paddingBottom: 8*10,
    },
    Header:{
        color: 'white',
        fontSize: 8*2.5,
        marginBottom:8*2
    },
    postlist:{
        width: screen.width-20//20 for left right padding
    }
})