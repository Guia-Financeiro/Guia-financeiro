import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getLancamentosByPeriodo, getTotalByTipo, getTotalByTipoAndPeriodo } from '../../repository/Database';
import { useFocusEffect } from '@react-navigation/native';
import { homeStyles } from './resumoStyle';

// Tela de resumo financeiro mensal com totais e lançamentos do mês
export default function ResumoScreen({ navigation }) {
  // Estados para armazenar totais e lançamentos do mês atual
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [lancamentos, setLancamentos] = useState([]);

  // Carrega os dados quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  // Busca receitas, despesas e lançamentos do mês atual
  const loadData = async () => {
    try {
      // Obter datas do mês atual
      const hoje = new Date();
      const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      const dataInicio = primeiroDia.toISOString().split('T')[0];

      const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
      const dataFim = ultimoDia.toISOString().split('T')[0];

      console.log('📅 Período:', dataInicio, 'até', dataFim);

      // Buscar totais de receitas e despesas
      const receitas = await getTotalByTipoAndPeriodo('receita', dataInicio, dataFim);
      const despesas = await getTotalByTipoAndPeriodo('despesa', dataInicio, dataFim);

      console.log('💰 Receitas:', receitas, 'Despesas:', despesas);

      // Buscar lançamentos do mês
      const data = await getLancamentosByPeriodo(dataInicio, dataFim);

      // Garante que são números válidos
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

  // Calcula o saldo (receitas - despesas)
  const saldo = totalReceitas - totalDespesas;

  return (
    <ScrollView style={homeStyles.container} contentContainerStyle={homeStyles.contentContainer}>
      <Text style={homeStyles.title}>Resumo Financeiro</Text>

      {/* Card de Receitas */}
      <View style={homeStyles.card}>
        <Text style={homeStyles.label}>Receitas</Text>
        <Text style={[homeStyles.value, homeStyles.receita]}>
          <Text>R$ {totalReceitas.toFixed(2)}</Text>
        </Text>
      </View>

      {/* Card de Despesas */}
      <View style={homeStyles.card}>
        <Text style={homeStyles.label}>Despesas</Text>
        <Text style={[homeStyles.value, homeStyles.despesa]}>
          <Text>R$ {totalDespesas.toFixed(2)}</Text>
        </Text>
      </View>

      {/* Card de Saldo */}
      <View style={homeStyles.card}>
        <Text style={homeStyles.label}>Saldo</Text>
        <Text style={[homeStyles.value, saldo >= 0 ? homeStyles.receita : homeStyles.despesa]}>
          <Text>R$ {saldo.toFixed(2)}</Text>
        </Text>
      </View>

      <Text style={homeStyles.subtitle}>Lançamentos deste Mês</Text>

      {/* Lista de lançamentos ou mensagem vazia */}
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

      {/* Botão para navegar para todos os lançamentos */}
      <TouchableOpacity
        style={homeStyles.button}
        onPress={() => navigation.navigate('Relatório')}
      >
        <Text style={homeStyles.buttonText}>Ver Todos os Lançamentos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
