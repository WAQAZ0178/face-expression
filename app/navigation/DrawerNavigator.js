import * as React from "react";
import { Image } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import FaceDetection from "../Home/FaceDetection";
import Album from "../happy/Album";
import Quran from "../happy/Quran/Quran";
import Music from "../happy/Music/Music";
import Ringtones from "../happy/Ringtones/Ringtones";
import Wallpaper from "../happy/Wallpapers/Wallpaper";
import Books from "../happy/Books/Books";
import HarryPotter from "../happy/Books/HarryPotter";
import Notepad from "../happy/Notepad/Notepad";
import Contact from "../happy/Contacts/Contact";
import Report from "../happy/Report";

const Logo = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        source={require("../assets/logo.jpg")}
        style={{ width: 280, height: 170 }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();
function Root() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "#191970",
        drawerStyle: { backgroundColor: "#E0ECF8" },
      }}
      drawerContent={(props) => <Logo {...props} />}
    >
      <Drawer.Screen
        name="Album"
        component={Album}
        options={{
          title: "Home",
          drawerIcon: () => (
            <Ionicons name="md-home" size={18} color="#191970" />
          ),
        }}
      />

      {/* <Drawer.Screen name = "Quran" component = {Quran} 
        options = {{ title: 'Notifications', drawerIcon: () => (
          <Ionicons
            name = "md-notifications"
            size = {18}
            color = "#191970"
          />
        ),
      }} /> */}

      {/* <Drawer.Screen name = "Report" component = {Report} 
        options = {{ title: 'Logout', drawerIcon: () => (
          <AntDesign
            name = "logout"
            size = {18}
            color = "#191970"
          />
        ),
      }} /> */}
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();

export default function DrawerNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Root}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="FaceDetection" component={FaceDetection} />
      <Stack.Screen name="Feed" component={Album} />
      <Stack.Screen name="Quran" component={Quran} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Ringtones" component={Ringtones} />
      <Stack.Screen name="Wallpaper" component={Wallpaper} />
      <Stack.Screen name="Books" component={Books} />
      <Stack.Screen name="HarryPotter" component={HarryPotter} />
      <Stack.Screen name="Notepad" component={Notepad} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
}
