import React from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

// Implement <Toast/> on component to see the message

const ToastComponent = {
    throwError(message: string) {
        Toast.show({
            type: 'error',
            text1: message,
            visibilityTime: 3000
        });
    },
    throwSuccess(message: string) {
        Toast.show({
            type: 'success',
            text1: message,
            visibilityTime: 3000
        });
    },

}
export default ToastComponent;