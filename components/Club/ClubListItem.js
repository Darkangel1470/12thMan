import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../styles/Colors';
import { db } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
export default function ClubListItem({item}) {
    const [members, setMembers] = useState(-1)
    useEffect(()=>{
        db.collection('clubmembers')
        .where('clubid','==', item.clubid).get().then((ss)=>{
            var num = 0;
            ss.forEach(doc=>{
                // console.log('doc :>> ', doc.data());
                num++;
            })
            setMembers(num);
            
        }).catch((err)=>{
            console.error(err);
        })
    },[])
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate("clubdetails",{
            cid: item.clubid
        });
    }
    return (
        <Pressable style={ss.container} onPress={handlePress}>
            {/* Name */}
            <Text style={ss.name}>{item?.name}</Text>
            {/* member */}
            <Text style={ss.member}>{members}/21</Text>
            {/* type */}
            <Text style={ss.type}>{item?.isOpen ? 'OPEN':"CLOSED"}</Text>
        </Pressable>
    )
}
const ss = StyleSheet.create({
    container:{
        width: '100%',
        height: 8*8,
        backgroundColor: Colors.PrimaryGray,
        borderRadius: 8*2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:8*2,
        marginBottom:8*1
    },
    name:{
        flex: 3,
        fontSize: 8*2,
        fontWeight: 'bold',
        color: Colors.AccentWhite,        
    },
    member:{
        flex:1,
        fontSize: 8*1.5,
        color: Colors.AccentWhite,
    },
    type:{
        flex:1,
        fontSize: 8*1.5,
        color: Colors.AccentWhite,
    },
})