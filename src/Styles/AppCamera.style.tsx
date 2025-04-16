import { StyleSheet } from 'react-native';

const AppCameraStyle = StyleSheet.create( {
    camera: {
        ...StyleSheet.absoluteFillObject,
    },
    scanArea: {
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
} );

export default AppCameraStyle;
