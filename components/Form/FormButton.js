import {Text, StyleSheet, Pressable} from "react-native"

//import custom styles
import Colors from "../../styles/Colors";



export default function FormButton({title, type, onpress}){
    //change style based on type
    btntype = (type =="Primary")?ss.PrimaryBtn:(type=="Secondary")?ss.SecondaryBtn:null;

    //return a button
    return (
        <Pressable style={[ss.button, btntype]} onPress={onpress}>
            <Text style={ss.text}>{title}</Text>
        </Pressable>
    )
}

//functional
//for register
//styling

const ss = StyleSheet.create({
    PrimaryBtn:{
        backgroundColor: Colors.PrimaryGreen,
    },
    SecondaryBtn:{
        backgroundColor: Colors.SecondaryGray,
    },  
    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 3,
      },
    text: {
        position: 'absolute',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
    },
})