import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View,Image, StyleSheet, Pressable, Text } from 'react-native';
import JoinPost from '../components/Posts/JoinPost';
import SafeViewAndroid from '../styles/SafeViewAndroid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../styles/Colors';


function DetailsSection(){
    return (
        <View>
            <Text style={ds.Header}>Details</Text>
            {/* Players */}
            <Text>6v6</Text>
            {/* DT Section */}
            <View>
                {/* Date */}
                {/* Time */}
            </View>
        </View>
    )
}
function PlayersSection(){
    return (
        <View>
        <Text>Players</Text>
            <View></View>

        </View>
    )
}
function LocationSection(){
    return (
        <View>

        </View>
    )
}

export default function PostDetails({}){
    const route = useRoute()
    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
          headerShown:false
        })
    },[])
    console.log('pid :>> ', route.params.pid);
    const handleJoin = ()=>{

    }
    var player = 3;
    return (
        <SafeAreaView 
            // style={SafeViewAndroid.AndroidSafeArea}
            style={{backgroundColor: Colors.PrimaryBlack}}
        >
            <View style={ss.container}>
                {/* turf Image */}
                <View>
                    <Image
                        style = {ss.turfImage}
                        source={require('../assets/Images/Post/TurfImage.png')}
                    />
                </View>
                {/* back button */}
                <Pressable style={ss.backbtn}>
                    <Image
                        style={ss.backImage}
                        source={require("../assets/BackBtn.png")}    
                    />
                </Pressable>
                <View style={ss.body}>
                    {/* join button */}
                    <View style={ss.joinSection}>
                        <Pressable style={ss.Join} onPress={handleJoin}>
                            <Text style={{color: Colors.SecondaryBlue}}>Join  </Text>
                            <View style={ss.JoinNum}>
                                <Text style={{color: Colors.SecondaryBlue}}> 5/{player*2} </Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* details section */}
                    <DetailsSection />
                    {/* Players section */}
                    <PlayersSection />

                    {/* Location Section */}
                    <LocationSection />
                </View>
            </View>
        </SafeAreaView>
    )
}
const ss = StyleSheet.create({
    container:{
        backgroundColor: Colors.PrimaryBlack,
    },
    turfImage:{

    },
    backbtn:{
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 15,
        width: 50,
        height: 50

    },
    backImage:{
    },
    joinSection:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        padding: 20,

    },
    Join:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 100,
        backgroundColor: Colors.PrimaryGreen,
        borderRadius: 20,
        borderWidth:1,
        borderColor: Colors.SecondaryGray,
    },
    JoinNum: {
        borderWidth:1,
        borderRadius: 10,
        borderColor: "white",
    }

})
const ds = StyleSheet.create({
    body:{
        padding: 40,
    },
    Header:{
        color: Colors.AccentWhite,
        fontSize: 25,
        fontWeight: 'bold',
    }
})
