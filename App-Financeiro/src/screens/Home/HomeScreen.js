import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getLancamentos, getTotalByTipo } from '../../repository/Database';
import { useFocusEffect } from '@react-navigation/native';
import { homeStyles } from './homeStyle';



export default function HomeScreen({ navigation }) {
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [lancamentos, setLancamentos] = useState([]);

  useFocusEffect(
    useCallback(() => {
    loadData();
  }, [])
  );

  const loadData = async () => {
    try {
      const receitas = await getTotalByTipo('receita');
      const despesas = await getTotalByTipo('despesa');
      const data = await getLancamentos();
      
      setTotalReceitas(receitas);
      setTotalDespesas(despesas);
      setLancamentos(data.slice(0, 5)); // Últimos 5
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const saldo = totalReceitas - totalDespesas;

  return (
    <ScrollView style={homeStyles.container} contentContainerStyle={homeStyles.contentContainer}>
      <Text style={homeStyles.title}>Resumo Financeiro</Text>
      
      <View style={homeStyles.card}>
        <Text style={homeStyles.label}>Receitas</Text>
        <Text style={[homeStyles.value, homeStyles.receita]}>
         <Text>R$ {totalReceitas.toFixed(2)}</Text>
        </Text>
      </View>

      <View style={homeStyles.card}>
        <Text style={homeStyles.label}>Despesas</Text>
        <Text style={[homeStyles.value, homeStyles.despesa]}>
         <Text>R$ {totalDespesas.toFixed(2)}</Text>
        </Text>
      </View>

      <View style={homeStyles.card}>
        <Text style={homeStyles.label}>Saldo</Text>
        <Text style={[homeStyles.value, saldo >= 0 ? homeStyles.receita : homeStyles.despesa]}>
          <Text>R$ {saldo.toFixed(2)}</Text>
        </Text>
      </View>

      <Text style={homeStyles.subtitle}>Últimos Lançamentos</Text>
      
      {lancamentos.map((item) => (
        <View key={item.id} style={homeStyles.lancamento}>
          <View>
            <Text style={homeStyles.lancamentoNome}>{item.nome}</Text>
            <Text style={homeStyles.lancamentoData}>{item.data}</Text>
          </View>
          <Text style={[
            homeStyles.lancamentoValor,
            item.tipo === 'receita' ? homeStyles.receita : homeStyles.despesa
          ]}>
            R$ {parseFloat(item.valor).toFixed(2)}
          </Text>
        </View>
      ))}

      <TouchableOpacity 
        style={homeStyles.button}
        onPress={() => navigation.navigate('Relatório')}
      >
        <Text style={homeStyles.buttonText}>Ver Todos os Lançamentos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
