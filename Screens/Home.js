import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const { navigate } = useNavigation();

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigate('CameraScreen');
                }}
                style={styles.button}
            >
                <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigate('Gallery');
                }}
                style={[styles.button, { backgroundColor: 'yellow' }]}
            >
                <Text>Gallery</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 25,
        backgroundColor: 'blue',
    },
});
