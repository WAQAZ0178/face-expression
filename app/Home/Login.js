import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import CompilingErrors from "./CompilingErrors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/screen.jpg")}
    >
      <Text style={styles.welcome}> Welcome </Text>
      <Text style={styles.text}> You need to Login first </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={() => console.log("Submitted")}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <>
            <CompilingErrors
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              name="email"
              keyboardType="email-address"
              placeholder="Username"
            />
            <CompilingErrors
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              icon="key"
              name="password"
              placeholder="Password"
            />

            <TouchableOpacity>
              <Text style={styles.trouble}> Having Trouble? </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.login} onPress={handleSubmit}>
              <Text style={styles.button}> Login </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signup}> Don't have an account? Signup Here </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#191970",
    marginTop: "15%",
  },
  login: {
    width: "30%",
    height: "6%",
    backgroundColor: "#4040bf",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    margin: "2%",
  },
  button: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    color: "#191970",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: "20%",
    marginTop: "2%",
  },
  trouble: {
    color: "#4040bf",
    textDecorationLine: "underline",
    fontSize: 15,
    marginBottom: "4%",
    marginTop: "10%",
  },
  signup: {
    color: "#4040bf",
    textDecorationLine: "underline",
    fontSize: 15,
    marginTop: "10%",
  },
});

export default Login;
