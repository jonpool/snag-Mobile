import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductMap from '../pages/ProductsMap';
import ProductDetails from '../pages/ProductDetails';
import SelectMapPosition from '../pages/CreateProduct/SelectMapPosition';
import CreateProduct from '../pages/CreateProduct/CreateProduct';
import Header from '../components/Header';
import Login from '../pages/login/Login';


const { Navigator, Screen } = createStackNavigator();
import { AuthProvider } from '../contexts/authContext';

const App: React.FC = () =>{
  return (
    <NavigationContainer>
      <AuthProvider>
            <Navigator screenOptions={{headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}  >
                <Screen name="ProductsMap" 
                        component={ProductMap} 
                />

                <Screen 
                    name="ProductDetails" 
                    component={ProductDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Product" />
                    }} 
                />

                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Select on the map." />
                    }}  
                />

                <Screen 
                    name="CreateProduct" 
                    component={CreateProduct}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Fill out the form." />
                    }}  
                />
                <Screen 
                    name="Login" 
                    component={Login}
                      
                />
            </Navigator>
            </AuthProvider>
    </NavigationContainer>
  )
}

export default App;