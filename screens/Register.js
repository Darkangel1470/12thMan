import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Checkbox from 'expo-checkbox';

//custom stylesheet
import SafeViewAndroid from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';

//custom components
import InputField from '../components/Form/InputField';
import FormButton from '../components/Form/FormButton';
import TitleBar from '../components/TitleBar';
import { auth, db } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


export default function Signup(){

	//variable
	const navigation = useNavigation(); 
	
	//states
    const [fname, setFname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isChecked, setChecked] = useState(false);
	
	//function
    var handleSignUp = () => {
		setEmail(email.toLowerCase())
		console.log(email+" "+password)
		auth 
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
			const user = userCredentials.user;
          console.log(user.email)
          db.collection('users').doc(email).set({
            fname: fname,
            email: email,
            password: password
          }).then(()=>{
            navigation.navigate('home')
          })
        })
        .catch(err => alert(err.message))
    }

    // Remove default Header
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user =>{
        if(user){
          navigation.navigate('home')
        }
      })
      return unsubscribe()
    },[])

    return(
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            {/* title Bar */}
            <TitleBar navigation={navigation}/>
            {/* Body */}
            <View style={styles.Body}>
                {/* Forms inputs */}
                <View style={styles.Form}>
                    <InputField 
                      label="FULLL NAME"
                      state={fname}
                      setState={setFname}
                    />
                    <InputField 
                      label="EMAIL"
                      state={email}
                      setState={setEmail}
                    />
                    <InputField 
                        label="PASSWORD"
                        state={password}
                        setState={setPassword}
                    />
                
                    {/* user consent */}
                    <View style={styles.UserConsentView}>
                        <View>
                            <Checkbox 
                              value={isChecked}
                              onValueChange={setChecked}
                            />
                        </View>
                        <Text style={{color: "white"}}>   I agree with Terms & Conditions </Text>
                    </View>
                </View>
                {/* Form Buttons */}
                <View style={styles.Buttons}>
                  <FormButton title="Register" type="Primary" onpress={handleSignUp}/>
                  <FormButton title="Login" type="Secondary" onpress={()=>{navigation.navigate('login')}}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	Body: {
		flex: 1,
		backgroundColor: Colors.PrimaryBlack,
		justifyContent: "center",
		paddingLeft: 40,
		paddingRight: 40,
	},
	Form: {
		gap: 10,
		marginBottom: 10,
	},
	Buttons:{
		gap:10,
		height:110,
	},
	UserConsentView:{
		flexDirection: 'row',
		color: Colors.AccentWhite,
		padding: 10,
	},
})
