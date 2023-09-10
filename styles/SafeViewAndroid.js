import { StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';

//modified for android notch cameras
export default  SafeViewAndroid= StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight|| 40: 0
    }
  });

const screen = {
  height: Dimensions.get('window').height,
  width: Dimensions.get("window").width,
}

export {screen}