import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, StyleSheet } from 'react-native';


export default function Divider() {
    return (
        <LinearGradient
          // Background Linear Gradient
            colors={['transparent', '#245998', '#245998', 'transparent']}
            locations={[0.0,0.2,0.7,1]}
            start={[0.0,0.5]}
            end={[1,0.5]}
            style={styles.divider}
        />

    )
}

const styles = StyleSheet.create({
  	divider: {
        height: "100%",
        width: "100%",
        borderRadius: 22,
        flexDirection: 'row',
}
})