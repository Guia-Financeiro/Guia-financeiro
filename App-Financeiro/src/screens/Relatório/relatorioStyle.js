import { StyleSheet, Dimensions } from 'react-native';
// (Ajuste o caminho se o seu theme.js estiver noutro local)
import { colors } from '../../theme/Theme'; 

const windowWidth = Dimensions.get('window').width;

export const relatorioStyles = StyleSheet.create({
  // --- GERAL ---
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo escuro
  },
  scrollContent: {
  },

adicionarContainer: {
  backgroundColor: '#1a1a1a',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  borderWidth: 2,
  borderColor: '#ffffff',
  marginHorizontal: 16,
},

adicionarTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: 12,
},

input: {
  backgroundColor: '#2a2a2a',
  borderRadius: 8,
  padding: 12,
  color: '#ffffff',
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#444444',
  fontSize: 14,
},

botaoAdicionar: {
  borderRadius: 8,
  padding: 14,
  alignItems: 'center',
  marginTop: 8,
  borderWidth: 1,
  borderColor: '#ffffff',
},

botaoAdicionarText: {
  color: '#ffffff',
  fontSize: 14,
  fontWeight: 'bold',
},

  // --- CABEÇALHO ---
  header: {
    backgroundColor: colors.card, // Fundo do cartão (cinza escuro)
    padding: 20,
    paddingTop: 30, // Mais espaço no topo
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- CORRIGIDO para branco
    textAlign: 'center',
    marginBottom: 20,
  },
  periodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background, // Fundo mais escuro
    borderRadius: 10,
  },
  periodoButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
  },
  periodoButtonActive: {
    backgroundColor: colors.primary, // Azul
  },
  periodoButtonText: {
    color: colors.grey, // Cinza claro
    textAlign: 'center',
    fontWeight: 'bold',
  },
  periodoButtonTextActive: {
    color: colors.textTitle, // Branco
  },

  // --- RESUMO (Receita/Despesa) ---
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  resumoCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  receitaCard: {
    marginRight: 10,
  },
  despesaCard: {
    marginLeft: 10,
  },
  resumoLabel: {
    fontSize: 14,
    color: colors.textBody, // <-- CORRIGIDO para cinza claro
    marginBottom: 5,
  },
  resumoValor: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  receitaColor: {
    color: colors.success, // Verde
  },
  despesaColor: {
    color: colors.error, // Vermelho
  },

  // --- SALDO ---
  saldoCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  saldoLabel: {
    fontSize: 16,
    color: colors.textBody, // <-- CORRIGIDO
  },
  saldoValor: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  saldoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textBody, // <-- CORRIGIDO
  },

  // --- ANÁLISE ---
  analiseCard: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
  },
  analiseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- CORRIGIDO
    marginBottom: 15,
  },
  percentualContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  percentualLabel: {
    fontSize: 16,
    color: colors.textBody, // <-- CORRIGIDO
  },
  percentualValor: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  barraContainer: {
    width: '100%',
    marginBottom: 10,
  },
  barraBackground: {
    height: 10,
    backgroundColor: colors.background, // Fundo da barra
    borderRadius: 5,
    overflow: 'hidden',
  },
  barraProgress: {
    height: 10,
    borderRadius: 5,
  },
  statusCard: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusDesc: {
    fontSize: 12,
  },

  // --- DETALHAMENTO ---
  detalhamentoContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor, // Linha divisória
  },
  detalhamentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detalhamentoLabel: {
    fontSize: 14,
    color: colors.textBody, // <-- CORRIGIDO
  },
  detalhamentoValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- CORRIGIDO
  },

  // --- LISTA DE LANÇAMENTOS ---
  listaContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  listaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- CORRIGIDO
    marginBottom: 10,
  },
  lancamentoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  lancamentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipoIndicator: {
    width: 6,
    height: '100%',
  },
  lancamentoInfo: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  lancamentoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- CORRIGIDO
  },
  lancamentoData: {
    fontSize: 12,
    color: colors.grey, // Cinza claro
  },
  lancamentoValorContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lancamentoValor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  
  // --- LISTA VAZIA ---
  emptyContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- CORRIGIDO
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textBody, // <-- CORRIGIDO
    textAlign: 'center',
  },
});