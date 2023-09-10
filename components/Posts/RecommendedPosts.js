import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Post from './Post';
import { db } from '../../FirebaseConfig';

export default function RecommendedPosts(){
    //states
    const [posts, setPosts] = useState()
    const [mounted, setMounted] = useState(true)

    //auto compute
    useEffect(() => {if(mounted){

        db.collection('posts').limit(10).get()
        .then(snapshot => {
            var post = [];
            snapshot.forEach(doc => {
                post.push({...doc.data(),pid: doc.id})
            });
            setPosts(post);
        });
    }}, [mounted]);

    return (
        <View style={ss.Container}>
            <Text style={ss.Header}>Recommended Posts</Text>
            <FlatList
                data={posts}
                // horizontal={true}
                renderItem={({item}) => (
                    <Post item={item}/>
                )}
            />
        </View>
    )
}

const ss = StyleSheet.create({
    Container:{
        padding: 10,
        paddingBottom: 8*10,

    },
    Header:{
        color: 'white',
        fontSize: 8*2.5,
        marginBottom:8*2
    }
})