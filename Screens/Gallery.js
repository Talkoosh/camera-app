import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
const Gallery = () => {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        (async () => {
            const permissions = await MediaLibrary.requestPermissionsAsync();
            if (permissions.status === 'granted') {
                const media = await MediaLibrary.getAssetsAsync({ first: 50 });
                setPictures(media.assets);
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={pictures}
                renderItem={({ item }) => <Image style={styles.image} source={{ uri: item.uri }} />}
                keyExtractor={(picture) => picture.id}
                numColumns={3}
            />
        </View>
    );
};

export default Gallery;

const styles = StyleSheet.create({
    container: { flex: 1 },
    image: {
        width: 120,
        height: 120,
        margin: 5,
    },
});
