import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getLancamentosByPeriodo, getTotalByTipo, getTotalByTipoAndPeriodo } from '../../repository/Database';
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
      // Obter data de hoje
      const hoje = new Date();

      // Primeiro dia do mês atual
      const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      const dataInicio = primeiroDia.toISOString().split('T')[0];

      // Último dia do mês atual
      const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
      const dataFim = ultimoDia.toISOString().split('T')[0];

      console.log('📅 Período:', dataInicio, 'até', dataFim);

      // Buscar receitas e despesas do mês atual
      const receitas = await getTotalByTipoAndPeriodo('receita', dataInicio, dataFim);
      const despesas = await getTotalByTipoAndPeriodo('despesa', dataInicio, dataFim);

      console.log('💰 Receitas:', receitas, 'Despesas:', despesas);

      // Buscar lançamentos do mês atual
      const data = await getLancamentosByPeriodo(dataInicio, dataFim);

      // Garantir que são números
      setTotalReceitas(parseFloat(receitas) || 0);
      setTotalDespesas(parseFloat(despesas) || 0);
      setLancamentos(data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setTotalReceitas(0);
      setTotalDespesas(0);
      setLancamentos([]);
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

      <Text style={homeStyles.subtitle}>Lançamentos deste Mês</Text>

      {lancamentos && lancamentos.length > 0 ? (
        lancamentos.map((item) => (
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
        ))
      ) : (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={homeStyles.lancamentoNome}>📭 Nenhum lançamento este mês</Text>
          <Text style={{ color: '#999', marginTop: 8 }}>Adicione uma receita ou despesa em "Relatório" ou calcule seu gastos em "Calcular Gastos" para visualizar seus lançamentos</Text>
        </View>
      )}

      <TouchableOpacity
        style={homeStyles.button}
        onPress={() => navigation.navigate('Relatório')}
      >
        <Text style={homeStyles.buttonText}>Ver Todos os Lançamentos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
