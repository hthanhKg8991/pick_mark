import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppModal } from 'Modals';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Button, Linking, Platform, Text, View } from 'react-native';
import { Portal } from 'react-native-paper';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
type CameraPermissionStatus = 'not-determined' | 'denied' | 'granted' | 'blocked';

type AppRequestPermissionProps = {
    onPermissionGranted: () => void;
}
const AppRequestPermission:FC<AppRequestPermissionProps> = ({onPermissionGranted}) =>
{
    const refModalLaunch = useRef<any>( null );
    const [ cameraPermissionStatus, setCameraPermissionStatus ] = useState<CameraPermissionStatus>( 'not-determined' );

    const openSetting = useCallback( () =>
    {
        if ( Platform.OS === 'android' )
        {
            Linking.openSettings();
        } else
        {
            Linking.canOpenURL( 'app-settings:' ).then( supported =>
            {
                if ( !supported )
                {
                    // this.onError()
                    console.log( 'Unable to open settings' );
                } else
                {
                    return Linking.openURL( 'app-settings:' );
                }
            } ).catch( err => console.log( 'Unable to open settings' ) );
        }
    }, [] );

    const checkCameraPermission = useCallback( async ( shouldRequest = false ) =>
    {
        const permissionMethod = shouldRequest ? request : check;

        const result = await permissionMethod( PERMISSIONS.ANDROID.CAMERA );
        console.log( `Camera permission status: ${result}` );
        switch ( result )
        {
            case RESULTS.UNAVAILABLE:
                console.log( 'This feature is not available on this device.' );
                setCameraPermissionStatus( 'denied' );
                break;
            case RESULTS.DENIED:
                console.log( 'Permission denied, you can request it.' );
                setCameraPermissionStatus( 'denied' );
                if ( shouldRequest ) { openSetting(); }
                break;
            case RESULTS.GRANTED:
                console.log( 'Permission granted' );
                onPermissionGranted();
                setCameraPermissionStatus( 'granted' );
                break;
            case RESULTS.BLOCKED:
                console.log( 'Permission is blocked, user has selected "Never ask again".' );
                setCameraPermissionStatus( 'blocked' );
                openSetting();
                break;
            default:
                console.log( 'Unknown permission status:', result );
                setCameraPermissionStatus( 'not-determined' );
        }
    }, [onPermissionGranted, openSetting] );

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            console.log('ThanhNguyen:: nextAppState', nextAppState);
            if (nextAppState === 'active') {
                checkCameraPermission(false);
                if (cameraPermissionStatus !== 'granted') {
                    checkCameraPermission(true);
                }
            }
        });

        return () => {
            subscription.remove();
        };
    }, [checkCameraPermission, cameraPermissionStatus]);

    useEffect(() => {
        checkCameraPermission(true);
        if (cameraPermissionStatus !== 'granted') {
            refModalLaunch.current?.showModal();
        }
    }, [cameraPermissionStatus, checkCameraPermission]);

    console.log( 'ThanhNguyen:: cameraPermissionStatus', cameraPermissionStatus );

    // const renderModal = useCallback( () =>
    // {
    //     return (
    //         <Portal>
    //             <AppModal ref={refModalLaunch} onRequestClose={() => refModalLaunch.current.hideModal()}>
    //                 <>
    //                     <Text>Requesting camera permission...</Text>
    //                     <Button title="Request camera permission" onPress={() => checkCameraPermission( true )} />
    //                 </>
    //             </AppModal>
    //         </Portal>
    //     );
    // }, [ checkCameraPermission ] );
    return (
        <View>
            {cameraPermissionStatus !== 'granted' && (
                <Portal>
                    <AppModal ref={refModalLaunch} onRequestClose={() => refModalLaunch.current.hideModal()}>
                        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                            <Text>Requesting camera permission...</Text>
                            <Button title="Request camera permission" onPress={() => checkCameraPermission(true)} />
                        </View>
                    </AppModal>
                </Portal>
            )}
        </View>
    );
};
export default memo( AppRequestPermission );
