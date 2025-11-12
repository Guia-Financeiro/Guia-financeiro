import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../theme/Theme';

const windowWidth = Dimensions.get('window').width;

export const relatorioStyles = StyleSheet.create({
  // --- GERAL ---
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'visible',
  },
  scrollContent: {
  },

  adicionarContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.borderColor,
    marginHorizontal: 16,
  },

  adicionarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 12,
  },

  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    color: colors.textBody,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 14,
  },

  botaoAdicionar: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  botaoAdicionarText: {
    color: colors.textTitle,
    fontSize: 14,
    fontWeight: 'bold',
  },

  checkboxContainer: {
    marginBottom: 12,
  },

  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.borderColor,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkmarkText: {
    color: colors.textBody,
    fontSize: 16,
    fontWeight: 'bold',
  },

  checkboxLabel: {
    color: colors.textBody,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },

  repeteOptionsContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },

  mesesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },

  mesesLabel: {
    color: colors.textBody,
    fontSize: 14,
    fontWeight: '500',
  },

  inputMeses: {
    backgroundColor: colors.card,
    borderRadius: 6,
    padding: 8,
    color: colors.textBody,
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: 70,
    textAlign: 'center',
    fontSize: 14,
  },

  // --- CABEÇALHO ---
  header: {
    padding: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textTitle,
    textAlign: 'center',
    marginBottom: 20,
  },
  periodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderRadius: 10,
  },
  periodoButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
  },
  periodoButtonActive: {
    backgroundColor: colors.primary,
  },
  periodoButtonText: {
    color: colors.grey,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  periodoButtonTextActive: {
    color: colors.textTitle,
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
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.borderColor,
    marginHorizontal: 16,
  },
  receitaCard: {
    marginRight: 10,
  },
  despesaCard: {
    marginLeft: 10,
  },
  resumoLabel: {
    fontSize: 14,
    color: colors.textBody,
    marginBottom: 5,
    borderColor: colors.borderColor,
  },
  resumoValor: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  receitaColor: {
    color: colors.success,
  },
  despesaColor: {
    color: colors.error,
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
    color: colors.textBody,
  },
  saldoValor: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  saldoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textBody,
  },

  // --- ANÁLISE ---
  analiseCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.borderColor,
    marginHorizontal: 16,
  },
  analiseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textTitle,
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
    color: colors.textBody,
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
    backgroundColor: colors.background,
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
    borderTopColor: colors.borderColor,
  },
  detalhamentoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detalhamentoLabel: {
    fontSize: 14,
    color: colors.textBody,
  },
  detalhamentoValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  // --- LISTA DE LANÇAMENTOS ---
  listaContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.borderColor,
  },



  listaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 12,
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
    justifyContent: 'space-between',
  },

  anoFilterCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    padding: 16,
  },

  anoFilterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
    marginBottom: 8,
  },

  anoButtonScroll: {
    flexGrow: 0,
  },

  anoButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  anoButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  anoButtonText: {
    color: colors.textBody
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
    color: colors.textTitle,
  },
  lancamentoData: {
    fontSize: 12,
    color: colors.grey,
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
    color: colors.textTitle,
    marginBottom: 5,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textBody,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
  },

  filtroDropdownContainer: {
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
    zIndex: 1000,
    overflow: 'visible',
    marginBottom: 0
  },
  filtroDropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 12,
  },
  dropdownsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    zIndex: 1000,
    width: '100%',
    overflow: 'visible',
  },
  dropdownWrapper: {
    flex: 1,
    zIndex: 1000,
    minWidth: 0,
    overflow: 'visible',
  },
  dropdown: {
    backgroundColor: colors.background,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
    zIndex: 1000,
    width: '100%',
  },
  dropdownText: {
    fontSize: 14,
    color: colors.textTitle,
    fontWeight: '500',
  },
  dropdownContainer: {
    backgroundColor: colors.card,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 475,
    zIndex: 1000,
    overflow: 'visible',
  },
  dropdownLabel: {
    fontSize: 13,
    color: colors.textBody,
  },
  selectionBar: {
    backgroundColor: colors.primary + '20',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  selectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },

  selectionButtonText: {
    color: colors.textTitle,
    fontWeight: '600',
    fontSize: 12,
  },

  cancelButton: {
    backgroundColor: colors.error,
  },

  selectionCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  actionBar: {
    backgroundColor: colors.error + '20',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  deleteMultipleButton: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteMultipleButtonText: {
    color: colors.textTitle,
    fontWeight: 'bold',
    fontSize: 14,
  },

  lancamentoSelecionado: {
    backgroundColor: colors.primary + '20',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },

  lancamento: {
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
    justifyContent: 'space-between',
  },
  botoesAdicionarContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },

  botaoAdicionarRapido: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  botaoAdicionarRapidoText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  modalCloseButton: {
    fontSize: 24,
    color: colors.textBody,
    fontWeight: 'bold',
  },

  modalScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 12,
  },

  dataPickersRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  dataPickerWrapper: {
    flex: 1,
    zIndex: 1000,
  },

  miniDropdown: {
    backgroundColor: colors.background,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 44,
  },

  miniDropdownText: {
    fontSize: 13,
    color: colors.textTitle,
    fontWeight: '500',
  },

  miniDropdownContainer: {
    backgroundColor: colors.card,
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
  },

  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 8,
    marginTop: 12,
  },

  modalInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    color: colors.textBody,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 14,
  },

  botaoModalAdicionar: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  botaoModalAdicionarText: {
    color: colors.textTitle,
    fontSize: 14,
    fontWeight: 'bold',
  },

  anoInputWrapper: {
    flex: 1,
  },

  anoInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 6,
  },

  anoInput: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    color: colors.textBody,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  mesDropdownLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 6,
  },
});