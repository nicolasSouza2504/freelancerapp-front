import React from "react";
import { StyleSheet } from "react-native";

const style =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002A3A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#E5D3A1',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#C30000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#fff',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#C30000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  validationMessageContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#FFCDD2',
    alignItems: 'center',
    marginTop: 20,
  },
  validationMessageText: {
    color: '#D32F2F',
    fontSize: 16,
  },
});

export default style;