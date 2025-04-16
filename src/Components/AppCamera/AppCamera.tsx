import BaseContainer from 'Base/BaseContainer';
import AppButton from 'Components/AppButton/AppButton';
import AppIcon from 'Components/AppIcon/AppIcon';
import Vertical from 'Components/AppSpacing/Vertical';
import { AppText } from 'Components/AppText';
import AppRequestPermission from 'Configs/RequestPermission';
import { AppRounded, AppSize, AppVariant } from 'Constants';
import RootNavigationInstance from 'Navigation/RootNavigation';
import Screens from 'Navigation/ScreenName';
import { FC, memo, useCallback, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import QrImageReader, { DecodeOptions } from 'react-native-qr-image-reader';
import { runOnJS } from 'react-native-reanimated';
import { Camera, Code, Point, useCameraDevice, useCodeScanner, useFrameProcessor } from 'react-native-vision-camera';
import { BaseStyle } from 'Styles';
import AppCameraStyle from 'Styles/AppCamera.style';
import { Spacing } from 'Themes/Spacing';
import { mediaPickerScan, optionsImage } from 'Utils/ImagePickerUtil';
import Svg, { Polygon } from 'react-native-svg';

type AppCameraProps = {
    isFocused?: any;
    onClose?: () => void;
}
const AppCamera: FC<AppCameraProps> = ( { isFocused, onClose } ) =>
{
    const isActive = isFocused;
    const camera = useRef<Camera>( null )
    const [ scanned, setScanned ] = useState( false );
    const device = useCameraDevice( 'back' );
    const [ zoomLevel, setZoomLevel ] = useState( 1 );
    const [ torch, setTorch ] = useState( false );
    const [ scanValue, setScanValue ] = useState<string>( '' );
    const [ boundingBox, setBoundingBox ] = useState<any>( {} );
    const [ isPermissionGranted, setIsPermissionGranted ] = useState( false ); // Theo dõi trạng thái quyền
    const [corners, setCorners] = useState<Point[] | null>(null); // Lưu tọa độ các góc của mã QR

    const onCodeScanned = useCallback( ( codes: Code[] ) =>
    {
        if ( codes.length === 0 ) { return; }
        // if ( scanned ) { return; }
        setScanned( true );
        // setZoomLevel( 2 );
        console.log( 'ThanhNguyen:: codes', codes );
        const code = codes[ 0 ];
        if ( !code || !code.frame ) { return; }
        // if ( code == null )
        // {
        //     setScanned( false );
        //     return;
        // }
        setScanValue( code.value ?? '' );
        setCorners(code?.corners ?? null);
        setBoundingBox( {
            x: codes[ 0 ]?.frame?.x ?? 0,
            y: codes[ 0 ]?.frame?.y ?? 0,
            width: codes[ 0 ]?.frame?.width ?? 0,
            height: codes[ 0 ]?.frame?.height ?? 0,
        } );
    }, [] );

    const codeScanner = useCodeScanner( {
        codeTypes: [ 'qr', 'ean-13', 'ean-8', 'upc-a', 'upc-e' ],
        onCodeScanned: onCodeScanned,
    } );

    const focus = useCallback( ( point: Point ) =>
    {
        const c = camera.current;
        if ( c == null ) { return; }
        c.focus( point );
    }, [] );

    const gesture = Gesture.Tap()
        .onEnd( ( { x, y } ) =>
        {
            runOnJS( focus )( { x, y } )
        } );

    const handleScanner = useCallback( () =>
    {
        RootNavigationInstance?.navigate( Screens.SaleOrdersForm, { value: scanValue } );
        setScanValue( '' );
        setScanned( false );
        setBoundingBox( null );
        onClose && onClose();
    }, [ onClose, scanValue ] );


    const decodeImage = async ( options: DecodeOptions ) =>
    {
        const {
            result: decodeResult,
            // errorCode,
            // errorMessage,
        } = await QrImageReader.decode( options );

        setScanValue( decodeResult || 'undefined' );
    };

    const handlePickImage = async () =>
    {
        try
        {
            const image = await mediaPickerScan( {
                options: optionsImage.profileImage,
                maxImage: 1,
            } );
            if ( image )
            {
                decodeImage( {
                    path: image?.[ 0 ].uri,
                } );
            }
        } catch ( error )
        {
            console.error( 'Error picking image:', error );
        }
    };

    const frameProcessor = useFrameProcessor( ( frame ) =>
    {
        'worklet';
        // runOnJS(setBoundingBox)(frame);
        // const result = detectText(frame);
        // if (result?.length > 0) {
        //     runOnJS(console.log)(result); // In kết quả phát hiện chữ
        // }
        // const result = detectText(frame); // Phát hiện chữ từ khung hình
        // if (result?.length > 0) {
        //     const firstResult = result.map((item) => item.text).join('\n'); // Ghép các dòng chữ
        //     runOnJS(setDetectedText)(firstResult); // Cập nhật chữ trên thread chính
        // }
    }, [] );

    const scanArea = () =>
    {
        return (
            <>
                {corners && (
                    <Svg
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Polygon
                            points={corners.map( ( corner ) => `${corner.x},${corner.y}` ).join( ' ' )} // Tạo chuỗi tọa độ
                            fill="rgba(255, 0, 0, 0.2)" // Màu nền mờ
                            stroke="red" // Màu viền
                            strokeWidth="2" // Độ dày viền
                        />
                    </Svg>
                )}
            </>
        )
    }
    return (
        <BaseContainer edge={{ bottom: true }}>
            <>
                <AppRequestPermission onPermissionGranted={() => setIsPermissionGranted( true )} />
                <View style={BaseStyle.container}>
                    {isPermissionGranted && device && (
                        // <GestureDetector gesture={gesture}>
                        <Camera
                            style={AppCameraStyle.camera}
                            device={device}
                            isActive={isActive}
                            codeScanner={codeScanner}
                            enableZoomGesture={true}
                            zoom={zoomLevel}
                            ref={camera}
                            torch={torch ? 'on' : 'off'}
                            frameProcessor={frameProcessor}
                        />
                        // </GestureDetector>
                    )}
                    {
                        scanArea()
                        // boundingBox &&
                        // <View style={[ AppCameraStyle.scanArea, boundingBox ]} />
                    }
                    {/* {boundingBox && (
                        <View
                            style={{
                                position: 'absolute',
                                left: boundingBox.x,
                                top: boundingBox.y,
                                width: boundingBox.width,
                                height: boundingBox.height,
                                borderWidth: 2,
                                borderColor: 'red',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Màu nền mờ
                            }}
                        />
                    )} */}
                </View>
                <Vertical space={Spacing.largePlus} />
                <View style={[ BaseStyle.contentPadding ]}>
                    <View style={[ BaseStyle.groupRow, BaseStyle.center ]}>
                        <TouchableOpacity onPress={handlePickImage}>
                            <AppText bold size={AppSize.Large} ><AppIcon name="photo-camera" /></AppText>
                        </TouchableOpacity>
                        <View style={[ BaseStyle.center, BaseStyle.container ]}>
                            <AppText>Scanned Barcode:</AppText>
                        </View>
                        <TouchableOpacity onPress={() => setTorch( !torch )}>
                            {
                                !torch ? <AppIcon name="flash-off" /> : <AppIcon name="flash-on" />
                            }
                        </TouchableOpacity>
                    </View>
                    <Vertical space={Spacing.largePlus} />
                    <View style={[ BaseStyle.center ]}>
                        <AppText bold
                            size={AppSize.xLarge}
                            variant={AppVariant.Warning}
                            style={BaseStyle.letterSpacing2}
                        >{scanValue}</AppText>
                    </View>
                </View>
                <Vertical space={Spacing.largePlus} />
                <AppButton
                    variant={AppVariant.Default}
                    rounded={AppRounded.Shape}
                    size={AppSize.Large}
                    fullWidth
                    onPress={handleScanner}
                >
                    Scan
                </AppButton>
            </>

        </BaseContainer>
    );
};
export default memo( AppCamera );