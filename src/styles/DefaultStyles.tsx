import React from "react";
import { StyleSheet } from "react-native";

const defaultStyle = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#F5DEB3',
        borderRadius: 5,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#000',
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
    containerDefault: {
        flex: 1,
        backgroundColor: '#002A3A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 32,
        color: '#fff',
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 25,
        marginBottom: 20,
    }
});

export default defaultStyle;