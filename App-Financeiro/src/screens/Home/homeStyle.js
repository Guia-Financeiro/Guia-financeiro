import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Theme';

// 2. EXPORTE OS ESTILOS (usando 'styles' ou 'homeStyles', como preferir)
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // <-- USANDO O TEMA
    padding: 20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- USANDO O TEMA
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card, // <-- USANDO O TEMA
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: colors.textBody, // <-- USANDO O TEMA
    marginBottom: 4,
  },
  value: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  receita: {
    color: colors.success, // <-- USANDO O TEMA
  },
  despesa: {
    color: colors.error, // <-- USANDO O TEMA
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textTitle, // <-- USANDO O TEMA
    marginTop: 20,
    marginBottom: 10,
  },
  lancamento: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card, // <-- USANDO O TEMA
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  lancamentoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textBody,
  },
  lancamentoData: {
    fontSize: 12,
    color: colors.grey,
  },
  lancamentoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.primary, // <-- USANDO O TEMA
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});