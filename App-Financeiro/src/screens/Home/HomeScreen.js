import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { homeStyle } from './homeStyle';

// Tela inicial do aplicativo com boas-vindas e informações gerais
const HomeScreen = () => {
  return (
    <SafeAreaView style={homeStyle.safeArea}>
      <View style={homeStyle.container}>
        <Text style={homeStyle.title}>Bem vindo ao Fluxo</Text>
        <Text style={homeStyle.text}>Este aplicativo foi desenvolvido para auxiliar no controle de finanças pessoais.</Text>
        <Text style={homeStyle.text}>Versão 2.0.1</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
