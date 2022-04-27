import React from 'react';
import {ScrollView, View, StyleSheet, Text, ImageBackground} from 'react-native';

function Album() {
    return (
    <ImageBackground
        style = {styles.background}
        source = { require ('../../assets/screen.jpg') }
    >

    <View style = {styles.heading}>
        <Text style = {styles.top}> Harry Potter </Text>
    </View>

    <ScrollView showsVerticalScrollIndicator = {false}>
        <View style = {styles.txt}>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            
        </Text>
        </View>

    </ScrollView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
    },
    heading: {
        marginTop: "5%",
        marginBottom: "5%",
        alignItems: "center"
    },
    top: {
        color: "black",
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    txt: {
        marginTop: "5%"
    }
})

export default Album;