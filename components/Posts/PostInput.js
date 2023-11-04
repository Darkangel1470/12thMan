import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../styles/Colors';
import TimeInput from './TimeInput.js';
import NumberInput from './NumberInput';
import PlaceInput from './PlaceInput';
import MapInput from './MapInput';
// remove number please npm




export default function PostInput({page,post,setPost}){
    return (
        page==2
        ?<View style={[ss.mapContainer]}>
            <MapInput post={post} setPost={setPost} />
        </View>
        :<View style={ss.container}>
            {page==0
                ? <NumberInput post={post} setPost={setPost} />
                : page==1
                    ?<TimeInput post={post} setPost={setPost} /> 
                    :<MapInput post={post} setPost={setPost} />              
            }
        </View>
        
    )
}
const ss = StyleSheet.create({
    container:{
        backgroundColor:'white',
        
    },
    mapContainer:{
        position:'absolute',
        height: '100%',
        width: '100%',
        zIndex: -3,
    },
    NumberInput:{
        position: 'absolute',
        width:'100%',
        alignItems: "center",
        color:'white',
        paddingTop: 150,
    },
    upbtn:{
        width:100,
        backgroundColor: Colors.SecondaryGray,
        padding: 20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
        alignItems: "center",
    },
    text:{
        fontSize:20,
        fontWeight: "bold"
        
    },
    players:{
        fontSize:40,
        fontWeight: "bold",
        color: Colors.AccentWhite,
    },
    downbtn:{
        width:100,
        backgroundColor: Colors.SecondaryGray,
        padding: 20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
        alignItems: "center",
    },
})

