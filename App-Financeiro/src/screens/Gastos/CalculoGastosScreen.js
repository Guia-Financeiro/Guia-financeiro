import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { addLancamento } from '../../repository/Database';
import { gastosStyles } from './gastosStyle';

const CalculoGastosScreen = ({ navigation }) => {
  const [renda, setRenda] = useState('');
  const [despesas, setDespesas] = useState([{ id: 1, nome: '', valor: '' }]);
  const [resultado, setResultado] = useState(null);
  
  //Estados para controlar o que será salvo
  const [salvarRenda, setSalvarRenda] = useState(false);
  const [despesasSelecionadas, setDespesasSelecionadas] = useState({});

  const addDespesa = () => {
    setDespesas([...despesas, { id: Date.now(), nome: '', valor: '' }]);
  };

  const removeDespesa = (id) => {
    if (despesas.length === 1) {
      Alert.alert('Atenção', 'Deve haver pelo menos uma despesa');
      return;
    }
    setDespesas(despesas.filter(item => item.id !== id));
    // Remove da seleção também
    const novaSelecao = { ...despesasSelecionadas };
    delete novaSelecao[id];
    setDespesasSelecionadas(novaSelecao);
  };

  const handleDespesaChange = (id, field, value) => {
    const newDespesas = despesas.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setDespesas(newDespesas);
  };

  const handleCalcular = () => {
    const rendaNum = parseFloat(renda);
    
    if (!renda || isNaN(rendaNum) || rendaNum <= 0) {
      Alert.alert("Erro", "Por favor, insira uma renda válida.");
      return;
    }

    const totalDespesas = despesas.reduce((acc, item) => {
      const valorNum = parseFloat(item.valor);
      return acc + (isNaN(valorNum) ? 0 : valorNum);
    }, 0);
    
    const saldo = rendaNum - totalDespesas;
    const percentual = (totalDespesas / rendaNum) * 100;

    setResultado({
      totalDespesas: totalDespesas.toFixed(2),
      saldo: saldo.toFixed(2),
      percentual: percentual.toFixed(1)
    });

    // ✅ Reset seleções ao calcular
    setSalvarRenda(false);
    setDespesasSelecionadas({});
  };

  const toggleDespesaSelecionada = (id) => {
    setDespesasSelecionadas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSalvarLancamentos = async () => {
    if (!resultado) {
      Alert.alert('Atenção', 'Calcule os gastos antes de salvar!');
      return;
    }

    // Verificar se ao menos um item foi selecionado
    const temDespesaSelecionada = Object.values(despesasSelecionadas).some(v => v === true);
    
    if (!salvarRenda && !temDespesaSelecionada) {
      Alert.alert(
        '⚠️ Nenhum item selecionado',
        'Selecione pelo menos a renda ou uma despesa para salvar.'
      );
      return;
    }

    try {
      const hoje = new Date().toISOString().split('T')[0];
      let salvos = 0;
      const itensSalvos = [];
      
      // Salvar renda se selecionada
      if (salvarRenda && renda && parseFloat(renda) > 0) {
        await addLancamento('receita', 'Renda Mensal', parseFloat(renda), hoje);
        salvos++;
        itensSalvos.push('Renda');
      }

      // Salvar apenas despesas selecionadas
      for (const despesa of despesas) {
        if (despesasSelecionadas[despesa.id] && despesa.nome && despesa.valor && parseFloat(despesa.valor) > 0) {
          await addLancamento('despesa', despesa.nome, parseFloat(despesa.valor), hoje);
          salvos++;
          itensSalvos.push(despesa.nome);
        }
      }

      if (salvos > 0) {
        Alert.alert(
          '✅ Sucesso!', 
          `${salvos} lançamento(s) salvos:\n${itensSalvos.join(', ')}`,
          [
            { 
              text: 'Ver Relatório', 
              onPress: () => {
                limparFormulario();
                navigation.navigate('Relatório');
              }
            },
            { 
              text: 'Nova Simulação', 
              onPress: () => limparFormulario()
            }
          ]
        );
      }

    } catch (error) {
      console.error('Erro ao salvar lançamentos:', error);
      Alert.alert('Erro', 'Não foi possível salvar os lançamentos');
    }
  };

  const limparFormulario = () => {
    setRenda('');
    setDespesas([{ id: 1, nome: '', valor: '' }]);
    setResultado(null);
    setSalvarRenda(false);
    setDespesasSelecionadas({});
  };

  const handleLimpar = () => {
    Alert.alert(
      'Limpar Formulário',
      'Deseja limpar todos os dados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpar', 
          style: 'destructive',
          onPress: limparFormulario
        }
      ]
    );
  };

  const getSaldoStatus = () => {
    if (!resultado) return null;
    const saldo = parseFloat(resultado.saldo);
    if (saldo > 0) return { text: '💰 Sobrou dinheiro!', color: '#38A169' };
    if (saldo === 0) return { text: '⚖️ Saldo zerado', color: '#3182ce' };
    return { text: '⚠️ Gastou mais que ganhou!', color: '#E53E3E' };
  };

  const getPercentualStatus = () => {
    if (!resultado) return null;
    const perc = parseFloat(resultado.percentual);
    if (perc <= 50) return { text: '✅ Excelente!', color: '#38A169' };
    if (perc <= 70) return { text: '⚠️ Atenção', color: '#F59E0B' };
    return { text: '🚨 Risco alto!', color: '#E53E3E' };
  };

  return (
    <ScrollView style={gastosStyles.container} contentContainerStyle={gastosStyles.contentContainer}>
      <View style={gastosStyles.header}>
        <Text style={gastosStyles.headerTitle}>💰 Planejamento Financeiro</Text>
        <Text style={gastosStyles.headerSubtitle}>Simule seus gastos mensais</Text>
      </View>

      {/* Renda */}
      <View style={gastosStyles.section}>
        <Text style={gastosStyles.sectionTitle}>💵 Renda Mensal</Text>
        <TextInput 
          style={gastosStyles.input} 
          value={renda} 
          onChangeText={setRenda} 
          keyboardType="numeric" 
          placeholder="Ex: 3500.00" 
          placeholderTextColor="#999"
        />
      </View>

      {/* Despesas */}
      <View style={gastosStyles.section}>
        <View style={gastosStyles.sectionHeader}>
          <Text style={gastosStyles.sectionTitle}>📋 Despesas Fixas</Text>
          <TouchableOpacity style={gastosStyles.addButtonSmall} onPress={addDespesa}>
            <Text style={gastosStyles.addButtonSmallText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {despesas.map((item, index) => (
          <View key={item.id} style={gastosStyles.despesaItem}>
            <View style={gastosStyles.despesaNumber}>
              <Text style={gastosStyles.despesaNumberText}>{index + 1}</Text>
            </View>
            <View style={gastosStyles.despesaInputs}>
              <TextInput 
                style={[gastosStyles.input, gastosStyles.despesaInputNome]} 
                placeholder="Nome da despesa" 
                placeholderTextColor="#999"
                value={item.nome} 
                onChangeText={(text) => handleDespesaChange(item.id, 'nome', text)} 
              />
              <TextInput 
                style={[gastosStyles.input, gastosStyles.despesaInputValor]} 
                placeholder="Valor" 
                placeholderTextColor="#999"
                value={item.valor} 
                onChangeText={(text) => handleDespesaChange(item.id, 'valor', text)} 
                keyboardType="numeric" 
              />
            </View>
            {despesas.length > 1 && (
              <TouchableOpacity 
                style={gastosStyles.removeButton}
                onPress={() => removeDespesa(item.id)}
              >
                <Text style={gastosStyles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* Botões de Ação */}
      <View style={gastosStyles.actionButtons}>
        <TouchableOpacity 
          style={[gastosStyles.button, gastosStyles.buttonSecondary]} 
          onPress={handleLimpar}
        >
          <Text style={gastosStyles.buttonSecondaryText}>🗑️ Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[gastosStyles.button, gastosStyles.buttonPrimary]} 
          onPress={handleCalcular}
        >
          <Text style={gastosStyles.buttonPrimaryText}>🧮 Calcular</Text>
        </TouchableOpacity>
      </View>

      {/* Resultado */}
      {resultado && (
        <View style={gastosStyles.resultadoContainer}>
          <Text style={gastosStyles.resultadoTitle}>📊 Resumo Financeiro</Text>

          <View style={gastosStyles.resultadoCard}>
            <View style={gastosStyles.resultadoRow}>
              <Text style={gastosStyles.resultadoLabel}>Renda Mensal:</Text>
              <Text style={[gastosStyles.resultadoValor, gastosStyles.receitaColor]}>
                R$ {parseFloat(renda).toFixed(2)}
              </Text>
            </View>

            <View style={[gastosStyles.resultadoRow, gastosStyles.resultadoRowBorder]}>
              <Text style={gastosStyles.resultadoLabel}>Total de Despesas:</Text>
              <Text style={[gastosStyles.resultadoValor, gastosStyles.despesaColor]}>
                R$ {resultado.totalDespesas}
              </Text>
            </View>

            <View style={gastosStyles.resultadoRow}>
              <Text style={gastosStyles.resultadoLabelBold}>Saldo Restante:</Text>
              <Text style={[
                gastosStyles.resultadoValorBold, 
                parseFloat(resultado.saldo) >= 0 ? gastosStyles.receitaColor : gastosStyles.despesaColor
              ]}>
                R$ {resultado.saldo}
              </Text>
            </View>
          </View>

          {/* Status do Saldo */}
          {getSaldoStatus() && (
            <View style={[gastosStyles.statusCard, { backgroundColor: getSaldoStatus().color + '20' }]}>
              <Text style={[gastosStyles.statusText, { color: getSaldoStatus().color }]}>
                {getSaldoStatus().text}
              </Text>
            </View>
          )}

          {/* Comprometimento */}
          <View style={gastosStyles.comprometimentoCard}>
            <Text style={gastosStyles.comprometimentoLabel}>Comprometimento da Renda</Text>
            <Text style={[
              gastosStyles.comprometimentoValor,
              parseFloat(resultado.percentual) > 70 ? gastosStyles.alertColor : gastosStyles.normalColor
            ]}>
              {resultado.percentual}%
            </Text>
            {getPercentualStatus() && (
              <Text style={[gastosStyles.comprometimentoStatus, { color: getPercentualStatus().color }]}>
                {getPercentualStatus().text}
              </Text>
            )}
          </View>

          {/* ✅ NOVO: Seção de Seleção para Salvar */}
          <View style={gastosStyles.selecaoContainer}>
            <Text style={gastosStyles.selecaoTitle}>💾 Selecione o que deseja salvar:</Text>

            {/* Checkbox Renda */}
            <TouchableOpacity 
              style={gastosStyles.checkboxItem}
              onPress={() => setSalvarRenda(!salvarRenda)}
            >
              <View style={[gastosStyles.checkbox, salvarRenda && gastosStyles.checkboxChecked]}>
                {salvarRenda && <Text style={gastosStyles.checkboxIcon}>✓</Text>}
              </View>
              <View style={gastosStyles.checkboxContent}>
                <Text style={gastosStyles.checkboxLabel}>Renda Mensal</Text>
                <Text style={gastosStyles.checkboxValor}>R$ {parseFloat(renda).toFixed(2)}</Text>
              </View>
            </TouchableOpacity>

            {/* Checkboxes Despesas */}
            {despesas.map((despesa, index) => {
              const isValida = despesa.nome && despesa.valor && parseFloat(despesa.valor) > 0;
              if (!isValida) return null;

              return (
                <TouchableOpacity 
                  key={despesa.id}
                  style={gastosStyles.checkboxItem}
                  onPress={() => toggleDespesaSelecionada(despesa.id)}
                >
                  <View style={[
                    gastosStyles.checkbox, 
                    despesasSelecionadas[despesa.id] && gastosStyles.checkboxChecked
                  ]}>
                    {despesasSelecionadas[despesa.id] && (
                      <Text style={gastosStyles.checkboxIcon}>✓</Text>
                    )}
                  </View>
                  <View style={gastosStyles.checkboxContent}>
                    <Text style={gastosStyles.checkboxLabel}>{despesa.nome}</Text>
                    <Text style={[gastosStyles.checkboxValor, gastosStyles.despesaColor]}>
                      R$ {parseFloat(despesa.valor).toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Botão Salvar */}
          <TouchableOpacity 
            style={gastosStyles.saveButton}
            onPress={handleSalvarLancamentos}
          >
            <Text style={gastosStyles.saveButtonText}>💾 Salvar Selecionados</Text>
          </TouchableOpacity>

          <Text style={gastosStyles.infoText}>
            ℹ️ Os lançamentos serão salvos com a data de hoje
          </Text>
        </View>
      )}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default CalculoGastosScreen;