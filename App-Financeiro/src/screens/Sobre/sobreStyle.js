import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Theme';

export const sobreStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.textTitle,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.textBody,
    lineHeight: 24,
  },
  versionText: {
    fontSize: 14,
    color: colors.grey,
    marginTop: 40,
  }
});