import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Player from './Player';
import { db } from '../../FirebaseConfig';
import { screen } from '../../styles/SafeViewAndroid';
import { ScrollView } from 'react-native';

export default function PlayersSection({pid}){
    const [players, setPlayers] = useState([])
    const [relations, setRelations] = useState([])
    const [update,setUpdate] = useState(0)
    const [showMore, setShowMore] = useState(false)
    
    const handleShowMore = () => {
        setShowMore(!showMore)
    }
    useEffect(()=>{
        db.collection('players').where('postid', '==',pid)
            .get().then(snapshot => {
                var rels = []
                snapshot.forEach(doc =>{//for each Players Post
                    rels.push(doc.data())
                })
                setRelations(rels)
            }).catch((err) => {
                console.log('err :>> ', err);
            })
        return () => {};
    },[])

    useEffect(()=>{
        var users = []
        relations.forEach(rel=>{
            db.collection('users')
            .where('email','==',rel.userid)
            .get().then(ss=>{
                ss.forEach(doc=>{
                    users.push({...doc.data(), ishost: rel.ishost})
                })
                setPlayers(users)
            })
        })
    },[relations])
    return (
        <>
            <Text style={ss.Header}>Players</Text>
            <View style={ss.Container}>
                <ScrollView horizontal={true} style={ss.hor}>
                    <FlatList 
                        data={players}
                        renderItem={({item}) =>(
                            <View style={{width: screen.width-40}}>
                                <Player key={item.email} item={item}/>
                            </View>
                        )}
                    />
                </ScrollView>
            </View>
            <Pressable style={ss.readmoreView} onPress={handleShowMore}>
                <View style={ss.readmore}>
                </View> 
            </Pressable>
        </>
    )
}

const ss = StyleSheet.create({
    Container:{
        marginTop: 30,
        flexDirection: 'column',
    },
    Header:{
        color: Colors.AccentWhite,
        fontSize: 25,
        fontWeight: 'bold',
    },
    readmoreView:{
        alignItems: 'center',
    },
    readmore:{
        backgroundColor: 'gray',
        height: 8,
        width: 8*20,
        borderRadius:8,
    },
    postlist:{
        width: screen.width-20//20 for left right padding
    }
})