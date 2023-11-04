import React, { useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../styles/Colors";
import { screen } from "../../styles/SafeViewAndroid";
import DateTimePickerModal from "react-native-modal-datetime-picker";


function DatePicker({datetime, handleDateTime, isPickerVisible, setIsPickerVisible}){
    console.log('datetime :>> ', datetime);
    return (
        <View style={ss.Time.date}>
            {/* Date logo */} 
            <Image 
                style={ss.Time.icon} 
                source = {require("../../assets/Images/Post/DateIcon.png")}
            />
            {/* Date Picker */} 
            <Pressable onPress={() => setIsPickerVisible(true)} style={ss.Time.input}>
                <Text style={ss.Time.text} >{datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear()}</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={isPickerVisible}
                isDarkModeEnabled={true}
                mode="date"
                onConfirm={handleDateTime}
                onCancel={()=>{setIsPickerVisible(false)}}
            />
        </View>
    )
}

export default function FilterOptions({
        visibility,
        timeFilterSet, SetTimeFilterSet,
        startTime,setStartTime,
        endTime,setEndTime,
        playerFilterSet, setPlayerFilterSet,
        playerFilter, setPlayerFilter,
        handleReset
    }){
    //variables

    //states
    const [isStartDate, setIsStartDate] = useState(false);
    const [isEndDate, setIsEndDate] = useState(false);

    const handleStartDate = (date)=>{
        setIsStartDate(false)
        var today = new Date()
        if(today>date){
            Alert.alert('Incorrect Time',"Time cant be past time")
        }else{
            var dt = startTime
            dt.setMonth(date.getMonth())
            dt.setDate(date.getDate())
            dt.setFullYear(date.getFullYear())
            setStartTime(dt)
            SetTimeFilterSet(true)
        }    
    }
    const handleEndDate = (date)=>{
        setIsEndDate(false)
        if(startTime>date){
            Alert.alert('Incorrect Date',"End date cant be before start date")
            setEndTime(startTime) 
        }else{
            console.log('date :>> ', date);
            var dt = endTime
            dt.setMonth(date.getMonth())
            dt.setDate(date.getDate())
            dt.setFUllYear(date.getFUllYear())
            console.log('dt :>> ', dt);
            setEndTime(dt)
            SetTimeFilterSet(true)
        }    

    }

    return (
        <Pressable style={ss.Overlay} onPress={() =>visibility.setFiltersVisible(!visibility.filtersVisible)}>

            <Pressable style={ss.Container}>
                {/* Player  */}
                <Text style={ss.Section.Header}>Players</Text>
                <View style={ss.Players.Container}> 
                    <ScrollView horizontal={true} 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 10, paddingRight: 8*2,paddingLeft: 8*2,
                    }}>
                        <Pressable style={[ss.Players.Buttons,playerFilter==0 && ss.Players.Buttonselected]} onPress={()=>{setPlayerFilterSet(false); setPlayerFilter(0)}}>
                            <Text style={ss.Players.Text}>Any</Text>
                        </Pressable>
                        <Pressable style={[ss.Players.Buttons,playerFilter==3 && ss.Players.Buttonselected]} onPress={()=>{setPlayerFilterSet(true); setPlayerFilter(3)}}>
                            <Text style={ss.Players.Text}>3v3</Text>
                        </Pressable>
                        <Pressable style={[ss.Players.Buttons,playerFilter==4 && ss.Players.Buttonselected]} onPress={()=>{setPlayerFilterSet(true); setPlayerFilter(4)}}>
                            <Text style={ss.Players.Text}>4v4</Text>
                        </Pressable>
                        <Pressable style={[ss.Players.Buttons,playerFilter==5 && ss.Players.Buttonselected]} onPress={()=>{setPlayerFilterSet(true); setPlayerFilter(5)}}>
                            <Text style={ss.Players.Text}>5v5</Text>
                        </Pressable>
                        <Pressable style={[ss.Players.Buttons,playerFilter==6 && ss.Players.Buttonselected]} onPress={()=>{setPlayerFilterSet(true); setPlayerFilter(6)}}>
                            <Text style={ss.Players.Text}>6v6</Text>
                        </Pressable>
                    </ScrollView>
                </View>
                {/* Time */}
                <Text style={ss.Section.Header}>Time Range</Text>
                <View style={ss.Time.Container}>
                    {/* start */}
                    <View style={ss.Time.Start}>
                        <Text style={ss.Time.Header}>Start</Text>
                        {/* Date */}
                        <DatePicker datetime={startTime} setdatetime={setStartTime} isPickerVisible={isStartDate} setIsPickerVisible={setIsStartDate} handleDateTime={handleStartDate}/>
                        {/* Time */}
                        {/* <TimePicker datetime={startTime} setdatetime={setStartTime} isPickerVisible={isStartTime} setIsPickerVisible={setIsStartTime} handleDateTime={handleStartTime}/> */}
                    </View>
                    
                    {/* end*/}
                    <View style={ss.Time.Start}>
                        <Text style={ss.Time.Header}>End</Text>
                        {/* Date */}
                        <DatePicker datetime={endTime} setdatetime={setEndTime} isPickerVisible={isEndDate} setIsPickerVisible={setIsEndDate} handleDateTime={handleEndDate}/>
                        {/* Time */}
                     </View>
                </View>
                <View style={ss.Time.Reset.Container}>
                    <Pressable style={ss.Time.Reset.Button} onPress={handleReset}>
                        <Text style={ss.Time.Reset.Text}>Reset</Text>
                    </Pressable>
                </View>
                {/* Location */}
                {/* <Text style={ss.Section.Header}>Location</Text> */}
                <View>

                </View>
            </Pressable>
        </Pressable>
    )
}

const ss = StyleSheet.create({
    Overlay:{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        height: screen.height,
        width: '100%',
        marginTop: 40
    },
    Container:{
        backgroundColor: 'white',
        position: 'absolute',
        flexGrow: 0,
        width: '100%',
        bottom: 0,
        left: 0 ,
        borderTopLeftRadius: 8*2,
        borderTopLeftRadius: 8*2,
    },
    Section:{
        Header:{
            fontSize: 8*2,
            fontWeight: 'bold',
            color: Colors.SecondaryBlue,
            margin:8*2,
        }
    },
    Players:{
        Container:{
            // marginLeft: 8*2,
            // marginRight: 8*2,
            flexDirection: 'row',
            gap: 8,
        },
        Buttons:{
            Padding: 8*2,
            backgroundColor: Colors.PrimaryGray,
            height: 8*5,
            width: 8*10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:8*3,
            borderWidth:1
        },
        Buttonselected:{
            backgroundColor: Colors.PrimaryGreen
        },
        Text: {
            color: 'white',
            fontSize: 8*3,

        }
    },
    Time:{
        Start:{
            flex:1,
            flexDirection: 'column',
            backgroundColor: Colors.PrimaryBlack,
            padding: 8*2,
            // alignItems: 'center',
            borderRadius: 8*3,
            
        },
        Header:{
            color: Colors.AccentWhite,
            fontSize: 8*3,

        },
        Container:{
            paddingLeft: 8*2,
            paddingRight: 8*2,
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center',
            gap:8,
        },
        icon:{
            width:30,
            height:30,
            marginRight: 8
        },
        date:{
            flexDirection: 'row',
            marginBottom: 20,
            width: 8*13,
            alignItems: 'center',
            // backgroundColor: 'blue',
        },
        time:{
            flexDirection: 'row'
        },
        text:{
            fontSize:8*2.5,
            textAlign: 'center',

        },
        input:{
            backgroundColor: 'white',
            borderRadius: 10,
            width:8*12,
            height:8*5,
            justifyContent: 'center',
        },
        Reset:{
            Container:{
                marginBottom:8*5,
                marginTop: 8*3,
                alignItems: 'center',
            },
            Button:{
                backgroundColor: Colors.LightBlue,
                height: 8*7,
                width: 8*20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8*2,
            },
            Text:{
                fontSize: 8*3,
                fontWeight: 100*7,
                color: 'white',
            }
        }
    }
})