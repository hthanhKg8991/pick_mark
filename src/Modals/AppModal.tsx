import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, ViewStyle } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import Colors from 'Themes/Colors';
import { Spacing } from 'Themes/Spacing';
import { ModalPosition } from './ModalConfig';

interface IAppModal
{
    children: React.ReactNode,
    // isModal?: boolean
    onRequestClose?: ( ( event?: NativeSyntheticEvent<any> ) => void ) | undefined;
    avoidKeyboard?: boolean,
    containerStyle?: ViewStyle,
    position?: ModalPosition,
    dismiss?: ( ( event?: NativeSyntheticEvent<any> ) => void ) | undefined;

}
const AppModal = forwardRef( ( props: IAppModal, ref: Ref<any> ) =>
{
    const { children, onRequestClose, avoidKeyboard, containerStyle, position, dismiss } = props;
    const [ isVisible, setIsVisible ] = useState<boolean>( false );

    useImperativeHandle(
        ref,
        () => ( {
            showModal: () =>
            {
                setIsVisible( true );
            },
            hideModal: () =>
            {
                setIsVisible( false );
            },
        } ),
        [],
    );

    const onDismiss = useCallback( () =>
    {
        setIsVisible( !isVisible );
        onRequestClose && onRequestClose();
    }, [ isVisible, onRequestClose ] );

    return (
        <Portal>
            <Modal visible={isVisible} onDismiss={onDismiss} contentContainerStyle={styles.containerModal}>
                {children}
            </Modal>

        </Portal>
    )
} );
export default AppModal;
const styles = StyleSheet.create( {

    containerModal: {
        flex: 1,
        borderRadius: Spacing.extraTiny,
        alignContent: 'center',
        justifyContent: 'center',
    }
} );
