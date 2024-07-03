import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import defaultStyle from '../../styles/DefaultStyles';
import Hirer from '../../models/Hirer';

interface HirerFormProps {
    hirer?: Hirer;
}

const HirerFormScreen: React.FC<HirerFormProps> = ({ hirer }) => {

    const [nome, setNome] = useState<string>(hirer?.name || '');
    const [cpfCnpj, setCpfCnpj] = useState<string>(hirer?.cpfCnpj || '');
    const [cor, setCor] = useState<string>(hirer?.hexColor || '');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    const navigation = useNavigation();

    const handleSave = () => {
        // Logic to save the data
        console.log({ nome, cpfCnpj, cor });
        // Navigate back or to another screen after saving
    };

    return (
        <View style={defaultStyle.containerDefault}>
            <TouchableOpacity onPress={() => { navigation.navigate('Menu' as never) }} style={defaultStyle.homeIcon}>
                <Image source={require('../../images/menu/Menu.png')} style={defaultStyle.icon} />
            </TouchableOpacity>
            <Text style={styles.title}>Inserir Contratantes</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#000"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="CPF/CNPJ"
                placeholderTextColor="#000"
                value={cpfCnpj}
                onChangeText={setCpfCnpj}
            />
            <View style={styles.colorPickerContainer}>
                <Text style={styles.label}>Cor</Text>
                <TouchableOpacity style={[styles.colorPreview, { backgroundColor: cor }]} onPress={() => setShowColorPicker(true)}>
                    <Text style={styles.colorPickerText}>✎</Text>
                </TouchableOpacity>
            </View>
            {showColorPicker && (
                <View style={styles.pickerWrapper}>
                    <ColorPicker
                        value={cor}
                        sliderThickness={20}
                        onComplete={(color) => {
                            setCor(color.hex);
                            setShowColorPicker(false);
                        }}
                        thumbSize={30}
                    >
                        <Panel1 style={styles.panel} />
                        <HueSlider style={styles.slider} />
                    </ColorPicker>
                </View>
            )}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    homeIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    title: {
        ...defaultStyle.title,
        marginBottom: 20,
    },
    input: {
        ...defaultStyle.input,
        marginBottom: 15,
    },
    colorPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#fff',
    },
    colorPreview: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorPickerText: {
        color: '#fff',
    },
    pickerWrapper: {
        width: '100%',
        padding: 10,
    },
    panel: {
        height: 200,
    },
    slider: {
        marginTop: 20,
        height: 40,
    },
    saveButton: {
        ...defaultStyle.button,
    },
    saveButtonText: {
        ...defaultStyle.buttonText,
    },
});

export default HirerFormScreen;