import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Post from './Post';
import { db } from '../../FirebaseConfig';

export default function RecommendedPosts(){
    const [posts, setPosts] = useState()

    useEffect(() => {
        db.collection('posts').limit(3).get()
        .then(snapshot => {
            var post = []
            snapshot.forEach(doc => {
                const p = doc.data()
                p.pid = doc.id
                post.push(p)
            });  
            setPosts(post)
        });
        return () => {
        };
    }, []);
        
    return (
        <View style={{padding: 10}}>
            <Text>Recommended Posts</Text>
            <FlatList
                data={posts}
                renderItem={({item}) => (
                    <Post item={item}/>
                )}
            />
        </View>
    )

}

