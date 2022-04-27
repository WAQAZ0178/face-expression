import React from 'react';
import {StyleSheet, View, Platform, StatusBar} from 'react-native';

function Background( {children} ) {
    return <View style = {styles.background}>{children}</View>
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})

export default Background;