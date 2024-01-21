import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //BrowserRouter
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Routes, Route
import Home from './Screens/Home';
import CameraScreen from './Screens/CameraScreen';
import Gallery from './Screens/Gallery';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CameraScreen" component={CameraScreen} />
                <Stack.Screen name="Gallery" component={Gallery} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
