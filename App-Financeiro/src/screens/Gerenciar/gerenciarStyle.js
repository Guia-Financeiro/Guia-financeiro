import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Theme';

export const gerenciarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    backgroundColor: colors.card,
    padding: 20,
    paddingTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  btnAdicionar: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  btnAdicionarText: {
    color: colors.textTitle,
    fontWeight: 'bold',
    fontSize: 14,
  },

  filtroContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  filtroButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  filtroButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  filtroText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textBody,
    textAlign: 'center',
  },

  filtroTextActive: {
    color: colors.textTitle,
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

  selectAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },

  selectAllText: {
    color: colors.textTitle,
    fontWeight: '600',
    fontSize: 12,
  },

  selectionCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.error,
    borderRadius: 6,
  },

  cancelText: {
    color: colors.textTitle,
    fontWeight: 'bold',
    fontSize: 16,
  },

  actionBar: {
    backgroundColor: colors.error + '20',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },

  deleteAllButton: {
    backgroundColor: colors.error,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  deleteAllText: {
    color: colors.textTitle,
    fontWeight: 'bold',
    fontSize: 14,
  },

  listContent: {
    padding: 12,
    paddingBottom: 20,
  },

  lancamentoItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
    overflow: 'hidden',
    flexDirection: 'row',
  },

  itemSelecionado: {
    backgroundColor: colors.primary + '20',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },

  checkboxWrapper: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

   checkboxLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
    marginLeft: 8,
  },

  checkmarkText: {
    color: colors.textTitle,
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemContent: {
    flex: 1,
    padding: 12,
  },

  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  tipoIndicator: {
    width: 6,
    height: 40,
    borderRadius: 3,
    marginRight: 12,
  },

  itemInfo: {
    flex: 1,
  },

  itemNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
    marginBottom: 4,
  },

  itemData: {
    fontSize: 12,
    color: colors.grey,
  },

  itemValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },

  editButton: {
    flex: 1,
    backgroundColor: colors.primary + '20',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  editButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },

  deleteButton: {
    flex: 1,
    backgroundColor: colors.error + '20',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: colors.error,
    fontWeight: '600',
    fontSize: 12,
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
  },

  paginationButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },

  paginationButtonDisabled: {
    backgroundColor: colors.grey,
    opacity: 0.5,
  },

  paginationText: {
    color: colors.textTitle,
    fontWeight: '600',
    fontSize: 12,
  },

  pageInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 40,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textTitle,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },

  modalAdicionarContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '95%',
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
    gap: 8,
    marginBottom: 20,
  },

  dataPickerWrapper: {
    flex: 1,
  },

  dataPickerLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 6,
  },

  diaInput: {
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
    maxHeight: 480,
  },

  tipoSelectorContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  tipoButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.borderColor,
  },

  tipoButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },

  tipoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
    textAlign: 'center',
  },

  tipoButtonTextActive: {
    color: colors.primary,
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

  checkboxContainer: {
    marginBottom: 12,
  },

  repeteOptionsContainer: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  mesesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },

  mesesLabel: {
    fontSize: 13,
    color: colors.textBody,
    fontWeight: '500',
  },

  inputMeses: {
    backgroundColor: colors.card,
    borderRadius: 6,
    padding: 8,
    color: colors.textBody,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 13,
    textAlign: 'center',
    width: 50,
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

  labelInput: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 8,
  },

  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    color: colors.textBody,
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 14,
    marginBottom: 12,
  },

  tipoTexto: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },

  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  cancelModalButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.grey,
    borderRadius: 8,
    alignItems: 'center',
  },

  cancelModalText: {
    color: colors.textTitle,
    fontWeight: 'bold',
  },

  saveButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.success,
    borderRadius: 8,
    alignItems: 'center',
  },

  saveButtonText: {
    color: colors.textTitle,
    fontWeight: 'bold',
  },
});