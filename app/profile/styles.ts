import colors from '@/colors';
import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sen_400Regular',
    color: colors.text,
    marginLeft: 65,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
  },
}); 