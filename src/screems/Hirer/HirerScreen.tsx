import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Hirer from '../../models/Hirer';
import defaultStyle from '../../styles/DefaultStyles';
import { DataTable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import HirerService from '../../services/HirerService';
import { AxiosResponse } from 'axios';

const ContratantesScreen: React.FC = () => {

  const [gridData, setGridData] = useState();
  const [hirers, setHirers] = useState<Hirer[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigation = useNavigation();


  useEffect(() => {
    fetchContratantes();
  }, []);

  const fetchContratantes = async () => {

    try {

      let response: AxiosResponse = await HirerService.findAllHirers();

      let hirers: Hirer[] = response.data;

      setHirers(hirers);

      transformToGridData(hirers)

    } catch (error) {
      console.error(error);
    }

  };

  const handleItemPress = (id: number) => {
    setSelectedId(id);
  };

  const transformToGridData = (hirers: Hirer[] | null) => {

    if (hirers && hirers.length) {
      setGridData(hirers.map(hirer => [...Object.values(hirer)]) as never)
    }

  }

  const isPressed = (id: number) => {
    return selectedId === id
  }

  const renderItem = ({ item }: { item: Hirer }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.id)} style={[styles.item, selectedId === item.id && styles.selectedItem]}>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={defaultStyle.containerDefault}>
      <TouchableOpacity onPress={() => { navigation.navigate('Menu' as never) }} style={defaultStyle.homeIcon}>
        <Image source={require('../../images/menu/Menu.png')} style={defaultStyle.icon} />
      </TouchableOpacity>
      <Text style={defaultStyle.title}>Contratantes</Text>
      <View style={defaultStyle.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('HirerForm' as never) }}><Text style={styles.buttonText}>Inserir</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('HirerForm' as never) }}><Text style={styles.buttonText}>Editar</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('HirerForm' as never) }}><Text style={styles.buttonText}>Excluir</Text></TouchableOpacity>
      </View>
      <View style={styles.gridContext}>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.columnItem}>Nome</DataTable.Title>
            <DataTable.Title textStyle={styles.columnItem}>Cnpj</DataTable.Title>
            <DataTable.Title textStyle={styles.columnItem}>Cor</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {hirers.map(hirer =>
            (
              <DataTable.Row key={hirer.id} style={{ backgroundColor: isPressed(hirer.id) ? '#a39e9e' : null }} onPress={() => handleItemPress(hirer.id)}>
                <DataTable.Cell textStyle={styles.columnItem}>{hirer.name}</DataTable.Cell>
                <DataTable.Cell style={{ marginRight: 15 }} textStyle={styles.columnItem}>{hirer.cpfCnpj}</DataTable.Cell>
                <DataTable.Cell><View style={[styles.colorIndicator, { backgroundColor: hirer.hexColor }]} /></DataTable.Cell>
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
  gridContext: {
    borderRadius: 20,
    width: "110%",
    height: "75%",
    backgroundColor: "#ebe8e8",
    alignItems: "center"
  },
});

export default ContratantesScreen;