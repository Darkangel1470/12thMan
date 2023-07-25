import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import Font from "../../styles/Font";

export default function Post(){
     return (
        <View style={ss.Post}>
            {/* Upper half */}
            <View style={ss.UpperHalf}>
                {/* How many */}
                <View style={ss.Who}>
                    <Text style={ss.TextWhite}>Players</Text>
                    <Text style={ss.TextWhite}>6v6</Text>
                </View>
                {/* when */}
                <View style={ss.When}>
                    <Text style={ss.TextWhite}>FRI</Text>
                    <Text style={ss.TextWhite}>17:00</Text>
                </View>
                {/* Where */}
                <View style={ss.Where}>
                    <Text style={ss.TextWhite}>Turf</Text>
                    <Text style={ss.TextWhite}>Churchgate</Text>
                </View>
            </View>

            {/* Lower half */}
            <View style={ss.LowerHalf}>
                {/* club logo */}
                <View style={ss.Logo}>
                    {/* <Image
                        source={require("../../assets/team1.jpg")}
                    /> */}
                    <Text>logo - logo</Text>
                </View>
                {/* Join button */}
                <View style={ss.Join}>
                    <Text style={{color: Colors.SecondaryBlue}}>Join  </Text>
                    <View style={ss.JoinNum}>
                        <Text style={{color: Colors.SecondaryBlue}}> 5/12 </Text>
                    </View>
                </View>

            </View>
        </View>
     )
}

const ss = StyleSheet.create({
    Post:{
        backgroundColor: "white",
        borderRadius: 30,
        height:220
        
    },
    UpperHalf: {
        flex:1,
        backgroundColor: Colors.PrimaryBlack,
        flexDirection: "row",
        TextAlign: 'center',

        justifyContent:"space-evenly",
        
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    LowerHalf: {
        flex:1,
        flexDirection: "row",
        borderRadius: 30,
    },
    TextWhite:{
        color: "white",
    },
    Who:{
        alignItems: "center",
        justifyContent: "center",

        // backgroundColor: "gray",
        
    },
    When:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderWidth:1,
        borderColor: "white",
        marginTop:35,
        marginBottom:35,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 50,
        
        // backgroundColor: "gray",
    },
    Where:{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",

        // backgroundColor: "gray",
        
    },
    Logo:{
        justifyContent: "center",
        alignItems: "center",
        flex: 1
        
    },
    Join:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,

        backgroundColor: Colors.PrimaryGreen,
        margin:30,
        borderRadius: 20,
        borderWidth:1,
    },
    JoinNum: {
        borderWidth:1,
        borderRadius: 10,
        borderColor: "white",
    }
})






/*


justifyContent


alignSelf


alignContent

alignItems: Horizontally aligned Texts 

*/