import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView,{ Marker,Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import { Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';


import api from '../services/api';

interface Orphanage{
  id:number;
  name:string;
  latitude:number;
  longitude: number;
}
interface user{
  latitude:number;
  longitude: number;
}

export default function(){

  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(()=>{
    api.get('orphanages').then(response =>{
      setOrphanages(response.data);
    })
  },);
  
  

  function handleToCreateOrphanage(){
    navigation.navigate('SelectMapPosition');
  }
  function handleNavigateToOrphanageDetails(id: number){
                         
    navigation.navigate('OrphanageDetails', { id });
  }
  

    return(
    <View style={styles.container}>
       
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 42.363076, 
            longitude: -71.059984,
            latitudeDelta: 0.20,
            longitudeDelta: 0.20
          }}
           
        >
        {orphanages.map(orphanage => {
          return(
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x:2.7,
                y:0.8
              }}
              coordinate={{
                latitude:orphanage.latitude,
                longitude:orphanage.longitude,
              }}
            >
            <Callout tooltip onPress={()=>handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
            </Marker>
          );

          })}
          </MapView> 
          <View style={styles.topBar}>
        <TextInput  style={styles.topBarText}>Search</TextInput>
            <RectButton style={styles.searchproduct} onPress={()=>{handleToCreateOrphanage()}}>
              <Feather name="search" size={20} color='#000000'/>
            </RectButton>
            
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} Orphanages found</Text>
            <RectButton style={styles.creteOrphanageButton} onPress={()=>{handleToCreateOrphanage()}}>
              <Feather name="plus" size={20} color='#ffffff'/>
            </RectButton>
          </View>
        </View>)

      
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },

      map:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
      },
      calloutContainer:{
        width:160,
        height:46,
        paddingHorizontal:16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius:16,
        justifyContent:'center',
        

      },
      calloutText:{
        color:'#0089a5',
        fontSize: 14,
        fontFamily:'Nunito_700Bold',
      },
      footer:{
        position:'absolute',
        left:24,
        right:24,
        bottom:32,
        backgroundColor:'#fff',
        borderRadius:20,
        height:56,
        paddingLeft:24,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        elevation:10,


      },
      footerText:{
        color:'#8fa7b3',
        fontFamily: 'Nunito_700Bold',
      },
      creteOrphanageButton:{
        width:56,
        height:56,
        backgroundColor:'#15c3d6',
        borderRadius:20,

        justifyContent:'center',
        alignItems:'center',
      },
      searchproduct:{
        width:40,
        height:40,
        right:10,
        backgroundColor:'#ffffff',
        borderRadius:20,

        justifyContent:'center',
        alignItems:'center',
      },
      topBar:{
        position:'absolute',
        top:40,
        left:24,
        right:24,
        backgroundColor:'#fff',
        borderRadius:20,
        height:56,
        paddingLeft:24,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        elevation:10,
      },
      topBarText:{
        color:'#8fa7b3',
        fontSize:16,
        fontFamily: 'Nunito_700Bold',
      },

    });

