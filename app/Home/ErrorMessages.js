import React from 'react';
import {StyleSheet, Text} from 'react-native';

function ErrorMessages({error, visible}) {
    if (!error || !visible) return null;
    return (
        <Text style = {styles.oops} > {error} </Text>
    );
}

const styles = StyleSheet.create({
    oops: {
        color: "red"
    }
})

export default ErrorMessages;