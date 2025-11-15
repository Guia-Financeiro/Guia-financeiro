import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, TextInput, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getLancamentos, deleteLancamento, updateLancamento, addLancamento } from '../../repository/Database';
import { gerenciarStyles } from './gerenciarStyle';
import { colors } from '../../theme/Theme';
import DropDownPicker from 'react-native-dropdown-picker';

const ITEMS_PER_PAGE = 15;

export default function GerenciarScreen() {
  // Estados principais
  const [todosLancamentos, setTodosLancamentos] = useState([]);
  const [lancamentosExibidos, setLancamentosExibidos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  
  // Estados para os modais
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
  const [lancamentoEmEdicao, setLancamentoEmEdicao] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const [valorEditado, setValorEditado] = useState('');

  // Estados para adicionar novo lançamento
  const [tipoLancamento, setTipoLancamento] = useState('receita');
  const [nomeAdicionar, setNomeAdicionar] = useState('');
  const [valorAdicionar, setValorAdicionar] = useState('');
  const [anoAdicionar, setAnoAdicionar] = useState(new Date().getFullYear().toString());
  const [mesAdicionar, setMesAdicionar] = useState(new Date().getMonth());
  const [diaAdicionar, setDiaAdicionar] = useState(new Date().getDate().toString());
  const [openMesAdicionarDropdown, setOpenMesAdicionarDropdown] = useState(false);
  
  // Estados para repetição de lançamentos
  const [rendaRepete, setRendaRepete] = useState(false);
  const [rendaSempre, setRendaSempre] = useState(false);
  const [rendaMeses, setRendaMeses] = useState('');

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
      loadLancamentos(filtroTipo);
    }, [filtroTipo])
  );

  const loadLancamentos = useCallback(async (tipoFiltro = filtroTipo) => {
    try {
      // Carrega todos os lançamentos do banco de dados
      const dados = await getLancamentos();
      setTodosLancamentos(dados || []);
      setPaginaAtual(1);
      setIsSelectMode(false);
      setSelectedItems(new Set());
      
      // Aplica filtros e ordena por data (mais recentes primeiro)
      let filtrados = dados || [];
      if (tipoFiltro !== 'todos') {
        filtrados = filtrados.filter(item => item.tipo === tipoFiltro);
      }
      
      filtrados = filtrados.sort((a, b) => new Date(b.data) - new Date(a.data));
      
      // Pagina os resultados (15 itens por página)
      const paginada = filtrados.slice(0, ITEMS_PER_PAGE);
      setLancamentosExibidos(paginada);
    } catch (error) {
      console.error('Erro ao carregar lançamentos:', error);
      Alert.alert('❌ Erro', 'Não foi possível carregar os lançamentos');
    }
  }, [filtroTipo]);

  // Aplica filtros, ordenação e paginação aos lançamentos
  const aplicarFiltros = (dados, pagina = 1, tipo = filtroTipo) => {
    let filtrados = dados;

    // Filtra por tipo (todos, receita ou despesa)
    if (tipo !== 'todos') {
      filtrados = filtrados.filter(item => item.tipo === tipo);
    }

    // Ordena por data decrescente (mais recentes primeiro)
    filtrados = filtrados.sort((a, b) => new Date(b.data) - new Date(a.data));

    // Pagina os dados (15 itens por página)
    const inicio = (pagina - 1) * ITEMS_PER_PAGE;
    const fim = inicio + ITEMS_PER_PAGE;
    const paginada = filtrados.slice(inicio, fim);

    setLancamentosExibidos(paginada);
    setPaginaAtual(pagina);
    setSelectedItems(new Set());
  };

  // Altera o filtro de tipo e recarrega os lançamentos
  const handleChangeFilter = (tipo) => {
    setFiltroTipo(tipo);
    // Aplica os filtros com os dados atuais
    let filtrados = todosLancamentos;
    if (tipo !== 'todos') {
      filtrados = filtrados.filter(item => item.tipo === tipo);
    }
    filtrados = filtrados.sort((a, b) => new Date(b.data) - new Date(a.data));
    const paginada = filtrados.slice(0, ITEMS_PER_PAGE);
    setLancamentosExibidos(paginada);
    setPaginaAtual(1);
    setSelectedItems(new Set());
  };

  // Alterna seleção de um item individual
  const toggleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  // Seleciona ou desseleciona todos os itens da página atual
  const selectAllPage = () => {
    if (selectedItems.size === lancamentosExibidos.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(lancamentosExibidos.map(item => item.id)));
    }
  };

  // Abre o modal de edição com os dados do lançamento selecionado
  const abrirModalEdicao = (lancamento) => {
    setLancamentoEmEdicao(lancamento);
    setNomeEditado(lancamento.nome);
    setValorEditado(lancamento.valor.toString());
    setModalEditVisible(true);
  };

  // Valida e atualiza um lançamento no banco de dados
  const handleEditarLancamento = async () => {
    if (!nomeEditado.trim()) {
      Alert.alert('❌ Erro', 'Nome não pode ser vazio');
      return;
    }
    if (!valorEditado.trim() || isNaN(parseFloat(valorEditado))) {
      Alert.alert('❌ Erro', 'Valor inválido');
      return;
    }

    try {
      const sucesso = await updateLancamento(lancamentoEmEdicao.id, {
        nome: nomeEditado,
        valor: parseFloat(valorEditado),
        tipo: lancamentoEmEdicao.tipo,
        data: lancamentoEmEdicao.data
      });

      if (sucesso) {
        Alert.alert('✅ Sucesso', 'Lançamento atualizado com sucesso!');
        setModalEditVisible(false);
        loadLancamentos();
      } else {
        Alert.alert('❌ Erro', 'Não foi possível atualizar o lançamento');
      }
    } catch (error) {
      console.error('Erro ao editar:', error);
      Alert.alert('❌ Erro', 'Ocorreu um erro ao editar o lançamento');
    }
  };

  // Deleta um lançamento individual com confirmação
  const handleDeleteSingle = (id, nome, valor) => {
    Alert.alert(
      '🗑️ Confirmar Exclusão',
      `Deseja excluir:\n${nome}\nR$ ${parseFloat(valor).toFixed(2)}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const sucesso = await deleteLancamento(id);
              if (sucesso) {
                Alert.alert('✅ Sucesso', 'Lançamento excluído!');
                loadLancamentos();
              }
            } catch (error) {
              Alert.alert('❌ Erro', 'Erro ao excluir lançamento');
            }
          }
        }
      ]
    );
  };

  // Deleta múltiplos lançamentos selecionados com confirmação
  const handleDeleteMultiple = () => {
    if (selectedItems.size === 0) {
      Alert.alert('⚠️ Atenção', 'Selecione pelo menos um lançamento');
      return;
    }

    Alert.alert(
      '🗑️ Confirmar Exclusão em Massa',
      `Deseja realmente excluir ${selectedItems.size} lançamento(s)?\n\nEsta ação NÃO pode ser desfeita!`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              let deletedCount = 0;
              for (const id of selectedItems) {
                const sucesso = await deleteLancamento(id);
                if (sucesso) deletedCount++;
              }

              Alert.alert('✅ Sucesso', `${deletedCount} lançamento(s) excluído(s)!`);
              setSelectedItems(new Set());
              setIsSelectMode(false);
              loadLancamentos();
            } catch (error) {
              console.error('Erro ao deletar:', error);
              Alert.alert('❌ Erro', 'Ocorreu um erro ao excluir');
            }
          }
        }
      ]
    );
  };

  // Valida a data inserida (ano, mês, dia) com limites e regras de calendário
  const validarDataAdicionar = () => {
    if (!anoAdicionar.trim()) {
      Alert.alert('❌ Erro', 'Por favor, insira o ano');
      return false;
    }

    const anoNum = parseInt(anoAdicionar);
    const anoAtual = new Date().getFullYear();

    if (isNaN(anoNum)) {
      Alert.alert('❌ Erro', 'Ano inválido. Por favor, insira um número válido');
      return false;
    }

    // Permite ±10 anos do ano atual
    if (anoNum < anoAtual - 10 || anoNum > anoAtual + 10) {
      Alert.alert('❌ Erro', `Ano deve estar entre ${anoAtual - 10} e ${anoAtual + 10}`);
      return false;
    }

    if (mesAdicionar === null || mesAdicionar === undefined) {
      Alert.alert('❌ Erro', 'Por favor, selecione um mês válido');
      return false;
    }

    if (!diaAdicionar.trim()) {
      Alert.alert('❌ Erro', 'Por favor, insira o dia');
      return false;
    }

    const diaNum = parseInt(diaAdicionar);
    if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
      Alert.alert('❌ Erro', 'Dia deve estar entre 1 e 31');
      return false;
    }

    // Valida o número máximo de dias do mês (considerando anos bissextos)
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const maxDias = mesAdicionar === 1 && anoNum % 4 === 0 ? 29 : diasPorMes[mesAdicionar];
    
    if (diaNum > maxDias) {
      Alert.alert('❌ Erro', `O mês ${meses[mesAdicionar].label} tem apenas ${maxDias} dias`);
      return false;
    }

    return true;
  };

  // Valida os inputs de nome e valor
  const validarInputsAdicionar = (nome, valor) => {
    if (!nome.trim()) {
      Alert.alert('❌ Erro', 'Por favor, insira uma descrição');
      return false;
    }
    if (!valor.trim() || isNaN(parseFloat(valor))) {
      Alert.alert('❌ Erro', 'Por favor, insira um valor numérico válido');
      return false;
    }
    return true;
  };

  // Adiciona lançamentos repetidos com data customizável (12 meses, X meses ou único)
  const addLancamentosRepetidosComData = async (nome, valor, tipo, repeteData, dataInicial) => {
    try {
      let adicionado = false;
      
      if (repeteData.repete) {
        if (repeteData.sempre) {
          // Adiciona para os próximos 12 meses
          for (let i = 0; i < 12; i++) {
            const data = new Date(dataInicial);
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
            const data = new Date(dataInicial);
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
        // Adiciona apenas uma vez
        const dataStr = dataInicial.toISOString().split('T')[0];
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

  // Valida todos os campos e adiciona o novo lançamento
  const handleAddLancamento = async () => {
    if (!validarInputsAdicionar(nomeAdicionar, valorAdicionar)) return;
    if (!validarDataAdicionar()) return;

    if (rendaRepete && !rendaSempre && !rendaMeses.trim()) {
      Alert.alert('❌ Erro', 'Por favor, insira a quantidade de meses para repetir');
      return;
    }

    try {
      const repeteData = {
        repete: rendaRepete,
        sempre: rendaSempre,
        meses: parseInt(rendaMeses) || 0
      };

      const dataInicial = new Date(parseInt(anoAdicionar), mesAdicionar, parseInt(diaAdicionar));

      const success = await addLancamentosRepetidosComData(nomeAdicionar, valorAdicionar, tipoLancamento, repeteData, dataInicial);

      if (success) {
        const message = rendaRepete
          ? (rendaSempre ? 'Lançamento adicionado mensalmente por 12 meses!' 
                         : `Lançamento adicionado por ${rendaMeses} meses!`)
          : 'Lançamento adicionado com sucesso!';

        Alert.alert('✅ Sucesso', message);
        // Limpa o formulário
        setNomeAdicionar('');
        setValorAdicionar('');
        setRendaRepete(false);
        setRendaSempre(false);
        setRendaMeses('');
        setAnoAdicionar(new Date().getFullYear().toString());
        setMesAdicionar(new Date().getMonth());
        setDiaAdicionar(new Date().getDate().toString());
        setModalAdicionarVisible(false);
        loadLancamentos();
      } else {
        Alert.alert('❌ Erro', 'Não foi possível adicionar o lançamento');
      }
    } catch (error) {
      console.error('Erro ao adicionar lançamento:', error);
      Alert.alert('❌ Erro', 'Ocorreu um erro ao adicionar o lançamento');
    }
  };

  // Calcula o total de páginas baseado no filtro ativo
  const totalPaginas = Math.ceil(
    (filtroTipo === 'todos' 
      ? todosLancamentos.length 
      : todosLancamentos.filter(l => l.tipo === filtroTipo).length) / ITEMS_PER_PAGE
  );

  // Renderiza cada item da lista de lançamentos com opções de edição/exclusão/seleção
  const renderLancamento = ({ item }) => (
    <TouchableOpacity
      style={[
        gerenciarStyles.lancamentoItem,
        selectedItems.has(item.id) && gerenciarStyles.itemSelecionado
      ]}
      onPress={() => {
        if (isSelectMode) {
          toggleSelectItem(item.id);
        }
      }}
      onLongPress={() => {
        if (!isSelectMode) {
          setIsSelectMode(true);
          toggleSelectItem(item.id);
        }
      }}
      activeOpacity={0.7}
    >
      {isSelectMode && (
        <View style={gerenciarStyles.checkboxWrapper}>
          <View style={[
            gerenciarStyles.checkbox,
            selectedItems.has(item.id) && gerenciarStyles.checkboxChecked
          ]}>
            {selectedItems.has(item.id) && (
              <Text style={gerenciarStyles.checkmarkText}>✓</Text>
            )}
          </View>
        </View>
      )}

      <View style={[gerenciarStyles.itemContent, !isSelectMode && { flex: 1, width: '100%' }]}>
        <View style={gerenciarStyles.itemHeader}>
          <View style={[
            gerenciarStyles.tipoIndicator,
            { backgroundColor: item.tipo === 'receita' ? colors.success : colors.error }
          ]} />
          <View style={gerenciarStyles.itemInfo}>
            <Text style={gerenciarStyles.itemNome}>{item.nome}</Text>
            <Text style={gerenciarStyles.itemData}>
              {new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}
            </Text>
          </View>
          <Text style={[
            gerenciarStyles.itemValor,
            { color: item.tipo === 'receita' ? colors.success : colors.error }
          ]}>
            {item.tipo === 'receita' ? '+' : '-'} R$ {parseFloat(item.valor).toFixed(2)}
          </Text>
        </View>

        {!isSelectMode && (
          <View style={gerenciarStyles.itemActions}>
            <TouchableOpacity
              style={gerenciarStyles.editButton}
              onPress={() => abrirModalEdicao(item)}
            >
              <Text style={gerenciarStyles.editButtonText}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={gerenciarStyles.deleteButton}
              onPress={() => handleDeleteSingle(item.id, item.nome, item.valor)}
            >
              <Text style={gerenciarStyles.deleteButtonText}>🗑️ Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // ✅ Componente para o conteúdo do modal de adição (formulário completo)
  const renderModalContent = () => (
    <>
      <Text style={gerenciarStyles.modalSectionTitle}>📅 Selecione a Data</Text>
      <View style={gerenciarStyles.dataPickersRow}>
        {/* Input para Dia */}
        <View style={gerenciarStyles.dataPickerWrapper}>
          <Text style={gerenciarStyles.dataPickerLabel}>Dia</Text>
          <TextInput
            style={gerenciarStyles.diaInput}
            placeholder="01"
            placeholderTextColor="#999"
            value={diaAdicionar}
            onChangeText={setDiaAdicionar}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>

        {/* Dropdown para Mês */}
        <View style={[gerenciarStyles.dataPickerWrapper, { flex: 2 }]}>
          <Text style={gerenciarStyles.dataPickerLabel}>Mês</Text>
          <DropDownPicker
            open={openMesAdicionarDropdown}
            value={mesAdicionar}
            items={meses}
            setOpen={setOpenMesAdicionarDropdown}
            setValue={setMesAdicionar}
            placeholder="Selecione o mês"
            style={gerenciarStyles.miniDropdown}
            textStyle={gerenciarStyles.miniDropdownText}
            dropDownContainerStyle={gerenciarStyles.miniDropdownContainer}
            zIndex={1000}
          />
        </View>

        {/* Input para Ano */}
        <View style={gerenciarStyles.dataPickerWrapper}>
          <Text style={gerenciarStyles.dataPickerLabel}>Ano</Text>
          <TextInput
            style={gerenciarStyles.anoInput}
            placeholder="2024"
            placeholderTextColor="#999"
            value={anoAdicionar}
            onChangeText={setAnoAdicionar}
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>
      </View>

      {/* Seletor de Tipo */}
      <Text style={gerenciarStyles.modalLabel}>Tipo</Text>
      <View style={gerenciarStyles.tipoSelectorContainer}>
        <TouchableOpacity
          style={[
            gerenciarStyles.tipoButton,
            tipoLancamento === 'receita' && gerenciarStyles.tipoButtonActive
          ]}
          onPress={() => setTipoLancamento('receita')}
        >
          <Text style={[
            gerenciarStyles.tipoButtonText,
            tipoLancamento === 'receita' && gerenciarStyles.tipoButtonTextActive
          ]}>
            💰 Receita
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            gerenciarStyles.tipoButton,
            tipoLancamento === 'despesa' && gerenciarStyles.tipoButtonActive
          ]}
          onPress={() => setTipoLancamento('despesa')}
        >
          <Text style={[
            gerenciarStyles.tipoButtonText,
            tipoLancamento === 'despesa' && gerenciarStyles.tipoButtonTextActive
          ]}>
            💸 Despesa
          </Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <Text style={gerenciarStyles.modalLabel}>Nome/Descrição</Text>
      <TextInput
        style={gerenciarStyles.modalInput}
        placeholder={tipoLancamento === 'receita' ? 'Ex: Salário' : 'Ex: Alimentação'}
        placeholderTextColor="#999"
        value={nomeAdicionar}
        onChangeText={setNomeAdicionar}
      />

      <Text style={gerenciarStyles.modalLabel}>Valor</Text>
      <TextInput
        style={gerenciarStyles.modalInput}
        placeholder="Ex: 150.00"
        placeholderTextColor="#999"
        value={valorAdicionar}
        onChangeText={setValorAdicionar}
        keyboardType="decimal-pad"
      />

      <View style={gerenciarStyles.checkboxContainer}>
        <TouchableOpacity 
          style={gerenciarStyles.checkboxWrapper}
          onPress={() => setRendaRepete(!rendaRepete)}
        >
          <View style={[
            gerenciarStyles.checkbox,
            rendaRepete && gerenciarStyles.checkboxChecked
          ]}>
            {rendaRepete && <Text style={gerenciarStyles.checkmarkText}>✓</Text>}
          </View>
          <Text style={gerenciarStyles.checkboxLabel}>Este lançamento se repete?</Text>
        </TouchableOpacity>
      </View>

      {rendaRepete && (
        <View style={gerenciarStyles.repeteOptionsContainer}>
          <TouchableOpacity 
            style={gerenciarStyles.checkboxWrapper}
            onPress={() => {
              setRendaSempre(!rendaSempre);
              if (!rendaSempre) setRendaMeses('');
            }}
          >
            <View style={[
              gerenciarStyles.checkbox,
              rendaSempre && gerenciarStyles.checkboxChecked
            ]}>
              {rendaSempre && <Text style={gerenciarStyles.checkmarkText}>✓</Text>}
            </View>
            <Text style={gerenciarStyles.checkboxLabel}>Repete sempre</Text>
          </TouchableOpacity>

          {!rendaSempre && (
            <View style={gerenciarStyles.mesesContainer}>
              <Text style={gerenciarStyles.mesesLabel}>Repete durante:</Text>
              <TextInput
                style={gerenciarStyles.inputMeses}
                placeholder="0"
                placeholderTextColor="#999"
                value={rendaMeses}
                onChangeText={setRendaMeses}
                keyboardType="number-pad"
              />
              <Text style={gerenciarStyles.mesesLabel}>meses</Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[gerenciarStyles.botaoModalAdicionar, { 
          backgroundColor: tipoLancamento === 'receita' ? colors.success : colors.error 
        }]}
        onPress={handleAddLancamento}
      >
        <Text style={gerenciarStyles.botaoModalAdicionarText}>
          {tipoLancamento === 'receita' ? '💰 Adicionar Renda' : '💸 Adicionar Despesa'}
        </Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={gerenciarStyles.container}>
      {/* Header */}
      <View style={gerenciarStyles.header}>
        <View style={gerenciarStyles.headerContent}>
          <Text style={gerenciarStyles.headerTitle}>📋 Gerenciador</Text>
          <TouchableOpacity
            style={gerenciarStyles.btnAdicionar}
            onPress={() => {
              setTipoLancamento('receita');
              setNomeAdicionar('');
              setValorAdicionar('');
              setAnoAdicionar(new Date().getFullYear().toString());
              setMesAdicionar(new Date().getMonth());
              setDiaAdicionar(new Date().getDate().toString());
              setRendaRepete(false);
              setRendaSempre(false);
              setRendaMeses('');
              setModalAdicionarVisible(true);
            }}
          >
            <Text style={gerenciarStyles.btnAdicionarText}>➕ Novo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtros de Tipo */}
      <View style={gerenciarStyles.filtroContainer}>
        <TouchableOpacity
          style={[
            gerenciarStyles.filtroButton,
            filtroTipo === 'todos' && gerenciarStyles.filtroButtonActive
          ]}
          onPress={() => handleChangeFilter('todos')}
        >
          <Text style={[
            gerenciarStyles.filtroText,
            filtroTipo === 'todos' && gerenciarStyles.filtroTextActive
          ]}>
            📋 Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            gerenciarStyles.filtroButton,
            filtroTipo === 'receita' && gerenciarStyles.filtroButtonActive
          ]}
          onPress={() => handleChangeFilter('receita')}
        >
          <Text style={[
            gerenciarStyles.filtroText,
            filtroTipo === 'receita' && gerenciarStyles.filtroTextActive
          ]}>
            💰 Receitas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            gerenciarStyles.filtroButton,
            filtroTipo === 'despesa' && gerenciarStyles.filtroButtonActive
          ]}
          onPress={() => handleChangeFilter('despesa')}
        >
          <Text style={[
            gerenciarStyles.filtroText,
            filtroTipo === 'despesa' && gerenciarStyles.filtroTextActive
          ]}>
            💸 Despesas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Barra de Seleção */}
      {isSelectMode && (
        <View style={gerenciarStyles.selectionBar}>
          <TouchableOpacity
            style={gerenciarStyles.selectAllButton}
            onPress={selectAllPage}
          >
            <Text style={gerenciarStyles.selectAllText}>
              {selectedItems.size === lancamentosExibidos.length && lancamentosExibidos.length > 0
                ? '◻️ Desselecionar'
                : '☑️ Selecionar Página'}
            </Text>
          </TouchableOpacity>

          <Text style={gerenciarStyles.selectionCount}>
            {selectedItems.size} selecionado(s)
          </Text>

          <TouchableOpacity
            style={gerenciarStyles.cancelButton}
            onPress={() => {
              setIsSelectMode(false);
              setSelectedItems(new Set());
              loadLancamentos(filtroTipo);
            }}
          >
            <Text style={gerenciarStyles.cancelText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Barra de Ação */}
      {isSelectMode && selectedItems.size > 0 && (
        <View style={gerenciarStyles.actionBar}>
          <TouchableOpacity
            style={gerenciarStyles.deleteAllButton}
            onPress={handleDeleteMultiple}
          >
            <Text style={gerenciarStyles.deleteAllText}>
              🗑️ Excluir {selectedItems.size}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista */}
      <FlatList
        data={lancamentosExibidos}
        key={`${isSelectMode}-${[...selectedItems].join(',')}`}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLancamento}
        contentContainerStyle={gerenciarStyles.listContent}
        extraData={{ isSelectMode, selectedItems }}
        ListEmptyComponent={
          <View style={gerenciarStyles.emptyContainer}>
            <Text style={gerenciarStyles.emptyText}>📭</Text>
            <Text style={gerenciarStyles.emptyTitle}>Nenhum lançamento</Text>
          </View>
        }
      />

      {/* Paginação */}
      {totalPaginas > 1 && (
        <View style={gerenciarStyles.paginationContainer}>
          <TouchableOpacity
            style={[
              gerenciarStyles.paginationButton,
              paginaAtual === 1 && gerenciarStyles.paginationButtonDisabled
            ]}
            onPress={() => aplicarFiltros(todosLancamentos, paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            <Text style={gerenciarStyles.paginationText}>← Anterior</Text>
          </TouchableOpacity>

          <Text style={gerenciarStyles.pageInfo}>
            Página {paginaAtual} de {totalPaginas}
          </Text>

          <TouchableOpacity
            style={[
              gerenciarStyles.paginationButton,
              paginaAtual === totalPaginas && gerenciarStyles.paginationButtonDisabled
            ]}
            onPress={() => aplicarFiltros(todosLancamentos, paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            <Text style={gerenciarStyles.paginationText}>Próxima →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de Edição */}
      <Modal
        visible={modalEditVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={gerenciarStyles.modalOverlay}>
          <View style={gerenciarStyles.modalContent}>
            <Text style={gerenciarStyles.modalTitle}>✏️ Editar Lançamento</Text>

            <Text style={gerenciarStyles.labelInput}>Nome</Text>
            <TextInput
              style={gerenciarStyles.input}
              value={nomeEditado}
              onChangeText={setNomeEditado}
              placeholder="Nome do lançamento"
              placeholderTextColor="#999"
            />

            <Text style={gerenciarStyles.labelInput}>Valor</Text>
            <TextInput
              style={gerenciarStyles.input}
              value={valorEditado}
              onChangeText={setValorEditado}
              placeholder="0.00"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />

            <Text style={gerenciarStyles.labelInput}>Tipo</Text>
            <Text style={gerenciarStyles.tipoTexto}>
              {lancamentoEmEdicao?.tipo === 'receita' ? '💰 Receita' : '💸 Despesa'}
            </Text>

            <View style={gerenciarStyles.modalButtons}>
              <TouchableOpacity
                style={gerenciarStyles.cancelModalButton}
                onPress={() => setModalEditVisible(false)}
              >
                <Text style={gerenciarStyles.cancelModalText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={gerenciarStyles.saveButton}
                onPress={handleEditarLancamento}
              >
                <Text style={gerenciarStyles.saveButtonText}>💾 Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ✅ Modal de Adição com FlatList */}
      <Modal
        visible={modalAdicionarVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={gerenciarStyles.modalOverlay}>
          <View style={gerenciarStyles.modalAdicionarContent}>
            <View style={gerenciarStyles.modalHeader}>
              <Text style={gerenciarStyles.modalTitle}>
                {tipoLancamento === 'receita' ? '💰 Adicionar Renda' : '💸 Adicionar Despesa'}
              </Text>
              <TouchableOpacity
                onPress={() => setModalAdicionarVisible(false)}
              >
                <Text style={gerenciarStyles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={[{ id: 'content' }]}
              keyExtractor={(item) => item.id}
              renderItem={() => (
                <View style={gerenciarStyles.modalScrollContent}>
                  {renderModalContent()}
                </View>
              )}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              zIndex={100}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}