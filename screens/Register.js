import React, { useLayoutEffect, useState } from 'react';
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
import { FIREBASE_DB, auth, db } from '../FirebaseConfig';


export default function Signup({navigation}){

  const [fname, setFname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isChecked, setChecked] = useState(false);

  var handleSignUp = () => {
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