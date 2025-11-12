import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sobreStyles } from './sobreStyle';

const SobreScreen = () => {
  return (
    <SafeAreaView style={sobreStyles.safeArea}>
      <View style={sobreStyles.container}>
        <Text style={sobreStyles.title}>Sobre o App</Text>
        <Text style={sobreStyles.text}>Este aplicativo foi desenvolvido para auxiliar no controle de finanças pessoais.</Text>
        <Text style={sobreStyles.text}>Versão 2.0.0</Text>
      </View>
    </SafeAreaView>
  );
};

export default SobreScreen;
