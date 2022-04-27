import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useFormikContext} from 'formik';

import ErrorMessages from './ErrorMessages';

function CompilingErrors({icon, name, ...otherProps}) {
    const { handleChange, errors, touched } = useFormikContext();
    return (
        <>
            <View style = {styles.container} >
                <MaterialCommunityIcons 
                    name = {icon}
                    size = {20} 
                    color = "#191970"
                />
                <TextInput 
                    style = {styles.text}
                    multiline = {false}
                    onChangeText = { handleChange(name) }
                    {...otherProps}
                />
            </View>
            <ErrorMessages error = {errors[name]} visible = {touched[name]} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "70%",
        height: "6%",
        borderRadius: 30,
        margin: 6,
        alignItems: "center",
        paddingLeft: 12,
        padding: 10,
        paddingRight: "8%"
    },
    text: {
        paddingLeft: 30,
        fontSize: 17
    }
})

export default CompilingErrors;
