import { FC, useMemo } from 'react';
import { StatusBar, StyleSheet, View, ViewProps, GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from 'Base/AppHeader';
import {Colors} from '../Themes';
import { Spacing } from '../Themes/Spacing';
interface BaseContainerProps extends ViewProps
{
    children: React.ReactNode,
    style?: ViewProps[ 'style' ];
    edge?: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean };
    isPaddingHorizontal?: boolean;
    isHeader?: boolean;
    isBackButton?: boolean;
    headerProps?: {
        isBackButton?: boolean;
        title?: string;
        leftHeader?: React.ReactNode;
        rightHeader?: React.ReactNode;
        onBackPress?: ( ( event: GestureResponderEvent ) => void ) | undefined;
    };
    [ key: string ]: any; // Allow any other props
}

const BaseContainer: FC<BaseContainerProps> = ( { children, style, isPaddingHorizontal, isHeader, edge = { top: true }, headerProps } ) =>
{
    const insets = useSafeAreaInsets();
    const edgeInsets = useMemo(
        () => ( {
            paddingTop: edge.top ? insets.top : 0,
            paddingBottom: edge.bottom ? insets.bottom : 0,
            paddingLeft: edge.left ? insets.left : 0,
            paddingRight: edge.right ? insets.right : 0,
        } ),
        [ edge, insets ]
    );

    const computedStyle = isPaddingHorizontal ? { paddingHorizontal: Spacing.space16 } : {};

    return (
        <View style={[ styles.container, edgeInsets, style ]}>
            <StatusBar translucent />
            {isHeader && <AppHeader {...headerProps} />}
            <View style={[styles.container, computedStyle]}>
                {children}
            </View>
        </View>
    );
};
export default BaseContainer;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
} );
