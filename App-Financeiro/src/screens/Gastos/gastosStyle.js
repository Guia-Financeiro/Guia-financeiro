import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Theme';

export const gastosStyles = StyleSheet.create({
  // ---- Geral ----
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textTitle,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    color: colors.textTitle,
    fontSize: 16,
    marginBottom: 10,
  },

  // ---- Cabeçalho ----
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textBody,
  },

  // ---- Despesas ----
  addButtonSmall: {
    backgroundColor: colors.primary + '30',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonSmallText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  despesaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 10,
    paddingLeft: 10,
  },
  despesaNumber: {
    backgroundColor: colors.borderColor,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  despesaNumberText: {
    color: colors.textBody,
    fontWeight: 'bold',
    fontSize: 14,
  },
  despesaInputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  despesaInputNome: {
    flex: 1,
    borderWidth: 0,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  despesaInputValor: {
    width: 100,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  removeButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  removeButtonText: {
    color: colors.error,
    fontSize: 24,
    fontWeight: 'bold',
  },

  // ---- Botões de Ação ----
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  buttonSecondaryText: {
    color: colors.textTitle,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ---- Resultado ----
  resultadoContainer: {
    marginTop: 30,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  resultadoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textTitle,
    padding: 20,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  resultadoCard: {
    padding: 20,
    backgroundColor: colors.card,
  },
  resultadoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  resultadoRowBorder: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  resultadoLabel: {
    fontSize: 16,
    color: colors.textBody,
  },
  resultadoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadoLabelBold: {
    fontSize: 18,
    color: colors.textTitle,
    fontWeight: 'bold',
  },
  resultadoValorBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  // ---- Status Cards (Saldo e Percentual) ----
  statusCard: {
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  comprometimentoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    backgroundColor: colors.card,
  },
  comprometimentoLabel: {
    fontSize: 16,
    color: colors.textBody,
  },
  comprometimentoValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textTitle,
  },
  comprometimentoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  // ---- Seleção para Salvar ----
  selecaoContainer: {
    backgroundColor: colors.card,
    padding: 20,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
  },
  selecaoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 15,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxIcon: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.textTitle,
    fontWeight: '500',
  },
  checkboxValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.success,
  },

  // ---- Opções de Repetição ----
  repeteOptionsContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginLeft: 36,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  mesesInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    marginLeft: 36,
  },
  inputMeses: {
    backgroundColor: colors.card,
    borderRadius: 6,
    padding: 8,
    color: colors.textTitle,
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: 70,
    textAlign: 'center',
    fontSize: 14,
  },

  // ---- Botão Salvar ----
  saveButton: {
    backgroundColor: colors.success,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.success,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    color: colors.textBody,
    fontSize: 12,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 20,
  },

  // ---- Cores de Status/Texto ----
  receitaColor: {
    color: colors.success,
  },
  despesaColor: {
    color: colors.error,
  },
  alertColor: {
    color: colors.error,
  },
  normalColor: {
    color: colors.textTitle,
  },
});