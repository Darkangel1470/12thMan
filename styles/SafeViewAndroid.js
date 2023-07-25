import { StyleSheet} from 'react-native';
import { StatusBar } from 'expo-status-bar';

//modified for android notch cameras
export default  SafeViewAndroid= StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight|| 40: 0
    }
  });