import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screen } from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';
import ScorePost from '../components/Profile/ScorePost';
import NavTab from '../components/NavTab comp/NavTab';
import { TouchableWithoutFeedback } from 'react-native';
import { auth, db } from '../FirebaseConfig';
import Settings from '../components/Profile/Settings';


function Stats({pids, hpids}){

    //States
    const [mounted, setMounted]= useState(true);
    const [matches, setMatches] = useState(pids.length);
    const [friends, setFriends] = useState(hpids.length);
    const [hosted, setHosted] = useState(2);

    //components
    const Stat = ({number, label})=>{
        return (
            <View style={sss.stat}>
                {/* number */}
                <Text style={sss.number}>{number}</Text>
                {/* label */}
                <Text style={sss.label}>{label}</Text>
            </View>
        )
    }

    //Auto compute
    useEffect(() => {if(mounted){

    }},[mounted]);
    return (
        <View style={sss.stats}>
            {/* Matches */}
            <Stat number={matches} label={'Matches'}/>
            {/* Friends */}
            <Stat number={friends} label={'Friends'}/>
            {/* Hosted */}
            <Stat number={hosted} label={'Hosted'}/>
        </View>
    )
}
export default function Profile(){
    //variables
    const navigation = useNavigation()
    const route = useRoute()
    const userid = route.params?.email || auth.currentUser?.email;

    //states
    const [showSettings, setShowSettings] = useState(false);
    const [profile, setProfile] = useState();
    const [pids, setPids] = useState();
    const [hpids, setHpids] = useState();
    const [posts, setPosts] = useState();
    const [mount, setMount] = useState(true);
    const [postFetched, setPostFetched] = useState(false)
    const [isMyProfile, setIsMyProfile] = useState(true)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })
    //function
    function fetchUserData(){
        // console.log('userid ||  :>> ', route.params.userid );
        db.collection('users').doc(userid)
        .get().then(doc=>{
            // console.log('profile data :>> ', doc.data());
            setProfile(doc.data())
        })
    }
    function fetchPids(){
        var postids = [];
        db.collection('players').where('userid','==',userid)
        .get().then(ss=>{
            ss.forEach(doc=>{
                // console.log('players :>> ', doc.data());
                postids.push(doc.data().postid)
            })
            // console.log('postids :>> ', postids);
            setPids(postids);
        })
    }
    function fetchPost(){
        var postArr = []
        var hostedPost = []
        pids.forEach(pid=>{
            db.collection('posts').doc(pid).get().then(doc=>{
                if(doc.exists){
                    if(doc.data().hosted==auth.currentUser?.email){
                        hostedPost.push(doc.id);
                    }
                    postArr.push({...doc.data(), pid: pid})
                }
                // console.log('postArr :>> ', postArr);
                setPosts(postArr);
                setHpids(hostedPost);
            })
        })
    }
    function checkMyPage(){
        if(userid!=auth.currentUser?.email){
            setIsMyProfile(false);
        }
    }
    
    //automated functions
    useEffect(()=>{if(mount){
        fetchUserData();
        fetchPids();
        checkMyPage();
    }},[mount])

    //run after fetching pids
    useEffect(()=>{if(pids){
        // console.log('pids :>> ', pids);
        fetchPost()
    }},[pids])

    //run after fetching post data
    useEffect(()=>{if(posts){
        setPostFetched(true);

    }},[posts]);

    // functions
    const handleSettings = ()=>{
        setShowSettings(true);
    }
    const handleAddFriend = ()=>{}
    const handleMessage = () =>{    
        navigation.navigate('personalchat',{
            userid: userid
        })

    }
    return (  
        <SafeAreaView >
            <ScrollView style={ss.Container}>
                {/* Bio part */}
                <View style={ss.BioContainer}>
                    {/* Profile Image */}
                    <View style={ss.Image}>
                    </View>
                    <View style={ss.Texts} >
                        {/* Name */}
                        <Text style={ss.Name}>{profile?.fname}</Text>
                        {/* location */}
                        <Text style={ss.Location}>Mumbai</Text>
                    </View>
                </View>
                {/* state */}
                {pids && hpids &&
                    <Stats  pids={pids} hpids={hpids}/>
                }
                {/* Buttons */}
                {!isMyProfile &&
                    <View style={ss.Buttons}>
                        <Pressable 
                            style={ss.addFriend}
                            onPress={handleAddFriend}
                        >
                            <Text style={ss.addText}>Add friend</Text>
                        </Pressable>
                        <Pressable 
                            style={ss.message}
                            onPress={handleMessage}
                        >
                            <Text style={ss.messageText}>Message</Text>
                        </Pressable>
                    </View>
                }
                {/* Settings icon */}
                <View style={ss.Settings}>                         
                    <TouchableWithoutFeedback
                        onPress={handleSettings}
                    >
                        <Image
                            style={ss.SettingsIcon}
                            source={require('../assets/Images/Profile/SettingsIcon.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
                {/* body */}
                <View style={ss.PostContainer}>
                    {/* matches played */}
                    <FlatList                    
                        data={posts}
                        renderItem={({item})=>(
                            <ScorePost item={item} />
                        )}
                    />
                </View>
                {/* nav Tab */}
            </ScrollView>
            {/* <View style={ss.NavTabContainer}> */}
                <NavTab />
            {/* </View> */}
            {/* SettingsPanel */}
            {showSettings
                ?<View style={ss.SettingsContainer}>
                    <Settings />
                </View>
                :null}
        </SafeAreaView>
    )
}
const sss = StyleSheet.create({
    stats: {
        flexDirection: 'row',
        marginBottom: 8*2,
    },
    stat:{
        flex: 1,
        alignItems: 'center',
    },
    number:{
        fontSize:8*2,
        fontWeight: 100*9,
    },
    label:{
        fontSize: 8*2,
        fontWeight: 100*7
    },
})
const ss = StyleSheet.create({
    Container:{
        height: '100%',
        width: screen.width,
    },
    Image:{
        backgroundColor: 'gray',
        height: 8*15,
        width: 8*15,
        borderRadius: 8*100
    },
    BioContainer:{
        alignItems:'center',
        paddingTop: 8*10,
        marginBottom: 8*2,
    },
    Texts:{
        marginTop:8*3,
    },
    Name:{
        alignSelf: 'center',
        fontSize: 8*3,
        fontWeight: 'bold',
    },
    Location:{
        alignSelf:'center',
        fontSize: 8*2,
        color: "rgba(0, 0, 0, 0.4)"
    },
    PostContainer:{
        backgroundColor: Colors.PrimaryBlack,
        minHeight: 8*50,
        borderTopLeftRadius:8*5,
        borderTopRightRadius:8*5,
        paddingTop:8*3,
        paddingLeft: 8*2,
        paddingRight: 8*2,
        paddingBottom: 80,
    },
    Settings:{
        position: 'absolute',
        top:8*1,
        right:8*1,
    },
    SettingsContainer:{
        position: 'absolute',
        right: 0,
        top: 40,
    },
    SettingsIcon:{

    },
    Buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    addFriend:{
        backgroundColor: Colors.LightBlue,
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 8/2,
        marginBottom: 8,
        marginRight: 8*2,
        alignItems: 'center',
        width: 8*20,
    },
    message:{
        backgroundColor: Colors.SecondaryGray,
        padding: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 8/2,
        marginBottom: 8,
        alignItems: 'center',
        width: 8*20,
    },
    addText:{
        color: Colors.AccentWhite,
        fontSize: 8*2,
        fontWeight: 100*9,
    },
    messageText:{
        fontSize: 8*2,
        fontWeight: 100*9,
        
    }



})