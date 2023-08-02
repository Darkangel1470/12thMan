import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Checkbox from 'expo-checkbox';

//custom stylesheet
import SafeViewAndroid from '../styles/SafeViewAndroid';
import Colors from '../styles/Colors';

//custom components
import InputField from '../components/Form/InputField';
import FormButton from '../components/Form/FormButton';
import TitleBar from '../components/TitleBar';
import { auth } from '../FirebaseConfig';


export default function Login({navigation}){

  const [email, setEmail] = useState('a@gmail.com')
  const [password, setPassword] = useState('123456')
  const [isChecked, setChecked] = useState(false);

	const handleLogIn = () => {
		auth
			.signInWithEmailAndPassword(email,password)
			.then(userCredentials => {
				const user = userCredentials.user;
				console.log(user.email);
        navigation.navigate('home')
			})
			.catch(err => alert(err.message));
	}

	useEffect(()=>{
		const unsubscribe = auth.onAuthStateChanged(user =>{
			if(user){
				navigation.navigate('home')
			}
		})
		return unsubscribe
	},[])

    // Remove default Header
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
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
                    <Text style={{color: "white"}}>   Keep me signed In </Text>
                  </View>
              </View>




              {/* Form Buttons */}
              <View style={styles.Buttons}>
                <FormButton title="Login" type="Primary" onpress={handleLogIn}/>
                <FormButton title="Register" type="Secondary" onpress={()=>{navigation.navigate('register')}}/>
              </View>
            </View>
        </SafeAreaView>
    );
  }
  


// 

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



/*

Make the checkbox work
placements
reduce go back logo size
signup functionality


*/