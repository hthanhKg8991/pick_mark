import AppText from 'Components/AppText/AppText';
import { AppVariant } from 'Constants';
import React, { FC, forwardRef, Ref } from 'react';
import { StyleProp, StyleSheet,  View, ViewStyle, TextInput, TextInputProps } from 'react-native';
import Colors from 'Themes/Colors';
import { Spacing } from 'Themes/Spacing';
import { isEmpty } from 'Utils/Helpers';
// import { TextInput, TextInputProps } from 'react-native-paper';
interface AppInputProps extends TextInputProps{
    containerStyle?: StyleProp<ViewStyle> | undefined;
    inputStyle?: StyleProp<ViewStyle> | undefined;
    label?: string,
    isError?: boolean,
    // errorMessage?: string | null | undefined,
    errorMessage?: any,
    iconRight?: React.ReactNode,
    iconLeft?: React.ReactNode,
}

const AppInput:FC<AppInputProps> = forwardRef(({containerStyle, inputStyle, label, errorMessage, iconRight, ...props}, ref: Ref<TextInput>) =>{
    const computedStyle = !isEmpty(errorMessage) ? { borderColor: Colors.borderError} : {};
    console.log('ThanhNguyen:: iconRight', iconRight);
    return(
        <View style={[styles.container,containerStyle]}>
            <View style={[styles.label]}>
                <AppText bold>{label}</AppText>
            </View>
            <View style={[styles.wrapInput, computedStyle]}>
                <TextInput
                    ref={ref}
                    style={[styles.input, inputStyle]}
                    importantForAutofill="no"
                    autoComplete="off"
                    placeholderTextColor={Colors.textPlaceholder}
                    {...props}
                />
                {iconRight}
            </View>
            {
                !isEmpty(errorMessage) && <AppText variant={AppVariant.Error}>{errorMessage}</AppText>
            }
        </View>
    );
});
export default AppInput;
const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginBottom: Spacing.mediumSmall,
    },
    wrapInput:{
        paddingHorizontal: Spacing.space16,
        borderColor: Colors.border,
        borderWidth: 1,
        borderRadius: Spacing.space4,
        width: '100%',
        height: Spacing.colossalPlus,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
    },
    label:{
        marginBottom: Spacing.extraTiny,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
