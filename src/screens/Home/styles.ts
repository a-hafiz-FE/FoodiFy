import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  TopBar: {
    backgroundColor: '#4058A0',
    height: 131,
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {},
  safeArea: {
    flex: 1,
    marginTop: 30,
    paddingTop: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  Icon: {
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: 8,
    paddingLeft: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  SearchBar: {
    width: 320,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchInput: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
  },
  TopBarImage: { objectFit: 'contain', height: 40, marginTop: 10 },
});
