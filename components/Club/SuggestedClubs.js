import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import Divider from '../Divider';
import ClubListItem from './ClubListItem';
import { db } from '../../FirebaseConfig';
export default function SuggestedClubs(){
    const [clubs, setClubs] = useState()
    useEffect(() =>{
        db.collection("clubs")
        .get().then((clubs)=>{
            var list = []
            clubs.forEach((club=>{
                list.push({...club.data(),clubid: club.id})
            }))
            // console.log('listr :>> ', list);
            setClubs(list)
            // console.log('clubs :>> ', clubs);
        }).catch(err => console.error(err));
    },[])
    return (
        <View style={ss.container}>
            {/* Header */}
            <Text style={ss.header}>SUGGESTED</Text>
            {/* table header */}
            {/* Line */}
            <View style={ss.divider}>
                <Divider />
            </View>
            {/* club list */}
            <FlatList
                data={clubs}
                renderItem={({item})=>(
                    <ClubListItem item={item} />
                )}           
                style={ss.clublist}     
            />
            {/* line */}
            <View style={ss.divider}>
                <Divider />
            </View>
        </View>
    )
}
const ss = StyleSheet.create({
    container: {
        flex: 0.89
    },
    header: {
        color: 'white',
        fontSize: 8*3,
        fontWeight: 'bold',
    },
    divider: {
        height: 3,
        width: "100%",
    },
    clublist:{
        paddingTop: 4,
        paddingBottom: 4,
    }
})