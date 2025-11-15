import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getLancamentos, getLancamentosByPeriodo } from '../../repository/Database';
import { relatorioStyles } from './relatorioStyle';
import { colors } from '../../theme/Theme';
import DropDownPicker from 'react-native-dropdown-picker';

export default function RelatorioScreen() {
  // Estados principais do relatório
  const [lancamentos, setLancamentos] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');

  // Estados para filtro de ano e mês
  const [anoDigitado, setAnoDigitado] = useState(new Date().getFullYear().toString());
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth());
  const [openMesDropdown, setOpenMesDropdown] = useState(false);

  // Array de meses para o dropdown
  const meses = [
    { label: 'Janeiro', value: 0 },
    { label: 'Fevereiro', value: 1 },
    { label: 'Março', value: 2 },
    { label: 'Abril', value: 3 },
    { label: 'Maio', value: 4 },
    { label: 'Junho', value: 5 },
    { label: 'Julho', value: 6 },
    { label: 'Agosto', value: 7 },
    { label: 'Setembro', value: 8 },
    { label: 'Outubro', value: 9 },
    { label: 'Novembro', value: 10 },
    { label: 'Dezembro', value: 11 },
  ];

  useFocusEffect(
    useCallback(() => {
      loadLancamentos();
    }, [periodoSelecionado, anoDigitado, mesSelecionado])
  );

  // Carrega os lançamentos de acordo com o período selecionado
  const loadLancamentos = async () => {
    try {
      let data = [];
      
      if (periodoSelecionado === 'todos') {
        const anoNum = parseInt(anoDigitado);
        
        // Valida se o ano é válido
        if (isNaN(anoNum)) {
          setLancamentos([]);
          setTotalDespesas(0);
          setTotalReceitas(0);
          return;
        }

        // Busca todos os dados e filtra por ano e mês
        const todosDados = await getLancamentos();
        data = todosDados.filter(item => {
          const dataItem = new Date(item.data + 'T00:00:00');
          const ano = dataItem.getFullYear();
          const mes = dataItem.getMonth();
          return ano === anoNum && mes === mesSelecionado;
        });
      } else if (periodoSelecionado === 'mes') {
        // Busca lançamentos do mês atual
        const hoje = new Date();
        const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        data = await getLancamentosByPeriodo(
          inicio.toISOString().split('T')[0],
          fim.toISOString().split('T')[0]
        );
      }
      setLancamentos(data || []);
      calcularTotais(data || []);
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
      setLancamentos([]);
      setTotalDespesas(0);
      setTotalReceitas(0);
    }
  };

  // Calcula o total de receitas e despesas dos lançamentos
  const calcularTotais = (data) => {
    const receitas = data
      .filter(item => item.tipo === 'receita')
      .reduce((sum, item) => sum + parseFloat(item.valor), 0);
    
    const despesas = data
      .filter(item => item.tipo === 'despesa')
      .reduce((sum, item) => sum + parseFloat(item.valor), 0);
    
    setTotalReceitas(receitas);
    setTotalDespesas(despesas);
  };

  // Calcula o saldo (receitas - despesas) e o percentual de comprometimento
  const saldo = totalReceitas - totalDespesas;
  const percentualGasto = totalReceitas > 0 ? (totalDespesas / totalReceitas) * 100 : 0;

  // Retorna o status e cor visual baseado no percentual de gastos
  const getPercentualStatus = () => {
    if (percentualGasto <= 50) return { text: '✅ Excelente!', color: '#38A169', desc: 'Gastos controlados' };
    if (percentualGasto <= 70) return { text: '⚠️ Atenção', color: '#F59E0B', desc: 'Cuidado com os gastos' };
    if (percentualGasto <= 90) return { text: '🚨 Risco', color: '#E53E3E', desc: 'Gastos altos' };
    return { text: '🔴 Crítico', color: '#C53030', desc: 'Gastando mais que ganha!' };
  };

  const status = getPercentualStatus();

  // Renderiza botão de seleção de período (Este mês / Tudo)
  const renderPeriodoButton = (periodo, label) => (
    <TouchableOpacity
      style={[
        relatorioStyles.periodoButton,
        periodoSelecionado === periodo && relatorioStyles.periodoButtonActive
      ]}
      onPress={() => setPeriodoSelecionado(periodo)}
    >
      <Text style={[
        relatorioStyles.periodoButtonText,
        periodoSelecionado === periodo && relatorioStyles.periodoButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  // Renderiza cada item da lista de lançamentos
  const renderLancamento = ({ item }) => (
    <View style={relatorioStyles.lancamento}>
      <View style={relatorioStyles.lancamentoHeader}>
        <View
          style={[
            relatorioStyles.tipoIndicador,
            { backgroundColor: item.tipo === 'receita' ? colors.success : colors.error }
          ]}
        />
        <View style={relatorioStyles.lancamentoInfo}>
          <Text style={relatorioStyles.lancamentoNome}>{item.nome}</Text>
          <Text style={relatorioStyles.lancamentoData}>
            {new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <View style={relatorioStyles.lancamentoValorContainer}>
          <Text
            style={[
              relatorioStyles.lancamentoValor,
              { color: item.tipo === 'receita' ? colors.success : colors.error }
            ]}
          >
            {item.tipo === 'receita' ? '+' : '-'} R$ {parseFloat(item.valor).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={relatorioStyles.container}>
      {/* Header com Resumo */}
      <View style={relatorioStyles.header}>
        <Text style={relatorioStyles.headerTitle}>📊 Relatório Financeiro</Text>

        {/* Filtro de Período */}
        <View style={relatorioStyles.periodoContainer}>
          {renderPeriodoButton('mes', 'Este mês')}
          {renderPeriodoButton('todos', 'Tudo')}
        </View>
      </View>

      {/* ✅ Filtro de Ano e Mês com Input de Ano */}
      {periodoSelecionado === 'todos' && (
        <View style={relatorioStyles.filtroDropdownContainer}>
          <Text style={relatorioStyles.filtroDropdownTitle}>📅 Filtrar por Período</Text>
          
          <View style={relatorioStyles.dropdownsRow}>
            {/* Input para Ano */}
            <View style={relatorioStyles.anoInputWrapper}>
              <Text style={relatorioStyles.anoInputLabel}>Ano</Text>
              <TextInput
                style={relatorioStyles.anoInput}
                placeholder="2024"
                placeholderTextColor="#999"
                value={anoDigitado}
                onChangeText={setAnoDigitado}
                keyboardType="number-pad"
                maxLength={4}
              />
            </View>

            {/* Dropdown Mês */}
            <View style={relatorioStyles.dropdownWrapper}>
              <Text style={relatorioStyles.mesDropdownLabel}>Mês</Text>
              <DropDownPicker
                open={openMesDropdown}
                value={mesSelecionado}
                items={meses}
                setOpen={setOpenMesDropdown}
                setValue={setMesSelecionado}
                placeholder="Selecione o mês"
                style={relatorioStyles.dropdown}
                textStyle={relatorioStyles.dropdownText}
                dropDownContainerStyle={relatorioStyles.dropdownContainer}
                zIndex={2000}
              />
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={lancamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLancamento}
        scrollEnabled={!openMesDropdown}
        nestedScrollEnabled={false}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
            {/* Cards de Resumo */}
            <View style={relatorioStyles.resumoContainer}>
              <View style={[relatorioStyles.resumoCard, relatorioStyles.receitaCard]}>
                <Text style={relatorioStyles.resumoLabel}>Receitas</Text>
                <Text style={[relatorioStyles.resumoValor, relatorioStyles.receitaColor]}>
                  R$ {totalReceitas.toFixed(2)}
                </Text>
              </View>

              <View style={[relatorioStyles.resumoCard, relatorioStyles.despesaCard]}>
                <Text style={relatorioStyles.resumoLabel}>Despesas</Text>
                <Text style={[relatorioStyles.resumoValor, relatorioStyles.despesaColor]}>
                  R$ {totalDespesas.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Card de Saldo */}
            <View style={[
              relatorioStyles.saldoCard,
              { backgroundColor: saldo >= 0 ? colors.success + '20' : colors.error + '20' }
            ]}>
              <Text style={relatorioStyles.saldoLabel}>Saldo</Text>
              <Text style={[
                relatorioStyles.saldoValor,
                { color: saldo >= 0 ? colors.success : colors.error }
              ]}>
                R$ {saldo.toFixed(2)}
              </Text>
              <Text style={relatorioStyles.saldoStatus}>
                {saldo >= 0 ? '💰 Positivo' : '⚠️ Negativo'}
              </Text>
            </View>

            {/* Análise de Comprometimento */}
            {totalReceitas > 0 && (
              <View style={relatorioStyles.analiseCard}>
                <Text style={relatorioStyles.analiseTitle}>📈 Análise de Gastos</Text>

                <View style={relatorioStyles.percentualContainer}>
                  <Text style={relatorioStyles.percentualLabel}>Comprometimento da Renda</Text>
                  <Text style={[relatorioStyles.percentualValor, { color: status.color }]}>
                    {percentualGasto.toFixed(1)}%
                  </Text>
                </View>

                <View style={relatorioStyles.barraContainer}>
                  <View style={relatorioStyles.barraBackground}>
                    <View 
                      style={[
                        relatorioStyles.barraProgress,
                        { 
                          width: `${Math.min(percentualGasto, 100)}%`,
                          backgroundColor: status.color
                        }
                      ]} 
                    />
                  </View>
                </View>

                <View style={[relatorioStyles.statusCard, { backgroundColor: status.color + '20' }]}>
                  <Text style={[relatorioStyles.statusText, { color: status.color }]}>
                    {status.text}
                  </Text>
                  <Text style={[relatorioStyles.statusDesc, { color: status.color }]}>
                    {status.desc}
                  </Text>
                </View>

                <View style={relatorioStyles.detalhamentoContainer}>
                  <View style={relatorioStyles.detalhamentoRow}>
                    <Text style={relatorioStyles.detalhamentoLabel}>💵 Renda Total:</Text>
                    <Text style={relatorioStyles.detalhamentoValor}>R$ {totalReceitas.toFixed(2)}</Text>
                  </View>
                  <View style={relatorioStyles.detalhamentoRow}>
                    <Text style={relatorioStyles.detalhamentoLabel}>💸 Gastos Totais:</Text>
                    <Text style={relatorioStyles.detalhamentoValor}>R$ {totalDespesas.toFixed(2)}</Text>
                  </View>
                  <View style={relatorioStyles.detalhamentoRow}>
                    <Text style={relatorioStyles.detalhamentoLabel}>💰 Sobrou:</Text>
                    <Text style={[
                      relatorioStyles.detalhamentoValor,
                      { color: saldo >= 0 ? '#38A169' : '#E53E3E' }
                    ]}>
                      R$ {saldo.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Título da Lista */}
            <View style={relatorioStyles.listaContainer}>
              <Text style={relatorioStyles.listaTitle}>
                📋 Lançamentos ({lancamentos.length})
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={relatorioStyles.emptyContainer}>
            <Text style={relatorioStyles.emptyText}>📭</Text>
            <Text style={relatorioStyles.emptyTitle}>Nenhum lançamento</Text>
            <Text style={relatorioStyles.emptySubtitle}>
              Adicione uma receita ou despesa para visualizar seus lançamentos
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 30 }} />}
        contentContainerStyle={relatorioStyles.scrollContent}
        scrollIndicatorInsets={{right: 1}}
      />
    </View>
  );
}