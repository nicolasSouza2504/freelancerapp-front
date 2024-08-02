import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import defaultStyle from '../../styles/DefaultStyles';
import Hirer from '../../models/Hirer';
import { SafeAreaView } from 'react-native-safe-area-context';
import HirerService from '../../services/HirerService';
import { RouteProp, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import ToastComponent from '../../components/ToastComponent';

type RootStackParamList = {
    HirerForm: { hirer: Hirer };
};

type HirerFormScreenRouteProp = RouteProp<RootStackParamList, 'HirerForm'>;

const HirerFormScreen: React.FC = () => {

    const route = useRoute<HirerFormScreenRouteProp>();

    const hirer: Hirer | null = route.params ? route.params.hirer : null;

    const [editableHirer, setEditableHirer] = useState<Hirer>(hirer ? { ...hirer } : { name: '', cpfCnpj: '', hexColor: '' });
    const [nome, setNome] = useState<string>(editableHirer?.name || '');
    const [cpfCnpj, setCpfCnpj] = useState<string>(editableHirer?.cpfCnpj || '');
    const [hexColor, setHexColor] = useState<string>(editableHirer?.hexColor || '');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

    const navigation = useNavigation();

    const handleSave = async () => {

        const hirer: Hirer = { name: nome, cpfCnpj: cpfCnpj.replace(/\D/g, ''), hexColor: hexColor, id: editableHirer.id, userLoginId: editableHirer.userLoginId };

        let validHirer = validateHirer(hirer);

        if (validHirer) {

            try {

                const response = await HirerService.save(hirer);

                if (response.status === 200) {

                    ToastComponent.throwSuccess('Contratante Salvo com sucesso!');

                    setTimeout(() => {
                        navigation.navigate('Hirers' as never);
                    }, 1000);

                }

            } catch (error) {
                ToastComponent.throwError(error.message);
            }

        }

    };

    const handleCpfCnpjChange = (text: string) => {

        setCpfCnpj(text);

        const cleanValue = text.replace(/\D/g, '');

        let maskedValue = '';

        if (cleanValue.length <= 11) {
            maskedValue = maskCpf(cleanValue);
        } else if (cleanValue.length <= 14) {
            maskedValue = maskCnpj(cleanValue)
        } else {
            maskedValue = maskCnpj(cleanValue.slice(0, 14));
        }

        setCpfCnpj(maskedValue);

    };

    const maskCnpj = (cnpj: string): string => {

        return cnpj
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');

    }

    const maskCpf = (cpf: string): string => {

        return cpf.replace(/^(\d{3})(\d)/, '$1.$2')
            .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');

    }

    const validateHirer = (hirer: Hirer): boolean => {

        if (!hirer.cpfCnpj) {

            ToastComponent.throwError('Informe o cnpj/cpf do contratante!');

            return false;

        }

        if (!hirer.name) {

            ToastComponent.throwError('Informe o nome do contratante!')

            return false;

        }

        if (!hirer.hexColor) {

            ToastComponent.throwError('Informe a cor do contratante!')

            return false;

        }

        return true;

    }

    return (
        <SafeAreaView style={defaultStyle.containerDefault}>
            <TouchableOpacity onPress={() => { navigation.navigate('Menu' as never) }} style={defaultStyle.homeIcon}>
                <Image source={require('../../images/menu/Menu.png')} style={defaultStyle.icon} />
            </TouchableOpacity>
            <Toast />
            <Text style={styles.title}>Inserir Contratante</Text>
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
                onChangeText={handleCpfCnpjChange}
            />
            <View style={styles.colorPickerContainer}>
                <Text style={styles.label}>Cor</Text>
                <TouchableOpacity style={[styles.colorPreview, { backgroundColor: hexColor }]} onPress={() => setShowColorPicker(true)}>
                    <Text style={styles.colorPickerText}>✎</Text>
                </TouchableOpacity>
            </View>
            {showColorPicker && (
                <View style={styles.pickerWrapper}>
                    <ColorPicker
                        value={hexColor}
                        sliderThickness={20}
                        onComplete={(color) => {
                            setHexColor(color.hex);
                            setShowColorPicker(false);
                        }}
                        thumbSize={30}
                    >
                        <Panel1 style={styles.panel} />
                        <HueSlider style={styles.slider} />
                    </ColorPicker>
                </View>
            )}
            <TouchableOpacity style={defaultStyle.button} onPress={handleSave}>
                <Text style={defaultStyle.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    }
});

export default HirerFormScreen;