import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import defaultStyle from '../styles/DefaultStyles';

const MenuScreen: React.FC = () => {

  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  return (
    <View style={defaultStyle.containerDefault}>
      <Text style={defaultStyle.title}>Menu</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('WorkScreen')}>
          <Image source={require('../images/Trabalhos.png')} style={styles.icon} />
          <Text style={defaultStyle.buttonText}>Trabalhos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Hirers')}>
          <Image source={require('../images/Hirers.png')} style={styles.icon} />
          <Text style={defaultStyle.buttonText}>Contratantes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('Relatorios')}>
          <Image source={require('../images/Relatorios.png')} style={styles.icon} />
          <Text style={defaultStyle.buttonText}>Relatórios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 50,
    justifyContent: 'space-around',
    width: '100%',

  },
  menuItem: {
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  menuText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MenuScreen;