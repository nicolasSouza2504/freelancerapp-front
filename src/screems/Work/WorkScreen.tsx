import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, SafeAreaView, Image } from 'react-native';
import { addDays } from 'date-fns';
import defaultStyle from '../../styles/DefaultStyles';



interface Work {
    startDate: string;
    endDate: string;
    totalValue: number;
    valuePerHour: number;
    hirerId: number;
    id: number;
}

interface Hirer {
    id: number;
    name: string;
    cpfCnpj: string;
    hexColor: string;
}

const hirers: Hirer[] = [
    { id: 1, name: "Hirer 1", cpfCnpj: "12345678901", hexColor: "#ffadad" },
    { id: 2, name: "Hirer 2", cpfCnpj: "23456789012", hexColor: "#ffd6a5" },
    { id: 3, name: "Hirer 3", cpfCnpj: "34567890123", hexColor: "#fdffb6" },
    { id: 4, name: "Hirer 4", cpfCnpj: "45678901234", hexColor: "#caffbf" },
];

const generateRandomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomWorks = (): Work[] => {
    const works: Work[] = [];
    for (let i = 0; i < 10; i++) {
        const startDate = generateRandomDate(new Date(2023, 0, 1), new Date());
        const endDate = new Date(startDate.getTime() + Math.random() * (1000 * 60 * 60 * 4));
        const hirerId = hirers[Math.floor(Math.random() * hirers.length)].id;
        works.push({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            totalValue: 50,
            valuePerHour: 10,
            hirerId,
            id: i + 1,
        });
    }
    return works;
};

const WorkService = {
    find: async (period?: { startDate: string; endDate: string }) => {
        // You can use the period parameter to filter the works if needed.
        const works = generateRandomWorks();
        return {
            works,
            hirers,
        };
    },
};

const WorkScreen: React.FC = () => {
    const [works, setWorks] = useState<Work[]>([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (period?: { startDate: string; endDate: string }) => {
        const data = await WorkService.find(period);
        setWorks(data.works);
    };

    const handleSelect = (ranges: any) => {
        setSelectionRange(ranges.selection);
        setShowDatePicker(false);
        fetchData({
            startDate: ranges.selection.startDate.toISOString(),
            endDate: ranges.selection.endDate.toISOString(),
        });
    };

    const renderWorkItem = ({ item }: { item: Work }) => {
        const hirer = hirers.find((h) => h.id === item.hirerId);
        return (
            <View style={[styles.workItem, { backgroundColor: hirer?.hexColor }]}>
                <Text>Contratante: {hirer?.name}</Text>
                <Text>De {new Date(item.startDate).toLocaleDateString()} - Até {new Date(item.endDate).toLocaleDateString()}</Text>
                <Text>Período: {`${new Date(item.startDate).getHours()} às ${new Date(item.endDate).getHours()}`}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.menuItem} onPress={() => setShowDatePicker(true)}>
                <Image source={require('../../images/Trabalhos.png')} style={styles.icon} />
                <Text style={defaultStyle.buttonText}>Trabalhos</Text>
            </TouchableOpacity>
            <Button title="Selecionar Período" />
            {showDatePicker && (
                <></>
            )}
            <FlatList
                data={works}
                renderItem={renderWorkItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.workList}
            />
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Adicionar Trabalho</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#002A3A',
        padding: 20,
        height: '100%',
        width: '100%'
    },
    workItem: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    workList: {
        paddingBottom: 16,
    },
    addButton: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
});

export default WorkScreen;