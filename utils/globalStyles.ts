import { StyleSheet } from 'react-native'
import Colors from './Colors'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign: 'center'
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  radio: {
    flexDirection: 'row',
    marginHorizontal: 15
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    width: 120,
    padding: 10,
    fontSize: 18
  },
  fatInput: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    width: 80,
    maxWidth: 80,
    padding: 10,
    fontSize: 18,
    marginRight: -30
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center'
  }
})