import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../styles/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/Search/SearchBar';
import { db } from '../FirebaseConfig';
import Post from '../components/Posts/Post';
import FilterOptions from '../components/Search/FilterOptions';

export default function Search(){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    })
    //variables
    const navigation = useNavigation()

    //States
    const [mounted, setMounted] = useState(true);
    const [search, setSearch] = useState("");
    const [postList, setPostList] = useState([])
    const [filtersVisible, setFiltersVisible] = useState(true);
    
    const [timeFilterSet, SetTimeFilterSet] = useState(false)
    const [startTime,setStartTime] = useState(new Date())
    const [endTime,setEndTime] = useState(new Date());
    const [playerFilterSet, setPlayerFilterSet] = useState(false);
    const [playerFilter, setPlayerFilter] = useState(0);

    //function
    function fetchPost(){
        var sub = db.collection('posts').orderBy('DateTime')
        if(playerFilterSet){
            sub = sub.where('player','==',playerFilter)
        }
        if(timeFilterSet){
            // sub = sub.where('DateTime','<',startTime)
        }
        sub.onSnapshot(ss=>{
            var postArray = ss.docs.map(doc => {
                    return {...doc.data(),pid: doc.id};
                }
            )
            console.log('postArray :>> ', postArray);
            setPostList(postArray);
            console.log('postList :>> ', postList);
        })
    }
    function handleFilter(){
        setFiltersVisible(true);
    }
    function handleReset(){
        console.log('reseting filterrs')

        setPlayerFilterSet(false);
        setPlayerFilter(0)

        SetTimeFilterSet(false)
        setStartTime(new Date());
        setEndTime(new Date());

    }
    //useEffects
    useEffect(() => {
        fetchPost()
    },[mounted,playerFilter,startTime,endTime]);

    return (
        <SafeAreaView style={ss.Container}>
            {/* search bar */}
            
                {/* Search icon */}
                {/* Input */}
                {/* Filter button */}
                <SearchBar search={search} setSearch={setSearch} handleFilter={handleFilter}/>
            {/* Post list */}
                <ScrollView horizontal={true} style={ss.postContainer}>
                    <FlatList 
                        data={postList}
                        renderItem={({item})=>( 
                            <View style={{marginLeft: 20}}>
                                <Post item={item}/>
                            </View>
                        )}
                    />
                </ScrollView>
            {/* Filter options */}
            {filtersVisible && 
                <FilterOptions
                    visibility={{filtersVisible: filtersVisible, setFiltersVisible:setFiltersVisible}}
                    timeFilterSet={timeFilterSet} SetTimeFilterSet={SetTimeFilterSet}
                    startTime={startTime} setStartTime={setStartTime}
                    endTime={endTime} setEndTime={setEndTime}
                    playerFilterSet={playerFilterSet} setPlayerFilterSet={setPlayerFilterSet}
                    playerFilter={playerFilter} setPlayerFilter={setPlayerFilter}
                    handleReset={handleReset}
                />}
        </SafeAreaView>
    )
}
const ss = StyleSheet.create({
    Container: {
        height: '100%',
        width: '100%',
        backgroundColor: Colors.PrimaryBlack,
        paddingTop: 8*2,
        
    },
    postContainer:{
        paddingTop: 8*2,
    }
})