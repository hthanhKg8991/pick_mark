import AppIcon from 'Components/AppIcon/AppIcon';
import React from 'react';

import { Image, ImageProps, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { Modal, Portal } from 'react-native-paper';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from 'Themes/Scaling';
import { Colors } from '../../Themes';
import { Spacing } from '../../Themes/Spacing';
type AppImageProps = {
    isPreview?: boolean,
    source?: FastImageProps | ImageProps,
    sizeW?: number,
    sizeH?: number,
    rounded?: number,
    style?: StyleProp<ViewStyle>;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}
const AppImage = ( { isPreview, source, style, sizeW, sizeH, rounded, resizeMode = 'cover', ...rest }: AppImageProps ) =>
{
    const [ visible, setVisible ] = React.useState( false );
    const showModal = () => setVisible( true );
    const hideModal = () => setVisible( false );

    let Component: any = FastImage;
    if ( source )
    {
        Component = Image;
    }
    const computedStyle: StyleProp<ViewStyle> = [
        { width: sizeW ?? undefined, height: sizeH ?? undefined },
        rounded !== undefined ? { borderRadius: rounded } : {},
        style,
    ];

    const renderModal = () =>
    {
        return (
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerModal}>
                    <AppImage
                        source={source}
                        sizeW={DEVICE_WIDTH * 0.85}
                        sizeH={DEVICE_HEIGHT * 0.6}
                        resizeMode="contain"
                    />
                </Modal>
            </Portal>
        );
    };
    return (
        <View>
            <Component
                source={source}
                style={computedStyle}
                resizeMode={resizeMode}
                {...rest}
            />
            {
                isPreview && <View style={styles.wrapEye}>
                    <TouchableOpacity
                        onPress={showModal}
                        style={styles.eys}>
                        <AppIcon name="visibility" color={Colors.text} />
                    </TouchableOpacity>
                </View>
            }
            {renderModal()}
        </View>
    );
};
export default AppImage;
const styles = StyleSheet.create( {
    wrapEye: {
        ...StyleSheet.absoluteFillObject,
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eys: {
        borderRadius: Spacing.space20,
        width: Spacing.space40,
        height: Spacing.space40,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerModal: {
        backgroundColor: Colors.primary,
        marginHorizontal: Spacing.space16,
        borderRadius: Spacing.space16,
        alignContent: 'center',
        justifyContent: 'center',
        padding: Spacing.space16,
    }
} );
