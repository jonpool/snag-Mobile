import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function Routes() {
  const {signed, loading} = useContext();
  if(loading){
    return (
      <View>
        
      </View>
    )
  }
}