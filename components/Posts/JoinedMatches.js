import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { View } from 'react-native';
import Post from './Post';
import { auth, db } from '../../FirebaseConfig';


export default function JoinedMatches(){

    const [posts, setPosts] = useState([])
    const [players, setPlayers] =useState([]);
    const [mount, setMount] = useState(true);


    useEffect(() => {if(mount)
        console.log('loading pids')
        db.collection('players')
        .where('userid','==',auth.currentUser?.email).get()
        .then(snapshot => {
            var players =[]
            snapshot.forEach(doc => {
                players.push({...doc.data(),pid: doc.id})
            });
            setPlayers(players);
        });
    }, [mount]);
    
    useEffect(() => {if(players){console.log('loading posts...')
        var post=[];
        players.map(player => {
            // console.log('player.postid :>> ', player?.postid);
            db.collection('posts').doc(player.postid)
            .get().then(doc=>{
                post.push({...doc.data(), pid: doc.id});
                setPosts(post)
            })
            .catch(err=>{
                console.error(err);
            })
        })        
    }},[players])
    


    return (
        <View style={{padding: 10}}>
            <Text style={ss.Header}>Joined Posts</Text>
            <FlatList
                data={posts}
                horizontal={true}
                renderItem={({item}) => (
                    <Post item={item}/>
                )}
            />
        </View>
    )
}

const ss = {
    Header: {
        color: 'white',
        fontSize: 8*2.5,
        marginBottom:8*2
    }
}


/*


*/