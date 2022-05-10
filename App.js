import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import NavigationTheme from "./app/navigation/NavigationTheme";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import FaceDetection from "./app/Home/FaceDetection";
import { RootNavigator } from "./app/navigation/rootNavigator";
export default function App() {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <RootNavigator />
    </NavigationContainer>
    // <FaceDetection/>
  );
}
