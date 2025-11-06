import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/Home/HomeScreen';
import CalculoGastosScreen from '../screens/Gastos/CalculoGastosScreen';
import SobreScreen from '../screens/Sobre/SobreScreen';
import RelatorioScreen from '../screens/Relatório/RelatorioScreen';

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
            backgroundColor: corFundoEscuro, // Define a cor de fundo do cabeçalho
          },
          headerTintColor: corTextoEscuro, // Define a cor do texto e do ícone (menu)
          
          // Estilo do Menu Lateral (quando ele abre)
          drawerStyle: {
            backgroundColor: corFundoEscuro, // Cor de fundo do menu
          },
          drawerActiveTintColor: corTextoEscuro, // Cor do item de menu ativo
          drawerInactiveTintColor: corInativa, // Cor dos itens inativos
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