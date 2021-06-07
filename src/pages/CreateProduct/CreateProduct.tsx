import React, {useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Switch, Text, TextInput, TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import  authContext  from '../../contexts/authContext';


import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

interface user {
  token: string;
  user: {
    _id: string;
    name: string,
    email: string,
  };
}

interface CreateProductRouteParams {
  position:{
    latitude:number;
    longitude:number;
  }
}
export default function CreateProduct(){

  const { userId } = useContext(authContext);
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as CreateProductRouteParams;
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [available, setAvailability] = useState(false);
  const [loading, setLoading] = useState(false);
  const placeholder = {
    label: 'Select a condition...',
    value: null,
    color: '#9EA0A4',
  };
  
  async function handlePlaceProduct(){
    
    const {latitude, longitude} = params.position;
    const data = new FormData();
        
    data.append('title', title);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('description', description);
    data.append('condition', condition);
    data.append('available', String(available));
    data.append('user',userId);
    images.forEach((image, index)=>{
    data.append('images',{
        name:`image_${index}.jpg`,
        type:'image/jpg',
        uri:image,
      }as any);
    });

    setLoading(true);
    await api.post('product', data);
  
    alert('Listing publish with success');
    setLoading(false);
    navigation.navigate("ProductsMap");
    
  }
  async function handleSelectImages(){
      
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if(status !== 'granted'){
      alert('Sorry, we need access to your pictures...');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      
    });

    if (result.cancelled){
      return;
    }

    const { uri } = result;
    setImages([...images, uri]);
  }
  
  if(loading){
    return <View style={{ flex:1, justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color="666"/>
    </View>
  }

  return (
    
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
     <View style={styles.container}>
    
      <Text style={styles.title}>New Listing</Text>
      <Text style={styles.label}>Photos</Text>
      <View style={styles.uploadedImageContainer}>
        {images.map(image => {
          return(<Image
                  key={image}
                  source={{ uri: image }}
                  style={styles.uploadedImage}
            
            />
            );
          })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={() => {handleSelectImages()}}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>
      <Text style={styles.advice}>You can add up to 5 pictures.</Text>
      <TextInput
        placeholder="Title" 
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 110 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.advice}>Optional</Text>
      
      <RNPickerSelect
            style={{
              ...styles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            placeholder = {placeholder}
            value={condition}
            onValueChange={(value) => setCondition(value)}
            items={[
                { label: 'New', value: 'New' },
                { label: 'Used - Like New', value: 'Used Like New' },
                { label: 'Used - Good', value: 'used Good' },
                { label: 'Used - Fair', value: 'used Fair' },
            ]}
        />
      <View style={styles.switchContainer}>
        <Text style={styles.ringBell}>Available</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={available}
          onValueChange={setAvailability}
          

        />
      </View>

      <RectButton style={styles.nextButton} onPress={() => {handlePlaceProduct()}}>
        <Text style={styles.nextButtonText}>Publish</Text>
      </RectButton>
    </View>
    </KeyboardAwareScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    marginBottom:10
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },
  pickerSelectStyles:{
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 20,
    
  },
  ringBell:{
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 35,
  },
  advice:{
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 32,
  },
  
  dropdown: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 50,
    
    
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom:15,
    textAlignVertical: 'top',
  },
  uploadedImageContainer:{
    flexDirection: 'row',

  },
  uploadedImage:{
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 50,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },inputIOS: {
    backgroundColor: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    marginBottom: 25,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#d3e2e6',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})