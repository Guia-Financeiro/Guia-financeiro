import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { addLancamento } from '../../repository/Database';
import { gastosStyles } from './gastosStyle';

const CalculoGastosScreen = ({ navigation }) => {
  const [resultado, setResultado] = useState(null);
  
  const [renda, setRenda] = useState('');
  const [rendaRepete, setRendaRepete] = useState(false);
  const [rendaSempre, setRendaSempre] = useState(false);
  const [rendaMeses, setRendaMeses] = useState('');

  const [despesas, setDespesas] = useState([{ id: 1, nome: '', valor: '' }]);
  
  // ✅ Estados para controlar repetição de CADA despesa
  const [despesaRepete, setDespesaRepete] = useState({});
  const [despesaSempre, setDespesaSempre] = useState({});
  const [despesaMeses, setDespesaMeses] = useState({});
  
  // Estados para controlar o que será salvo
  const [salvarRenda, setSalvarRenda] = useState(false);
  const [despesasSelecionadas, setDespesasSelecionadas] = useState({});

  const renderCheckbox = (value) => (
    <View style={[gastosStyles.checkbox, value && gastosStyles.checkboxChecked]}>
      {value && <Text style={gastosStyles.checkboxIcon}>✓</Text>}
    </View>
  );

  const addDespesa = () => {
    setDespesas([...despesas, { id: Date.now(), nome: '', valor: '' }]);
  };

  const removeDespesa = (id) => {
    if (despesas.length === 1) {
      Alert.alert('Atenção', 'Deve haver pelo menos uma despesa');
      return;
    }
    setDespesas(despesas.filter(item => item.id !== id));
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

    setSalvarRenda(false);
    setDespesasSelecionadas({});
  };

  const toggleDespesaSelecionada = (id) => {
    setDespesasSelecionadas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // ✅ CORRIGIDO: Função para adicionar lançamento repetido
  const addLancamentoRepetido = async (nome, valor, tipo, repete, repete_sempre, repete_meses) => {
    try {
      const hoje = new Date();
      let adicionado = false;

      if (repete) {
        if (repete_sempre) {
          // Adiciona para os próximos 12 meses
          for (let i = 0; i < 12; i++) {
            const data = new Date(hoje);
            data.setMonth(data.getMonth() + i);
            const dataStr = data.toISOString().split('T')[0];

            const success = await addLancamento({
              nome: nome,
              valor: parseFloat(valor),
              tipo: tipo,
              data: dataStr,
              repete: 1,
              repete_sempre: 1,
              repete_meses: 0
            });
            if (success) adicionado = true;
          }
        } else if (repete_meses && repete_meses > 0) {
          // Adiciona pela quantidade de meses especificada
          for (let i = 0; i < repete_meses; i++) {
            const data = new Date(hoje);
            data.setMonth(data.getMonth() + i);
            const dataStr = data.toISOString().split('T')[0];

            const success = await addLancamento({
              nome: nome,
              valor: parseFloat(valor),
              tipo: tipo,
              data: dataStr,
              repete: 1,
              repete_sempre: 0,
              repete_meses: repete_meses
            });
            if (success) adicionado = true;
          }
        }
      } else {
        // Apenas uma vez
        const dataStr = hoje.toISOString().split('T')[0];
        const success = await addLancamento({
          nome: nome,
          valor: parseFloat(valor),
          tipo: tipo,
          data: dataStr,
          repete: 0,
          repete_sempre: 0,
          repete_meses: 0
        });
        if (success) adicionado = true;
      }

      return adicionado;
    } catch (error) {
      console.error('Erro ao adicionar lançamentos repetidos:', error);
      return false;
    }
  };

  const limparFormulario = () => {
    setRenda('');
    setDespesas([{ id: 1, nome: '', valor: '' }]);
    setResultado(null);
    setSalvarRenda(false);
    setDespesasSelecionadas({});
    setRendaRepete(false);
    setRendaSempre(false);
    setRendaMeses('');
    setDespesaRepete({});
    setDespesaSempre({});
    setDespesaMeses({});
  };

  // ✅ CORRIGIDO: handleSalvarLancamentos sem duplicação
  const handleSalvarLancamentos = async () => {
    if (!resultado) {
      Alert.alert('Atenção', 'Calcule os gastos antes de salvar!');
      return;
    }

    const temDespesaSelecionada = Object.values(despesasSelecionadas).some(v => v === true);
    
    if (!salvarRenda && !temDespesaSelecionada) {
      Alert.alert(
        '⚠️ Nenhum item selecionado',
        'Selecione pelo menos a renda ou uma despesa para salvar.'
      );
      return;
    }

    try {
      let salvos = 0;
      const itensSalvos = [];

      // Salvar renda com repetição
      if (salvarRenda && renda && parseFloat(renda) > 0) {
        const success = await addLancamentoRepetido(
          'Renda Mensal',
          parseFloat(renda),
          'receita',
          rendaRepete,
          rendaSempre,
          parseInt(rendaMeses) || 0
        );
        if (success) {
          salvos++;
          const msg = rendaRepete 
            ? (rendaSempre ? ' (12 meses)' : ` (${rendaMeses} meses)`)
            : '';
          itensSalvos.push(`Renda${msg}`);
        }
      }

      // Salvar despesas com repetição
      for (const despesa of despesas) {
        if (despesasSelecionadas[despesa.id] && despesa.nome && despesa.valor && parseFloat(despesa.valor) > 0) {
          const despesaRepeteValue = despesaRepete[despesa.id] || false;
          const despesaSempreValue = despesaSempre[despesa.id] || false;
          const despesaMesesValue = parseInt(despesaMeses[despesa.id]) || 0;

          const success = await addLancamentoRepetido(
            despesa.nome,
            parseFloat(despesa.valor),
            'despesa',
            despesaRepeteValue,
            despesaSempreValue,
            despesaMesesValue
          );

          if (success) {
            salvos++;
            const msg = despesaRepeteValue
              ? (despesaSempreValue ? ' (12 meses)' : ` (${despesaMesesValue} meses)`)
              : '';
            itensSalvos.push(`${despesa.nome}${msg}`);
          }
        }
      }

      if (salvos > 0) {
        Alert.alert(
          '✅ Sucesso!', 
          `${salvos} lançamento(s) salvos:\n${itensSalvos.join('\n')}`,
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
      } else {
        Alert.alert('⚠️ Atenção', 'Nenhum lançamento foi salvo');
      }
    } catch (error) {
      console.error('Erro ao salvar lançamentos:', error);
      Alert.alert('Erro', 'Não foi possível salvar os lançamentos');
    }
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

          {getSaldoStatus() && (
            <View style={[gastosStyles.statusCard, { backgroundColor: getSaldoStatus().color + '20' }]}>
              <Text style={[gastosStyles.statusText, { color: getSaldoStatus().color }]}>
                {getSaldoStatus().text}
              </Text>
            </View>
          )}

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

          <View style={gastosStyles.selecaoContainer}>
            <Text style={gastosStyles.selecaoTitle}>💾 Selecione o que deseja salvar:</Text>

            <TouchableOpacity 
              style={gastosStyles.checkboxItem}
              onPress={() => setSalvarRenda(!salvarRenda)}
            >
              {renderCheckbox(salvarRenda)}
              <View style={gastosStyles.checkboxContent}>
                <Text style={gastosStyles.checkboxLabel}>Renda Mensal</Text>
                <Text style={gastosStyles.checkboxValor}>R$ {parseFloat(renda).toFixed(2)}</Text>
              </View>
            </TouchableOpacity>

            {salvarRenda && (
              <View style={gastosStyles.repeteOptionsContainer}>
                <TouchableOpacity 
                  style={gastosStyles.checkboxItem}
                  onPress={() => {
                    setRendaRepete(!rendaRepete);
                    if (!rendaRepete) setRendaSempre(false);
                  }}
                >
                  {renderCheckbox(rendaRepete)}
                  <Text style={gastosStyles.checkboxLabel}>Esta renda se repete?</Text>
                </TouchableOpacity>

                {rendaRepete && (
                  <>
                    <TouchableOpacity 
                      style={gastosStyles.checkboxItem}
                      onPress={() => setRendaSempre(!rendaSempre)}
                    >
                      {renderCheckbox(rendaSempre)}
                      <Text style={gastosStyles.checkboxLabel}>Repete sempre</Text>
                    </TouchableOpacity>

                    {!rendaSempre && (
                      <View style={gastosStyles.mesesInputContainer}>
                        <Text style={gastosStyles.checkboxLabel}>Repete durante:</Text>
                        <TextInput
                          style={gastosStyles.inputMeses}
                          placeholder="0"
                          placeholderTextColor="#999"
                          value={rendaMeses}
                          onChangeText={setRendaMeses}
                          keyboardType="number-pad"
                        />
                        <Text style={gastosStyles.checkboxLabel}>meses</Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            )}

            {despesas.map((despesa) => {
              const isValida = despesa.nome && despesa.valor && parseFloat(despesa.valor) > 0;
              if (!isValida) return null;

              return (
                <View key={despesa.id}>
                  <TouchableOpacity 
                    style={gastosStyles.checkboxItem}
                    onPress={() => toggleDespesaSelecionada(despesa.id)}
                  >
                    {renderCheckbox(despesasSelecionadas[despesa.id])}
                    <View style={gastosStyles.checkboxContent}>
                      <Text style={gastosStyles.checkboxLabel}>{despesa.nome}</Text>
                      <Text style={[gastosStyles.checkboxValor, gastosStyles.despesaColor]}>
                        R$ {parseFloat(despesa.valor).toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {despesasSelecionadas[despesa.id] && (
                    <View style={gastosStyles.repeteOptionsContainer}>
                      <TouchableOpacity 
                        style={gastosStyles.checkboxItem}
                        onPress={() => {
                          setDespesaRepete(prev => ({
                            ...prev,
                            [despesa.id]: !prev[despesa.id]
                          }));
                          if (!despesaRepete[despesa.id]) {
                            setDespesaSempre(prev => ({ ...prev, [despesa.id]: false }));
                          }
                        }}
                      >
                        {renderCheckbox(despesaRepete[despesa.id])}
                        <Text style={gastosStyles.checkboxLabel}>Esta despesa se repete?</Text>
                      </TouchableOpacity>

                      {despesaRepete[despesa.id] && (
                        <>
                          <TouchableOpacity 
                            style={gastosStyles.checkboxItem}
                            onPress={() => setDespesaSempre(prev => ({
                              ...prev,
                              [despesa.id]: !prev[despesa.id]
                            }))}
                          >
                            {renderCheckbox(despesaSempre[despesa.id])}
                            <Text style={gastosStyles.checkboxLabel}>Repete sempre</Text>
                          </TouchableOpacity>

                          {!despesaSempre[despesa.id] && (
                            <View style={gastosStyles.mesesInputContainer}>
                              <Text style={gastosStyles.checkboxLabel}>Repete durante:</Text>
                              <TextInput
                                style={gastosStyles.inputMeses}
                                placeholder="0"
                                placeholderTextColor="#999"
                                value={despesaMeses[despesa.id] || ''}
                                onChangeText={(text) => setDespesaMeses(prev => ({
                                  ...prev,
                                  [despesa.id]: text
                                }))}
                                keyboardType="number-pad"
                              />
                              <Text style={gastosStyles.checkboxLabel}>meses</Text>
                            </View>
                          )}
                        </>
                      )}
                    </View>
                  )}
                </View>
              );
            })}
          </View>

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