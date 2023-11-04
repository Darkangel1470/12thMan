import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../../styles/Colors';
export default function LocationSection({post}){
    //variable
    const map = useRef()

    //state
    const [mounted, setMounted] = useState(true)
    const [title, setTitle] = useState("")
    const [region, setRegion] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [marker, setMarker] = useState({
        latitude:10,
        longitude: 10,
    })
    useEffect(()=>{if(post){
        var latitude = parseFloat(post.location.address.lat);
        var longitude = parseFloat(post.location.address.lon);
        setTitle(post.location.address.display_name);
        map.current.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
        })
        setMarker({
            latitude: latitude,
            longitude: longitude
        })
        console.log('typeof(latitude) :>> ', typeof(latitude));
    }},[mounted,post])
    return (
        <>
            <Text style={ss.Header}>Location</Text>
            <View style={ss.Container}>
                <Text style={ss.Location}>{title}</Text>
                <MapView 
                    pointerEvents={'none'}
                    ref={map}
                    style={ss.Map.MapView}
                    initialRegion={region}
                    pitchEnabled={false} 
                    rotateEnabled={false} 
                    zoomEnabled={false} 
                    scrollEnabled={false}
                >
                    {marker?
                    <Marker coordinate={{
                        latitude: marker.latitude,
                        longitude: marker.longitude
                        }}
                    />:null
                    }

                </MapView>
            </View>
        </>
    )
}
const ss = StyleSheet.create({
    Container:{
        marginTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 8*30,
    },
    Header:{
        color: Colors.AccentWhite,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 8*5,
    },
    Location:{
        color: 'white',
        fontSize: 8*2,
        // fontWeight: 100*4,
        backgroundColor: Colors.SecondaryBlue,
        padding: 8*2,
        borderRadius:8,
        marginBottom: 8*2,
        elevation: 10
    },
    Map:{
        MapView:{
            height: 8*40,
            width: '100%',
        }
    }
})