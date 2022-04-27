import React from 'react';
import {Text, ImageBackground, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import CompilingErrors from './CompilingErrors';

const validationSchema = Yup.object().shape( {
    name: Yup.string().required().max(25).label("Name"),
    tel: Yup.string().required().min(11).label("Phone no."),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
} )

function Signup({navigation}) {
    return (
        <ImageBackground
        style = {styles.background}
        source = { require ('../assets/screen.jpg') }
        >

            <Text style = {styles.welcome}> Welcome </Text>
            <Text style = {styles.text}> You need to Signup first </Text>

        <Formik
            initialValues = {{name: "", tel: "", email: "", password: ""}}
            onSubmit = { () => console.log("Submitted") }
            validationSchema = {validationSchema}
        >
            { ( {handleSubmit} ) => (
                <>
                    <CompilingErrors
                        autoCorrect = {false}
                        icon = "account-group"
                        name = "name"
                        placeholder = "Name"
                    />

                    <CompilingErrors
                        icon = "phone"
                        name = "tel"
                        maxLength = {11}
                        keyboardType = "phone-pad"
                        placeholder = "Phone Number"
                    />

                    <CompilingErrors
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        icon = "email"
                        name = "email"
                        keyboardType = "email-address"
                        placeholder = "Email"
                    />

                    <CompilingErrors
                        secureTextEntry
                        autoCapitalize = "none"
                        autoCorrect = {false}
                        icon = "key"
                        name = "password"
                        placeholder = "Password"
                    />

                    <TouchableOpacity
                        style = {styles.signup} 
                        onPress = {handleSubmit}
                    >
                        <Text style = {styles.button}> Signup </Text>
                    </TouchableOpacity>
                </>
            ) 
            }
        </Formik>

            <TouchableOpacity onPress = {() => navigation.navigate("Login")}>
                <Text style = {styles.login}> Already have an account? Login Here </Text>
            </TouchableOpacity>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        alignItems: "center",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    welcome: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#191970",
        marginTop:"10%"
    },
    text: {
        color: "#191970",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: "12%",
        marginTop: "2%"
    },
    signup: {
        width: "30%",
        height: "6%",
        backgroundColor: '#4040bf',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        margin: "5%"
    },
    button: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    login: {
        color: "#4040bf",
        textDecorationLine: 'underline',
        fontSize: 15,
        margin: "3%",
    },
})

export default Signup;