import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import  authContext  from '../../contexts/authContext';
import logo from '../../images/logo.png';
import api from '../../services/apiAuth';
import { useNavigation } from '@react-navigation/native';

const user={
  email: '',
  password: '',
};



export default function SignUp(){
  
  const { signed,signIn } = useContext(authContext);
  const { signedOut,signOut } = useContext(authContext);
  const navigation = useNavigation();

  
  const [e, setEmail] = useState("");
  const [pw, setPw] = useState("");
  var email = e.toLowerCase();
  console.log(user.email);
  user.password= pw;

  async function createUser(){

    const data = {
      email,
      password:pw,
    };
    const response = await api.post('/auth/register',data).catch(error =>{
      console.log(error.response.data.error);
  });
    alert('Cadastro Concluido Com Sucesso'); 
    navigation.navigate('Login'); 

  }

  

  

  return (
      <View style={styles.container}>
            <Image source={logo}/>
            <View style={styles.inputView}>
              <TextInput  
                style={styles.inputText}
                placeholder="Email..." 
                placeholderTextColor="#ffffff"
                value={email}
                onChangeText={setEmail}/>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..." 
                placeholderTextColor="#ffffff"
                value={pw}
                onChangeText={setPw}/>
            </View>
            <View style={styles.inputView} >
              <TextInput  
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirm password..." 
                placeholderTextColor="#ffffff"
                value={pw}
                onChangeText={setPw}/>
            </View>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText} onPress={()=>{createUser()}}>SignUP</Text>
            </TouchableOpacity>
            
    
      </View>);
} 
    
const styles = StyleSheet.create
 ({
      container: {
        flex: 1,
        backgroundColor: '#f2f3f5',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      },
      inputView:{
        width:"80%",
        backgroundColor:'#371a46',
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"white"
      },
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fba035",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
        color:"#ffffff"
      },
      signUpText:{
        color:"#000000"
      }

  });