import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getLancamentos, getTotalByTipo, getLancamentosByPeriodo, deleteLancamento } from '../../repository/Database';
import { relatorioStyles } from './relatorioStyle';
import { colors } from '../../theme/Theme';
import { addLancamento } from '../../repository/Database';

export default function RelatorioScreen() {
  const [lancamentos, setLancamentos] = useState([]);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [periodoSelecionado, setPeriodoSelecionado] = useState('todos');

  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);

    //renda
  const [nomeRenda, setNomeRenda] = useState('');
  const [valorRenda, setValorRenda] = useState('');
  const [rendaRepete, setRendaRepete] = useState(false);
  const [rendaSempre, setRendaSempre] = useState(false);
  const [rendaMeses, setRendaMeses] = useState('');

  //despesa
  const [nomeDespesa, setNomeDespesa] = useState('');
  const [valorDespesa, setValorDespesa] = useState('');
  const [despesaRepete, setDespesaRepete] = useState(false);
  const [despesaSempre, setDespesaSempre] = useState(false);
  const [despesaMeses, setDespesaMeses] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadLancamentos();
    }, [periodoSelecionado, anoSelecionado])
  );

  const extrairAnosDisponiveis = (data) => {
    const anos = new Set();
    data.forEach(item => {
      const ano = new Date(item.data + 'T00:00:00').getFullYear();
      anos.add(ano);
    });
    return Array.from(anos).sort((a,b) => a - b);
  };


  const loadLancamentos = async () => {
    try {
      let data;
      
      if (periodoSelecionado === 'todos') {
        const todosDados = await getLancamentos();
        data = todosDados.filter(item => {
          const ano = new Date(item.data + 'T00:00:00').getFullYear();
          return ano === anoSelecionado;
        });
        const anos = extrairAnosDisponiveis(todosDados);
        setAnosDisponiveis(anos);
      } else if (periodoSelecionado === 'mesAnterior') {
        const hoje = new Date();
        const inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
        const fim = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
        data = await getLancamentosByPeriodo(
          inicio.toISOString().split('T')[0],
          fim.toISOString().split('T')[0]
        );
      }else if (periodoSelecionado === 'mes') {
        const hoje = new Date();
        const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
        data = await getLancamentosByPeriodo(
          inicio.toISOString().split('T')[0],
          fim.toISOString().split('T')[0]
        );
      } else if (periodoSelecionado === 'semana') {
        const hoje = new Date();
        const inicio = new Date(hoje);
        inicio.setDate(hoje.getDate() - 7);
        data = await getLancamentosByPeriodo(
          inicio.toISOString().split('T')[0],
          hoje.toISOString().split('T')[0]
        );
      }

      setLancamentos(data);
      calcularTotais(data);
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
    }
  };

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

  const validarInputs = (nome, valor) => {
    if (!nome.trim()) {
      Alert.alert(' Erro', 'Por favor, insira uma descrição');
      return false;
    }
    if (!valor.trim() || isNaN(parseFloat(valor))) {
      Alert.alert(' Erro', 'Por favor, insira um valor numérico válido');
      return false;
    }
    return true;
  };

  const addLancamentosRepetidos = async (nome, valor, tipo, repeteData) => {
  try {
    const hoje = new Date();
    let adicionado = false;
    
    if (repeteData.repete) {
      if (repeteData.sempre) {
        // Adiciona para os próximos 12 meses
        for (let i = 0; i < 12; i++) {
          const data = new Date(hoje);
          data.setMonth(data.getMonth() + i);
          const dataStr = data.toISOString().split('T')[0];

          await addLancamento({
            nome: nome,
            valor: parseFloat(valor),
            tipo: tipo,
            data: dataStr,
            repete: 1,
            repete_sempre: 1,
            repete_meses: 0
          });
          adicionado = true;
        }
      } else if (repeteData.meses && repeteData.meses > 0) {
        // Adiciona pela quantidade de meses especificada
        for (let i = 0; i < repeteData.meses; i++) {
          const data = new Date(hoje);
          data.setMonth(data.getMonth() + i);
          const dataStr = data.toISOString().split('T')[0];

          await addLancamento({
            nome: nome,
            valor: parseFloat(valor),
            tipo: tipo,
            data: dataStr,
            repete: 1,
            repete_sempre: 0,
            repete_meses: repeteData.meses
          });
          adicionado = true;
        }
      }
    } else {
      // Apenas uma vez
      const dataStr = hoje.toISOString().split('T')[0];
      await addLancamento({
        nome: nome,
        valor: parseFloat(valor),
        tipo: tipo,
        data: dataStr,
        repete: 0,
        repete_sempre: 0,
        repete_meses: 0
      });
      adicionado = true;
    }

    return adicionado;
  } catch (error) {
    console.error('Erro ao adicionar lançamentos repetidos:', error);
    return false;
  }
};

  const handleAddRenda = async () => {
    if (!validarInputs(nomeRenda, valorRenda)) return;

    if (rendaRepete && !rendaSempre && !rendaMeses.trim()){
      Alert.alert('Erro', 'Por favor, insira a quantidade de meses para repetir a renda');
      return;
    }

    try{
      const repeteData ={
        repete: rendaRepete,
        sempre: rendaSempre,
        meses: parseInt(rendaMeses) || 0
      };

      const success = await addLancamentosRepetidos(nomeRenda, valorRenda, 'receita', repeteData);

      if(success){
        const message = rendaRepete
        ? (rendaSempre ? 'Renda adicionada mensalmente por 12 meses!' 
                       : `Renda adicionada por ${rendaMeses} meses!`)
                       : 'Renda adicionada com sucesso!';

        Alert.alert('Sucesso', message);
        setNomeRenda('');
        setValorRenda('');
        setRendaRepete(false);
        setRendaSempre(false);
        setRendaMeses('');
        loadLancamentos();
      }else {
        Alert.alert('Erro', 'Não foi possível adicionar a renda');
      }
    } catch (error){
      console.error('Erro ao adicionar renda:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar renda');
    }
  };

  const handleAddDespesa = async () => {
  if (!validarInputs(nomeDespesa, valorDespesa)) return;

  if (despesaRepete && !despesaSempre && !despesaMeses.trim()) {
    Alert.alert('❌ Erro', 'Por favor, especifique a duração da repetição');
    return;
  }

  try {
    const repeteData = {
      repete: despesaRepete,
      sempre: despesaSempre,
      meses: parseInt(despesaMeses) || 0
    };

    const success = await addLancamentosRepetidos(nomeDespesa, valorDespesa, 'despesa', repeteData);

    if (success) {
      const mensagem = despesaRepete 
        ? (despesaSempre ? 'Despesa adicionada mensalmente (indefinidamente)!' : `Despesa adicionada por ${despesaMeses} meses!`)
        : 'Despesa adicionada com sucesso!';
      Alert.alert('✅ Sucesso', mensagem);
      setNomeDespesa('');
      setValorDespesa('');
      setDespesaRepete(false);
      setDespesaSempre(false);
      setDespesaMeses('');
      loadLancamentos();
    } else {
      Alert.alert('❌ Erro', 'Não foi possível adicionar a despesa');
    }
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
    Alert.alert('❌ Erro', 'Ocorreu um erro ao adicionar despesa');
  }
};

  const handleDelete = (id, nome, valor, tipo) => {
    Alert.alert(
      '🗑️ Confirmar Exclusão',
      `Deseja realmente excluir este lançamento?\n\n${nome}\nR$ ${parseFloat(valor).toFixed(2)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await deleteLancamento(id);
              if (success) {
                Alert.alert('✅ Sucesso', 'Lançamento excluído com sucesso!');
                loadLancamentos(); // Recarregar lista
              } else {
                Alert.alert('❌ Erro', 'Não foi possível excluir o lançamento');
              }
            } catch (error) {
              console.error('Erro ao deletar:', error);
              Alert.alert('❌ Erro', 'Ocorreu um erro ao excluir');
            }
          }
        }
      ]
    );
  };

  const saldo = totalReceitas - totalDespesas;
  const percentualGasto = totalReceitas > 0 ? (totalDespesas / totalReceitas) * 100 : 0;

  const getPercentualStatus = () => {
    if (percentualGasto <= 50) return { text: '✅ Excelente!', color: '#38A169', desc: 'Gastos controlados' };
    if (percentualGasto <= 70) return { text: '⚠️ Atenção', color: '#F59E0B', desc: 'Cuidado com os gastos' };
    if (percentualGasto <= 90) return { text: '🚨 Risco', color: '#E53E3E', desc: 'Gastos altos' };
    return { text: '🔴 Crítico', color: '#C53030', desc: 'Gastando mais que ganha!' };
  };

  const status = getPercentualStatus();

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

  const renderAnoButton = (ano) => (
    <TouchableOpacity
      key={ano}
      style={[
        relatorioStyles.anoButton,
        anoSelecionado === ano && relatorioStyles.anoButtonActive
      ]}
      onPress={() => setAnoSelecionado(ano)}
      >
      
      <Text style={[
        relatorioStyles.anoButtonText,
        anoSelecionado === ano && relatorioStyles.anoButtonTextActive
      ]}>{ano}
      </Text>

    </TouchableOpacity>
  )

  const renderLancamento = ({ item }) => (
    <View style={relatorioStyles.lancamento}>
      <View style={relatorioStyles.lancamentoHeader}>
        <View style={[
          relatorioStyles.tipoIndicator,
          { backgroundColor: item.tipo === 'receita' ? colors.success : colors.error}
        ]} />
        <View style={relatorioStyles.lancamento}>
          <Text style={relatorioStyles.lancamentoNome}>{item.nome}</Text>
          <Text style={relatorioStyles.lancamentoData}>
            {new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}
          </Text>
        </View>
        <View style={relatorioStyles.lancamentoValorContainer}>
          <Text style={[
            relatorioStyles.lancamentoValor,
            { color: item.tipo === 'receita' ? colors.success : colors.error }
          ]}>
            {item.tipo === 'receita' ? '+' : '-'} R$ {parseFloat(item.valor).toFixed(2)}
          </Text>
          <TouchableOpacity 
            style={relatorioStyles.deleteButton}
            onPress={() => handleDelete(item.id, item.nome, item.valor, item.tipo)}
          >
            <Text style={relatorioStyles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
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
          {renderPeriodoButton('mesAnterior', 'Últimos mês')}
          {renderPeriodoButton('semana', 'Últimos 7 dias')}
          {renderPeriodoButton('mes', 'Este mês')}
          {renderPeriodoButton('todos', 'Tudo')}
        </View>
      </View>


      <ScrollView style={relatorioStyles.scrollContent}>
        {/* Filtro de Ano */}
      {periodoSelecionado === 'todos' && anosDisponiveis.length > 0 && (
        <View style = {relatorioStyles.anoFilterCard}>
          <Text style={relatorioStyles.anoFilterLabel}>Ano:</Text>
          <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={relatorioStyles.anoButtonScroll}
          >
            {anosDisponiveis.map(ano => renderAnoButton(ano))}
          </ScrollView>
        </View>
      )}

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

        {/* Seção de Adicionar Renda */}
        <View style={relatorioStyles.adicionarContainer}>
          <Text style={relatorioStyles.adicionarTitle}>➕ Adicionar Renda</Text>
          <TextInput
            style={relatorioStyles.input}
            placeholder="Descrição (ex: Salário)"
            placeholderTextColor="#999"
            value={nomeRenda}
            onChangeText={setNomeRenda}
          />
          <TextInput
            style={relatorioStyles.input}
            placeholder="Valor (ex: 2500.00)"
            placeholderTextColor="#999"
            value={valorRenda}
            onChangeText={setValorRenda}
            keyboardType="decimal-pad"
          />

          {/*  Checkbox Repete */}
          <View style={relatorioStyles.checkboxContainer}>
            <TouchableOpacity 
              style={relatorioStyles.checkboxWrapper}
              onPress={() => setRendaRepete(!rendaRepete)}
            >
              <View style={[
                relatorioStyles.checkbox,
                rendaRepete && relatorioStyles.checkboxChecked
              ]}>
                {rendaRepete && <Text style={relatorioStyles.checkmarkText}>✓</Text>}
              </View>
              <Text style={relatorioStyles.checkboxLabel}>Esta renda se repete?</Text>
            </TouchableOpacity>
          </View>

          {/*  Opções de Repetição */}
          {rendaRepete && (
            <View style={relatorioStyles.repeteOptionsContainer}>
              {/* Checkbox Repete Sempre */}
              <TouchableOpacity 
                style={relatorioStyles.checkboxWrapper}
                onPress={() => {
                  setRendaSempre(!rendaSempre);
                  if (!rendaSempre) setRendaMeses(''); // Limpa meses se marcar sempre
                }}
              >
                <View style={[
                  relatorioStyles.checkbox,
                  rendaSempre && relatorioStyles.checkboxChecked
                ]}>
                  {rendaSempre && <Text style={relatorioStyles.checkmarkText}>✓</Text>}
                </View>
                <Text style={relatorioStyles.checkboxLabel}>Repete sempre</Text>
              </TouchableOpacity>

              {/* Input Repete Durante X Meses */}
              {!rendaSempre && (
                <View style={relatorioStyles.mesesContainer}>
                  <Text style={relatorioStyles.mesesLabel}>Repete durante:</Text>
                  <TextInput
                    style={relatorioStyles.inputMeses}
                    placeholder="0"
                    placeholderTextColor="#999"
                    value={rendaMeses}
                    onChangeText={setRendaMeses}
                    keyboardType="number-pad"
                  />
                  <Text style={relatorioStyles.mesesLabel}>meses</Text>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            style={[relatorioStyles.botaoAdicionar, { backgroundColor: colors.success }]}
            onPress={handleAddRenda}
          >
            <Text style={relatorioStyles.botaoAdicionarText}>💰 Adicionar Renda</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Adicionar Despesa */}
        <View style={relatorioStyles.adicionarContainer}>
          <Text style={relatorioStyles.adicionarTitle}>➕ Adicionar Despesa</Text>
          <TextInput
            style={relatorioStyles.input}
            placeholder="Descrição (ex: Alimentação)"
            placeholderTextColor="#999"
            value={nomeDespesa}
            onChangeText={setNomeDespesa}
          />
          <TextInput
            style={relatorioStyles.input}
            placeholder="Valor (ex: 150.00)"
            placeholderTextColor="#999"
            value={valorDespesa}
            onChangeText={setValorDespesa}
            keyboardType="decimal-pad"
          />

          {/* Checkbox Repete */}
          <View style={relatorioStyles.checkboxContainer}>
            <TouchableOpacity 
              style={relatorioStyles.checkboxWrapper}
              onPress={() => setDespesaRepete(!despesaRepete)}
            >
              <View style={[
                relatorioStyles.checkbox,
                despesaRepete && relatorioStyles.checkboxChecked
              ]}>
                {despesaRepete && <Text style={relatorioStyles.checkmarkText}>✓</Text>}
              </View>
              <Text style={relatorioStyles.checkboxLabel}>Esta despesa se repete?</Text>
            </TouchableOpacity>
          </View>

          {/* Opções de Repetição */}
          {despesaRepete && (
            <View style={relatorioStyles.repeteOptionsContainer}>
              {/* Checkbox Repete Sempre */}
              <TouchableOpacity 
                style={relatorioStyles.checkboxWrapper}
                onPress={() => {
                  setDespesaSempre(!despesaSempre);
                  if (!despesaSempre) setDespesaMeses(''); // Limpa meses se marcar sempre
                }}
              >
                <View style={[
                  relatorioStyles.checkbox,
                  despesaSempre && relatorioStyles.checkboxChecked
                ]}>
                  {despesaSempre && <Text style={relatorioStyles.checkmarkText}>✓</Text>}
                </View>
                <Text style={relatorioStyles.checkboxLabel}>Repete sempre</Text>
              </TouchableOpacity>

              {/* Input Repete Durante X Meses */}
              {!despesaSempre && (
                <View style={relatorioStyles.mesesContainer}>
                  <Text style={relatorioStyles.mesesLabel}>Repete durante:</Text>
                  <TextInput
                    style={relatorioStyles.inputMeses}
                    placeholder="0"
                    placeholderTextColor="#999"
                    value={despesaMeses}
                    onChangeText={setDespesaMeses}
                    keyboardType="number-pad"
                  />
                  <Text style={relatorioStyles.mesesLabel}>meses</Text>
                </View>
              )}
            </View>
          )}

          <TouchableOpacity
            style={[relatorioStyles.botaoAdicionar, { backgroundColor: colors.error }]}
            onPress={handleAddDespesa}
          >
            <Text style={relatorioStyles.botaoAdicionarText}>💸 Adicionar Despesa</Text>
          </TouchableOpacity>
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

            {/* Detalhamento */}
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

        {/* Lista de Lançamentos */}
        <View style={relatorioStyles.listaContainer}>
          <Text style={relatorioStyles.listaTitle}>
            📋 Lançamentos ({lancamentos.length})
          </Text>
          
          {lancamentos.length > 0 ? (
            <FlatList
              data={lancamentos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderLancamento}
              scrollEnabled={false}
            />
          ) : (
            <View style={relatorioStyles.emptyContainer}>
              <Text style={relatorioStyles.emptyText}>📭</Text>
              <Text style={relatorioStyles.emptyTitle}>Nenhum lançamento</Text>
              <Text style={relatorioStyles.emptySubtitle}>
                Adicione uma receita ou despesa para visualizar seus lançamentos
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}