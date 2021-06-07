import 'react-native-gesture-handler';

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {View} from 'react-native';


import Login from '../pages/login/Login';
const AuthStack = createStackNavigator();

const Auth: React.FC = () =>(
     <AuthStack.Navigator>
       <AuthStack.Screen name="login" component={Login} />
    </AuthStack.Navigator>
  
)

export default Auth;