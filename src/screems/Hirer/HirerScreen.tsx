import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Hirer from '../../models/Hirer';
import defaultStyle from '../../styles/DefaultStyles';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import HirerService from '../../services/HirerService';
import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import ToastComponent from '../../components/ToastComponent';
import Toast from 'react-native-toast-message';

const ContratantesScreen: React.FC = () => {

  const [hirers, setHirers] = useState<Hirer[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigation = useNavigation();

  useFocusEffect(

    useCallback(() => {

      fetchHirers();

    }, [])

  );

  const fetchHirers = async () => {

    try {

      let response: AxiosResponse = await HirerService.findAllHirers();

      let hirers: Hirer[] = response.data;

      setHirers(hirers);

    } catch (error) {
      console.error(error);
    }

  };

  const handleItemPress = (id: number) => {
    setSelectedId(id);
  };


  const isPressed = (id: number) => {
    return selectedId === id
  }

  const updateHirer = () => {

    let hirerToUpdate: Hirer | undefined = hirers.find(hirer => hirer.id === selectedId);

    if (hirerToUpdate) {
      navigation.navigate('HirerForm' as never, { hirer: hirerToUpdate })
    } else {
      ToastComponent.throwError('Selecione um contratante');
    }

  }

  return (
    <SafeAreaView style={defaultStyle.containerDefault}>
      <TouchableOpacity onPress={() => { navigation.navigate('Menu' as never) }} style={defaultStyle.homeIcon}>
        <Image source={require('../../images/menu/Menu.png')} style={defaultStyle.icon} />
      </TouchableOpacity>
      <Text style={defaultStyle.title}>Contratantes</Text>
      <Toast />
      <View style={defaultStyle.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('HirerForm' as never) }}><Text style={styles.buttonText}>Inserir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={updateHirer}><Text style={styles.buttonText}>Editar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Excluir</Text></TouchableOpacity>
      </View>
      <View style={styles.gridContext}>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={{ flex: 1.5 }} textStyle={[styles.columnItem]}>Nome</DataTable.Title>
            <DataTable.Title style={{ flex: 1.5 }} textStyle={styles.columnItem}>Cnpj</DataTable.Title>
            <DataTable.Title style={{ flex: 0.4 }} textStyle={styles.columnItem}>Cor</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {hirers.map(hirer =>
            (
              <DataTable.Row key={hirer.id} style={{ backgroundColor: isPressed(hirer.id) ? '#a39e9e' : null }} onPress={() => handleItemPress(hirer.id)}>
                <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.columnItem}>{hirer.name}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1.5 }} textStyle={styles.columnItem}>{hirer.cpfCnpj}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 0.4, justifyContent: 'center' }}><View style={[styles.colorIndicator, { backgroundColor: hirer.hexColor }]} /></DataTable.Cell>
              </DataTable.Row>
            )
            )}
          </ScrollView>
        </DataTable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C30000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#E0E0E0'
  },
  selectedItem: {
    backgroundColor: '#9B9696',
  },
  colorIndicator: {
    textAlign: 'center',
    width: 20,
    height: 20,
    borderRadius: 5
  },
  header: {
    flexDirection: 'row',
  },
  columnItem: {
    color: 'black',
    fontSize: 16
  },
  columnItemCnpj: {
    color: 'black',
    fontSize: 16
  },
  gridContext: {
    borderRadius: 20,
    width: "110%",
    height: "75%",
    backgroundColor: "#ebe8e8",
    alignItems: "center"
  },

});

export default ContratantesScreen;