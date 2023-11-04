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


function Stats({pids, hpids, userid}){

    //variable
    const navigation = useNavigation();

    //States
    const [mounted, setMounted]= useState(true);
    const [matches, setMatches] = useState(pids.length||0);
    const [friends, setFriends] = useState(0);
    const [hosted, setHosted] = useState(hpids.length||0);

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
    useEffect(() => {if(mounted){//fetching friends
        const sub = db.collection('users').doc(userid)
        sub.onSnapshot(doc=>{
            var friendArray = []
            if(doc.data().friendlist){
                friendArray = doc.data().friendlist
            }
            setFriends(friendArray.length);
        })
    }},[mounted]);

    return (
        <View style={sss.stats}>
            {/* Matches */}
            <Stat number={matches} label={'Matches'}/>
            {/* Friends */}
            <Pressable onPress={()=> navigation.navigate('friendlist',{userid:userid})}>
                <Stat number={friends} label={'Friends'}/>
            </Pressable>
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
    // console.log('userid :>> ', userid);

    //states
    // const [userid, setUserid] = useState(route.params?.email || auth.currentUser?.email);
    const [showSettings, setShowSettings] = useState(false);
    const [profile, setProfile] = useState();
    const [pidsFetched, setPidsFetched] = useState(false);
    const [pids, setPids] = useState();
    const [dataFetched, setDataFetched] = useState(false);
    const [hpids, setHpids] = useState();
    const [posts, setPosts] = useState();
    const [mount, setMount] = useState(true);
    const [postFetched, setPostFetched] = useState(false)
    const [isMyProfile, setIsMyProfile] = useState(true)
    const [friendreqsend, setFreindreqSent] = useState(false);
    const [isFriend, setIsFriend] = useState(false)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })
    //function
    function fetchUserData(){
        db.collection('users').doc(userid).get().then(doc=>{
            setProfile(doc.data())
        })
    }
    function fetchPids(){
        var postids = [];
        const sub = db.collection('players').where('userid','==',userid)
        sub.onSnapshot(ss=>{
            var hidArray = [];
            var pidArray = ss.docs.map((doc)=>{
                if(doc.data().ishost){
                    hidArray.push(doc.data().postid)
                }
                return doc.data().postid
            })
            console.log('hidArray :>> ', hidArray);
            setHpids(hidArray.length);
            console.log('hpids :>> ', hpids);
            setPids(pidArray);
            setPostFetched(true)
        })
    }
    function fetchPost(){
        var postArr = []
        pids.forEach(pid=>{
            db.collection('posts').doc(pid).get().then(doc=>{
                if(doc.exists){
                    postArr.push({...doc.data(), pid: pid})
                }
                // console.log('postArr :>> ', postArr);
                setPosts(postArr);
            })
        })
    }
    function checkMyPage(){
        console.log('checking if my page');
        setIsMyProfile(userid==auth.currentUser?.email);
        if(userid!=auth.currentUser?.email){
            fetchFriendStatus()
        }
    }
    function fetchFriendStatus(){

        //is friend req sent
        var sender = auth.currentUser?.email;
        var receiver = userid;
        const sub = db.collection('friendrequests').doc(sender+receiver)
        sub.onSnapshot(doc =>{
            setFreindreqSent(doc.exists);
        })
        const sub2 = db.collection('users').doc(auth.currentUser?.email)
        sub2.onSnapshot(doc=>{
            var frnds = doc.data().friendlist || [];
            var isfriend = frnds.includes(userid);
            setIsFriend(frnds.includes(userid));
        })
    }
    const handleSettings = ()=>{
        setShowSettings(true);
    }
    const handleAddFriend = ()=>{
        var sender = auth.currentUser?.email;
        var receiver = userid;
        if(isFriend){
            console.log('unfriending')
            //remove user b from user a friendlist
            db.collection('users').doc(auth.currentUser?.email)
            .get().then(doc=>{
                var frnd = doc.data().friendlist;
                const index = frnd.indexOf(userid);
                if(index > -1){
                    frnd.splice(index, 1);
                }
                doc.ref.update({
                    friendlist: frnd
                })
            })
            
            //remove user a from user b friendlist
            db.collection('users').doc(userid)
            .get().then(doc=>{
                console.log('doc.data().friendlist :>> ', doc.data().friendlist);
                var frnd = doc.data().friendlist;
                const index = frnd.indexOf(auth.currentUser?.email);
                if(index > -1){
                    frnd.splice(index, 1);
                }
                doc.ref.update({
                    friendlist: frnd
                })
            })



        }else if(friendreqsend){
            console.log('unsending request ');

        }else {
            db.collection('friendrequests').doc(sender+receiver).set({
                sender: sender,
                receiver: receiver,
            })
            console.log('Friend Request sent');
        }
    }
    const handleMessage = () =>{    
        navigation.navigate('personalchat',{
            userid: userid
        })
    }
    
    //automated functions
    useEffect(()=>{if(mount){
        fetchUserData();
        fetchPids();
        checkMyPage();
    }},[mount,userid])

    //run after fetching pids
    useEffect(()=>{if(pids){
        console.log('pids :>> ', pids);
        fetchPost()
    }},[pids, userid])

    //run after fetching post data
    useEffect(()=>{if(posts){
        setPostFetched(true);
    }},[posts]);

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
                {postFetched 
                    ?<Stats  pids={pids} hpids={hpids} userid={userid}/>:null
                }
                {/* Buttons */}
                {!isMyProfile 
                    ?<View style={ss.Buttons}>
                            <Pressable 
                                style={[ss.addFriend, isFriend && ss.message]}
                                onPress={handleAddFriend}
                            >
                                {isFriend
                                    ?<Text style={ss.messageText}>Unfriend</Text>
                                    :friendreqsend
                                        ?<Text style={ss.addText}>Sent</Text>
                                        :<Text style={ss.addText}>Add friend</Text>
                                }
                            </Pressable>
                            <Pressable 
                                style={ss.message}
                                onPress={handleMessage}
                            >
                                <Text style={ss.messageText}>Message</Text>
                            </Pressable>
                        </View>
                    :null
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
                    <ScrollView horizontal={true} style={ss.hor}>
                        <FlatList 
                            data={posts}
                            style={ss.postlist}
                            renderItem={({item})=>(
                                <ScorePost item={item}/>
                            )}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
            {/* nav Tab */}
            <NavTab />
            {/* SettingsPanel */}
            {showSettings
                ?<View style={ss.SettingsContainer}>
                    <Settings />
                </View>
                :null
            }
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
        paddingLeft: 8*0,
        paddingRight: 8*0,
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
    },
    hor:{
        marginLeft: 8*2.5,
        marginRight: 8*1,
        width: screen.width-8*5,
        // backgroundColor: 'yellow',
    },
    postlist:{  
        // backgroundColor: 'pink',
        width: screen.width-8*5//20 for left right padding
    }
})