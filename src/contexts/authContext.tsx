import React, { createContext, useState, useEffect } from "react";
import {View, ActivityIndicator} from 'react-native';
import *  as auth from '../services/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import selectMapPosition from '../pages/CreateProduct/SelectMapPosition';


interface AuthContextData {
  signed: boolean;
  signedOut: boolean;
  user: object | null;
  userId:string;
  signIn(user): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setId] = useState("");
  useEffect(() => {
    async function loadStoreData(){
      const storageUser = await AsyncStorage.getItem('@RNAuth:user');
      const storageToken = await AsyncStorage.getItem('@RNAuth:token');
      const storageUserId = await AsyncStorage.getItem('@RNAuth:id');
      
      if (storageUser && storageToken && storageUserId) {
        setUser(JSON.parse(storageUser));
        setId(String(storageUserId));
        setLoading(false);
      }
    }
    loadStoreData();
  }, []);

  async function signIn(user){
    
    setLoading(true);
    const response = await auth.signIn(user);
    setUser(response.user);
    console.log(response.user);
    if(user){
      alert("You are logged");
      setLoading(false);
    }
    else alert(response);
    setLoading(false);
    
    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
    await AsyncStorage.setItem('@RNAuth:id', response.user._id);
    return;
  }

  function signOut() {
    AsyncStorage.clear().then(() =>{  
      setUser(null);
    })    
  }

  if(loading){
    return <View style={{ flex:1, justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color="666"/>
    </View>
  }

  return (
    <AuthContext.Provider value={{signedOut: !!user, signed: !!user, user, userId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;