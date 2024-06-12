import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
     
    async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing AsyncStorage', error);
        }
    };


    async setItem (key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('Error setting item to AsyncStorage', error);
        }
    };

    async getItem (key: string): Promise<string | null> {
        
        try {
            
            const value = await AsyncStorage.getItem(key);
            
            return value;

        } catch (error) {
            
            console.error('Error getting item from AsyncStorage', error);
            
            return null;

        }

    };

    async removeItem (key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing item from AsyncStorage', error);
        }
    };

};

export default new StorageService();