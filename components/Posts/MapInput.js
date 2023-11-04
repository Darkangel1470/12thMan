import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../styles/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';
import { screen } from '../../styles/SafeViewAndroid';
import SearchBar from '../Form/SearchBar';
import SuggestedSearches from '../Form/SuggestedSearches';


export default function MapInput({post, setPost}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    })

    //variable
    const navigation = useNavigation();
    const map = useRef()

    //state
    const [region, setRegion] = useState({
        latitude: 18.9322,
        longitude: 72.8264,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [marker,setMarker] = useState({
        latitude: 18.9322,
        longitude: 72.8264,
    })
    const [markerPlaced, setMarketPlaced] = useState(false)
    const [search, setSearch] = useState("") 
    const [suggestedSearch, setSuggestedSearch] = useState([])
    const [location, setLocation] = useState({});

    //function
    function placeMarker(){
        console.log('region :>> ', region);
        setMarker({
            latitude: region.latitude,
            longitude: region.longitude,
        })
        setMarketPlaced(!markerPlaced)
    }
    function updateSearch(){
        if(markerPlaced) return;
        var lat = region.latitude
        var lon = region.longitude
        fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(json=>{
            // console.log('json :>> ', json.address);
            var text = json.address.neighbourhood || json.address.suburb 
            console.log('text :>> ', text);
            setLocation({address: json, title: text});
            console.log('location :>> ', location);
            setSearch(text)
            setPost({
                player: post.player,
                dateTime: post.dateTime,
                location: location
            })
        })
        .catch((err)=>{
            console.error(err);
        })
        console.log('post :>> ', post);
    }   
    function searchLocation(){
        console.log('search :>>', search,"<::");
        fetch(`https://geocode.maps.co/search?q=${search}`)
        .then(response=>response.json())
        .then(json=>{
            // console.log('json :>> ', json);
            setSuggestedSearch(json);
        }).catch(err=>{
            console.error(err);
        })
    }
    function handleSuggestPress(item){
        var latitude = parseFloat(item.lat)
        var longitude = parseFloat(item.lon)
        setSuggestedSearch([]);
        map.current.animateToRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })        
    }

    //useEffects
    useEffect(()=>{
        updateSearch()
    },[markerPlaced])

    return (        
        <View style={ss.container}>
            <MapView   
                ref={(current)=>{map.current = current}}
                style={ss.map}
                initialRegion={{
                    latitude: 18.9322,
                    longitude: 72.8264,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onRegionChange={setRegion}
                onRegionChangeComplete={updateSearch}
            >
                <Marker
                    coordinate={markerPlaced 
                                    ? marker 
                                    :{latitude: region.latitude,longitude: region.longitude}
                                }
                />
            </MapView>
            {/* overlay screen */}
            <SafeAreaView style={ss.Search.Layout}>
                <SearchBar style={ss.Search.SearchBar} search={search} setSearch={setSearch} handleSubmit={searchLocation}/>
                {suggestedSearch?.length
                ?<SuggestedSearches data={suggestedSearch} handlePress={handleSuggestPress}/>
                :null} 
            </SafeAreaView>
            <View style={ss.Marker.container}>
                <Pressable style={[ss.Marker.button, markerPlaced && ss.Marker.btnpressed]} onPress={placeMarker}>
                    <Text style={[ss.Marker.text, markerPlaced && ss.Marker.txtPressed]}>{!markerPlaced? "Set Marker":"Reset"}</Text>
                </Pressable>
            </View>
        </View>
    )
}
const ss = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBlack,
        height: '100%',
        width: '100%',
        
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
    },
    Search:{
        Layout:{
            position: 'absolute',
            top: 8*10,
            left: 0,
            // backgroundColor: 'yellow',
            width: screen.width
        },
        Container:{
            backgroundColor:"white",
            height: 8*7,
            borderRadius: 8*8,
            alignItems: 'center',
            paddingLeft:8*2,
            flexDirection: 'row',
            
        },
        input:{
            marginLeft: 8*2,
            width: "80%",
        },
        SearchBar:{
            txtinput:{
            }
        }
    },
    Marker:{
        container:{
            // backgroundColor: 'yellow',
            // width: "100%",
            height: 8*8,
            position: "absolute",
            bottom: 8*9,
            left: 8*4,
            right: 8*4,
            flexDirection: 'row', 
            gap: 10,
        },
        button:{
            backgroundColor: '#06f', 
            height: 8*6,
            borderRadius: 8,
            // borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        text:{
            fontSize: 8*2,
            fontWeight: 100*9,
            color: 'white',
        },
        btnpressed: {
            backgroundColor: 'white',
            borderColor: '#06f',
            borderWidth: 2,
        },
        txtPressed: {
            color: '#06f',
        },
        btnselect:{
            backgroundColor: '#ccc', 
            height: 8*6,
            borderRadius: 8,
            // borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        txtselect: {
            fontSize: 8*2,
            fontWeight: 100*9,
            color: '#555',
        },
        btnselectActive:{
            backgroundColor: '#06f',
        },
        txtselectActive:{
            color: 'white'
        }


    },

})

