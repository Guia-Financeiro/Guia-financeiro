import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import CalculoGastosScreen from '../screens/Gastos/CalculoGastosScreen';
import SobreScreen from '../screens/Sobre/SobreScreen';
import RelatorioScreen from '../screens/Relatório/RelatorioScreen';
import GerenciarScreen from '../screens/Gerenciar/GerenciarScreen';

const Drawer = createDrawerNavigator();
const corFundoEscuro = '#333333';
const corTextoEscuro = '#ffffff';
const corInativa = '#a0a0a0';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Início"
        screenOptions={{
          headerStyle: {
            backgroundColor: corFundoEscuro, 
          },
          headerTintColor: corTextoEscuro, 
          
          
          drawerStyle: {
            backgroundColor: corFundoEscuro, 
          },
          drawerActiveTintColor: corTextoEscuro, 
          drawerInactiveTintColor: corInativa, 
        }}
      >
        <Drawer.Screen 
          name="Início" 
          component={HomeScreen}
          options={{
            drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
          }}
        />
        <Drawer.Screen 
          name="Calcular Gastos" 
          component={CalculoGastosScreen}
          options={{
            drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>💰</Text>,
          }}
        />
        <Drawer.Screen 
          name="Relatório" 
          component={RelatorioScreen}
          options={{
            drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📊</Text>,
          }}
        />
        <Drawer.Screen 
          name="Gerenciar Lançamentos" 
          component={GerenciarScreen}
          options={{
            drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📋</Text>,
          }}
        />
        <Drawer.Screen 
          name="Sobre" 
          component={SobreScreen}
          options={{
            drawerIcon: ({ color }) => <Text style={{ fontSize: 20 }}>ℹ️</Text>,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;