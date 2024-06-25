import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalSuccessProps {
    successMessageVisible: boolean;
    setSuccessMessageVisible: (bol: boolean) => void;
    successMessage: string;
    redirect: boolean;
    redirectPath: string;
}


const ModalSuccessContainer: React.FC<ModalSuccessProps> =({successMessage, setSuccessMessageVisible, successMessageVisible, redirect, redirectPath}) => {

    const navigator = useNavigation();

    return (<Modal
          animationType="slide"
          transparent={true}
          visible={successMessageVisible}
          onRequestClose={() => setSuccessMessageVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{successMessage}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  
                  setSuccessMessageVisible(false);

                  if (redirect && redirectPath) {
                    navigator.navigate(redirectPath);
                  }

                }}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>)

}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalSuccessContainer;