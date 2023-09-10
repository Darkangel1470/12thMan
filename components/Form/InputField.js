import {View, Text, TextInput, StyleSheet} from "react-native"
import Colors from "../../styles/Colors";


export default function InputField({label , state, setState}){
    return (
        <>
        
              <View style={styles.InputField} >
                <Text style={styles.InputLabel}>{label}: </Text>
                <TextInput 
                  style={styles.TextInput}
                  value={state}
                  onChangeText={text=>setState(text)}
                ></TextInput>
              </View>

        </>
    );
}


  
  
  // const Colors = StyleSheet.create({
  //   PrimaryBlack: "#001433",
  //   PrimaryGreen: "#4DFF00",
  //   SecondaryGray: "#A5ACAF",
  //   SecondaryBlue: "#245998",
  //   AccentWhite: "#FFFFFF",
  // })
  
  const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: Colors.PrimaryBlack,
      justifyContent: "center",
    },
    InputField: {
      height:72,
      width:"auto",
      backgroundColor: Colors.LightBlue,
      borderRadius:20,
      padding: 10,
      paddingLeft: 20,
    },
    InputLabel: {
      color: Colors.PrimaryBlack,
      fontSize: 8*2,
      fontWeight: 100*7,
      
  
  
    },
    TextInput: {
      color: Colors.AccentWhite
    }
  
  })