import BaseContainer from 'Base/BaseContainer';
import AppButton from 'Components/AppButton/AppButton';
import AppForm from 'Components/AppForm';
import Vertical from 'Components/AppSpacing/Vertical';
import { AppText } from 'Components/AppText';
import { AppRounded, AppSize, AppVariant } from 'Constants';
import RootNavigationInstance from 'Navigation/RootNavigation';
import Screens from 'Navigation/ScreenName';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AuthStyle, BaseStyle } from 'Styles';
import Colors from 'Themes/Colors';
import { Spacing } from 'Themes/Spacing';
import FormLogin from './FormLogin';
import { useTranslation } from 'react-i18next';
import AppImage from 'Components/AppImage/AppImage';
import Images from 'Assets/Images';


const LoginScreen = () =>
{
    const { t } = useTranslation( [] );
    const [ isPasswordVisible, setPasswordVisible ] = useState( false ); // State để quản lý secureTextEntry

    const defaultValues = {
        Email: '',
        Password: '',
    };
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<any>( {
        defaultValues: defaultValues,
    } );
    const onSubmit = ( data: any ) =>
    {
        console.log( 'onSubmit', data );
        // RootNavigationInstance.replace(Screens.SaleOrder, {});
        RootNavigationInstance.replace( Screens.SaleOrders, {} );
    };

    return (
        <BaseContainer isPaddingHorizontal edge={{ bottom: true, top: true }}>
            <ScrollView contentContainerStyle={[ BaseStyle.container ]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <AppText>Login</AppText>
                </TouchableWithoutFeedback>
                <View style={BaseStyle.centerVertical}>
                    {/* <AppText>Don't have account</AppText> */}
                </View>
            </ScrollView>
        </BaseContainer>
    );
};

export default memo( LoginScreen );
