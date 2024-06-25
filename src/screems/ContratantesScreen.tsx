import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Contratante from '../models/Contratantes';
import defaultStyle from '../styles/DefaultStyles';

const ContratantesScreen: React.FC = () => {
  
  const [contratantes, setContratantes] = useState<Contratante[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchContratantes();
  }, []);

  const fetchContratantes = async () => {
    try {
    //   const response = await axios.get<Contratante[]>('/contratantes');
    //   setContratantes(response.data);

    let contratante:Contratante = {cnpj:'65416', id: 1, name: 'Nicolas', color: 'White'};

    setContratantes([contratante]);

    } catch (error) {
      console.error(error);
    }
  };

  const handleHomePress = () => {
    navigation.navigate('Menu' as never);
  };

  const handleItemPress = (id: number) => {
    setSelectedId(id);
  };

  const renderItem = ({ item }: { item: Contratante }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.id)} style={[styles.item, selectedId === item.id && styles.selectedItem]}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.cnpj}</Text>
      <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
    </TouchableOpacity>
  );

  return (
    <View style={defaultStyle.containerDefault}>
      <TouchableOpacity onPress={handleHomePress} style={styles.homeIcon}>
        <Image source={require('../images/menu/Menu.png')} style={styles.icon} />
      </TouchableOpacity>
        <View>
            <Text style={defaultStyle.title}>Contratantes</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Inserir</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Editar</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Excluir</Text></TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={contratantes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}/>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#062d40',
    padding: 16,
  },
  homeIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    color: '#d0de3b',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 25,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  list: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#d0de3b',
  },
  itemText: {
    fontSize: 16,
  },
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
});

export default ContratantesScreen;