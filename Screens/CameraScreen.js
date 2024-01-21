import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';
const CameraScreen = () => {
    const [cameraPermissions, setCameraPermissions] = useState(false);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [side, setSide] = useState(Camera.Constants.Type.back);
    const [photo, setPhoto] = useState(null);

    let cameraRef = useRef();

    useEffect(() => {
        (async () => {
            const hasPermissions = await Camera.requestCameraPermissionsAsync();
            setCameraPermissions(hasPermissions.granted);
        })();
    }, []);

    const switchCamera = () => {
        setSide((prevSide) =>
            prevSide === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const toggleFlash = () => {
        setFlash((prevFlash) =>
            prevFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
        );
    };

    const takePic = async () => {
        if (!cameraPermissions) {
            // Alert.alert()
            return;
        }
        let options = {
            quality: 1,
            base64: true,
            exif: false,
        };
        // console.log(cameraRef.current.takePictureAsync);
        const newPhoto = await cameraRef.current.takePictureAsync(options);

        setPhoto(newPhoto);
    };

    const savePic = async () => {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        setPhoto(null);
    };

    const sharePic = async () => {
        await shareAsync(photo.uri);
        setPhoto(null);
    };

    return (
        <View style={styles.container}>
            {photo ? (
                <View style={styles.container}>
                    <Image style={styles.img} source={{ uri: photo.uri }} />
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={savePic}>
                            <Text>Save Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sharePic}>
                            <Text>Share Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Camera
                    ref={cameraRef}
                    flashMode={flash}
                    type={side}
                    ratio="16:9"
                    style={styles.container}
                >
                    <View style={styles.btnsContainer}>
                        <TouchableOpacity onPress={toggleFlash}>
                            <Text style={styles.btn}>Flash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={takePic}
                            style={styles.takePic}
                        ></TouchableOpacity>
                        <TouchableOpacity onPress={switchCamera}>
                            <Text style={styles.btn}>Side</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    btnsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 10,
    },
    btn: {
        fontSize: 30,
    },
    takePic: {
        width: 50,
        height: 50,
        borderRadius: 9999,
        backgroundColor: 'white',
    },
    img: {
        flex: 1,
    },
});
