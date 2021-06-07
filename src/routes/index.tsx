import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';

import AuthContext from '../contexts/authContext';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';



 const Routes : React.FC =() =>{
   const {signed} = useContext(AuthContext);
   return signed ? <AppRoutes/>: < AuthRoutes />;
 }

 export default Routes;