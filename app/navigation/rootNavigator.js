import * as React from "react";
import { Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "./DrawerNavigator";
const Stack = createStackNavigator();
export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AuthNavigator"
    >
      <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
