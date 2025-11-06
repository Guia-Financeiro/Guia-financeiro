import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Theme'; // Certifique-se que o caminho para o seu tema está correto

export const gastosStyles = StyleSheet.create({
  // ---- Geral ----
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Espaço para o final do scroll
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
  },

  // ---- Cabeçalho ----
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textTitle,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textBody,
  },

  // ---- Despesas ----
  addButtonSmall: {
    backgroundColor: colors.primary + '30', // Azul 30% opacidade
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  addButtonSmallText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  despesaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginBottom: 10,
    paddingLeft: 10, // Espaço para o número
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
  },
  despesaInputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  despesaInputNome: {
    flex: 1,
    borderWidth: 0, // Remove a borda do input
    marginRight: 10,
  },
  despesaInputValor: {
    width: 100,
    borderWidth: 0, // Remove a borda do input
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
  },
  button: {
    flex: 1, // Faz os botões dividirem o espaço
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginRight: 10, // Espaço entre os botões
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
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: 'hidden', // Para os cantos arredondados
  },
  resultadoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textTitle,
    padding: 20,
    backgroundColor: colors.background, // Fundo leve
  },
  resultadoCard: {
    padding: 20,
  },
  resultadoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  comprometimentoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  comprometimentoLabel: {
    fontSize: 16,
    color: colors.textBody,
  },
  comprometimentoValor: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  comprometimentoStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 2,
  },

  // ---- Seleção para Salvar ----
  selecaoContainer: {
    backgroundColor: colors.background,
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
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxIcon: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxLabel: {
    fontSize: 16,
    color: colors.textTitle,
    fontWeight: 'bold',
  },
  checkboxValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success, // Cor padrão de receita
  },

  // ---- Botão Salvar ----
  saveButton: {
    backgroundColor: colors.success, // Verde
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    textAlign: 'center',
    color: colors.grey,
    fontSize: 12,
    marginTop: 15,
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