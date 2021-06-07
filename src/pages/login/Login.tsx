import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import  authContext  from '../../contexts/authContext';
import { useNavigation } from '@react-navigation/native';
import logo from '../../images/logo.png';
const user={
  
  email: '',
  password: '',
};



export default function() {
  
  const navigation = useNavigation();
  const { signed,signIn } = useContext(authContext);
  const { signedOut,signOut } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  console.log(signed);

  user.email = email;
  user.password= pw;
  
  async function handleSignIn()
  {
    if(user.email===''|| user.password ===''){
      alert('The field email and password can`t be blank');
      return;
    }
    signIn(user);
    console.log(user);
    if (signed === true) {
      navigation.navigate('SelectMapPosition');
    }
  }

  async function handleSignOut()
  {
    signOut();
  }
  async function handleSignUp()
  {
    navigation.navigate('SignUp');
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
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText} onPress={()=>{handleSignIn()}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.signUpText}onPress={()=>{handleSignUp()}}>Signup</Text>
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