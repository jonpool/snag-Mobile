
import React, {useState, useEffect,useContext} from 'react';
import{ Feather } from '@expo/vector-icons';
import{ useNavigation, useRoute} from '@react-navigation/native';
import { View, FlatList,  Image, Text, TouchableOpacity,StyleSheet } from 'react-native';
import  authContext  from '../../contexts/authContext';

import api from '../../services/api';
import logoImg from '../../../assets/icon.png';




interface product{
    id: number;
    name: string;
}

export default function Profile(){
    
    const { userId } = useContext(authContext);
    const [products, setProducts] = useState<product[]>([]);
    
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    function navigateToDetails(product){
      navigation.navigate('Detail',{ product });
    }

    async function loadProducts(){

      if (loading){
        return;
      }

      if (total >0 && products.length === total){
        return;
      }

      setLoading(true);
      console.log(userId);
      
            
      api.get('productbyUser/'+userId+'').then(response =>{
        setProducts(response.data);
        
      })
      //setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);

    }

    useEffect(() => {
      loadProducts();
    },[]);

     return(
       <View style={styles.container}>
         <View style={styles.header}>
           <Image source ={logoImg}/>
           <Text style={styles.headerText}>
     Total de <Text style={styles.headerTextBold}>{total} produtos</Text>
           </Text>
         </View>

         <Text style={styles.title}>Bem Vindo!</Text>
         <Text style={styles.description}>Escolha um dos produtos abaixo para editar ou excluir!</Text>
         
        <FlatList 
          data={products}
          style={styles.incidentList}
          keyExtractor ={product => String(product.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadProducts}
          refreshing={loading}
          onRefresh={loadProducts}
          onEndReachedThreshold={0.2}
          renderItem ={({item})=>(
          
          <View style={styles.incident}>
              <Text style={styles.incidentProperty}>Product</Text>
          <Text style={styles.incidentValue}>{item.name}</Text>
              <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={()=>navigateToDetails(item)}
              >  
              <Text style={styles.detailsButtonText}>Ver mais deatlhes</Text>
              <Feather name='arrow-right' size={16} color='#E02041'></Feather>
              </TouchableOpacity>
           </View>
         
          )}
        />
        
      </View>
  )
}

const styles = StyleSheet.create({
  container:{
        flex:1,
        paddingHorizontal:24,
        
        

  },

  header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
  },

  headerText:{
        fontSize:15,
        color:'#737380'
  },
  headerTextBold:{
        fontWeight: 'bold'
  },
  title:{
        fontSize:30,
        marginBottom: 16,
        marginTop:20,
        color:'#13131a',
        fontWeight:'bold'
  },

  description:{
        fontSize: 16,
        lineHeight:24,
        color:'#737380'
  },

  incidentList:{
        marginTop:32,
  },

  incident:{
        padding:24,
        borderRadius:8,
        backgroundColor:'#fff',
        marginBottom:15
  },

  incidentProperty:{
        fontSize: 14,
        color:'#41414d',
        fontWeight:'bold'
  },
  incidentValue:{
      marginTop: 8,
      fontSize:15,
      marginBottom:24,
      color: '#737380'  
  },
  
  detailsButton:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
  },

  detailsButtonText:{
        color: '#e02041',
        fontSize:15,
        fontWeight:'bold'
  },

})