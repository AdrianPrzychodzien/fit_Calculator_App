import { StyleSheet } from 'react-native'

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
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  radio: {
    flexDirection: 'row',
    marginHorizontal: 15
  },
})