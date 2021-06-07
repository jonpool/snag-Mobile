import React,{useState} from 'react';
import api from '../services/apiAuth';
import api2 from '../services/api';
import { useNavigation } from '@react-navigation/native';

interface Response {
  token: string;
  user: {
    _id: string;
    name: string,
    email: string,
  };
}

export function signIn(user):Promise<Response>{
  return new Promise((resolve, reject) => {
  api.post(`/auth/authenticate`,{"email":`${user.email}`,"password":`${user.password}`}).then(response => {
        resolve({
          token: response.data.token,
          user:{
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email,
          }
        });
       return response;
    }).catch(error =>{
        reject(error.response);
        alert(error.response.data.error);
        return;
    });
  });
}
  
