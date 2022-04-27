import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Home/Home';
import Signup from '../Home/Signup';
import Login from '../Home/Login';
import FaceDetection from '../Home/FaceDetection';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name = "Home" component = {Home} options = {{headerShown: false}}/>
        <Stack.Screen name = "Signup" component = {Signup}/>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "FaceDetection" component = {FaceDetection}/>
        <Stack.Screen name = "DrawerNavigator" component = {DrawerNavigator} options = {{headerShown: false}}/>
    </Stack.Navigator>
)

export default AuthNavigator;