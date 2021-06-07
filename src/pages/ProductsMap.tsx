import React, { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import MapView,{ Marker,Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import { Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import  authContext  from '../contexts/authContext';


import api from '../services/api';

interface Products{
  id:number;
  name:string;
  latitude:number;
  longitude: number;
}

interface Loc{
  latitude:number;
  longitude: number;
}

const initialLongitude = 42.348962096586796;
const initialLatitude = -71.22943417754998;

export default function(){
  
  const [location, setLocation] = useState(Location);
  const [errorMsg, setErrorMsg] = useState('');

  const navigation = useNavigation();
  const { signed,signIn } = useContext(authContext);
  const { signedOut,signOut } = useContext(authContext);
  const [products, setProducts] = useState<Products[]>([]);
  const [long, setLongitude] = useState(initialLongitude);
  const [lat, setLatitude] = useState(initialLatitude);
  const [search,setSearch ] = useState('');
  
  useEffect( () => {

    Location.requestPermissionsAsync().then( async (res) => {
      
      if(res.status === "granted") {
        console.log('granted')
        
        await Location.startLocationUpdatesAsync('get-location', {
          accuracy: Location.Accuracy.Highest
        });
        
        let location = await Location.getCurrentPositionAsync({});
        console.log({location});
      }
      
    });
    
  }, [])

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const value = e.nativeEvent.text;
    setSearch(value);
  }
  

  useFocusEffect(()=>{
    
    api.get('product').then(response =>{
      setProducts(response.data);
      
    });
  },);

  async function handleProfile()
  {

    if(signed){
      navigation.navigate('Profile');
    }
    else{
      navigation.navigate('Login');
    }
  }

  async function handleSearch(){

    setProducts([]);
    api.get('productbyName/'+search+'').then(response =>{
      setProducts(response.data);
  })
}
   
  function handleToCreateOrphanage(){
    if(signed){
      navigation.navigate('SelectMapPosition');
    }
    else{
      navigation.navigate('Login');
    }
    
  }
  function handleNavigateToOrphanageDetails(id: number){
                         
    navigation.navigate('ProductDetails', { id });
  }
  

  return(
    
    <View style={styles.container}>
       
        <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            
            latitude: long, 
            longitude: lat,
            latitudeDelta: 0.20,
            longitudeDelta: 0.20
          }}
           
        >
        {products.map(product => {
          
          return(
            <Marker
              key={product.id}
              icon={mapMarker}
              calloutAnchor={{
                x:2.7,
                y:0.8
              }}
              coordinate={{
                latitude:product.latitude,
                longitude:product.longitude,
              }}
            >
            <Callout tooltip onPress={()=>handleNavigateToOrphanageDetails(product.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{product.name}</Text>
              </View>
            </Callout>
            </Marker>
          );

          })}
          </MapView> 
          <View style={styles.topBar}>
        <TextInput  style={styles.topBarText} 
                    placeholder="Search..."
                    onChange={onChange}
                    
        />
                 
            <RectButton style={styles.userProfile}  onPress={()=>{handleProfile()}}>
              <Feather name="user" size={20} color='#000000'/>
            </RectButton>
            <RectButton style={styles.searchproduct} onPress={()=>{handleSearch()}}>
              <Feather name="search" size={20} color='#000000'/>
            </RectButton>
            
            
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>{products.length} Products found</Text>
            <RectButton style={styles.publishProductButton} onPress={()=>{handleToCreateOrphanage()}}>
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
      publishProductButton:{
        width:56,
        height:56,
        backgroundColor:"#fba035",
        borderRadius:20,

        justifyContent:'center',
        alignItems:'center',
      },
      searchproduct:{
        width:40,
        height:40,
        right:1,
        backgroundColor:'#ffffff',
        borderRadius:20,

        justifyContent:'center',
        alignItems:'center',
      },
      userProfile:{
        position: 'absolute',
        width:40,
        height:40,
        right:320,
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
        left:24,
        fontSize:16,
        fontFamily: 'Nunito_700Bold',
      },

});

