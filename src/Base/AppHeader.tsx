import { useNavigation } from '@react-navigation/native';
import AppIcon from 'Components/AppIcon/AppIcon';
import { AppText } from 'Components/AppText';
import { AppSize } from 'Constants';
import { FC, memo, useMemo } from 'react';
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Spacing } from 'Themes/Spacing';

type AppHeaderProps = {
    title?: string;
    isBackButton?: boolean;
    leftHeader?: React.ReactNode;
    rightHeader?: React.ReactNode;
    onBackPress?: ( ( event: GestureResponderEvent ) => void ) | undefined;
}
const AppHeader: FC<AppHeaderProps> = ( { isBackButton, onBackPress, leftHeader, title, rightHeader } ) =>
{
    const navigation = useNavigation();
    const renderBackButton = useMemo( () =>
    {
        return (
            <TouchableOpacity
                onPress={onBackPress ?? navigation.goBack}>
                    <AppIcon name="arrow-back-ios" />
            </TouchableOpacity>
        );
    }, [ navigation.goBack, onBackPress ] );

    const renderLeftComponent = useMemo( () =>
    {
        if ( isBackButton )
        {
            return renderBackButton;
        } else
        {
            return leftHeader;
        }
    }, [ isBackButton, leftHeader, renderBackButton ] );

    return (
        <View style={styles.headerContainer}>
            {renderLeftComponent}
            <AppText bold size={AppSize.Large}>{title}</AppText>
            {rightHeader}
        </View>
    );
};
export default memo( AppHeader );
const styles = StyleSheet.create( {
    headerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: Spacing.large,
        paddingVertical: Spacing.medium,
    },
} );
