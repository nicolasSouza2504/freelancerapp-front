import React from "react";
import { Text, View } from "react-native";
import validationStyle from "../styles/ValidationStyle"

interface ValidationContainerProps {
    message: string;
}

const ValidationContainer: React.FC<ValidationContainerProps>  = ({message}) => {
    return (
        <View style={validationStyle.validationMessageContainer}>
            <Text style={validationStyle.validationMessageText}>{message}</Text>
        </View>);
}

export default ValidationContainer;