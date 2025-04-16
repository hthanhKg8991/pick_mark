import { AppRounded, AppSize, AppVariant } from 'Constants';
import { FC, forwardRef, memo, Ref } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { Spacing } from 'Themes/Spacing';
import ButtonSizes from './Entries/ButtonSize';

interface AppButtonProps extends ButtonProps
{
    fullWidth?: boolean,
    style?: ViewStyle,
    variant?: AppVariant,
    rounded?: AppRounded,
    size?: AppSize
    children: React.ReactNode;
}

// const AppButton:FC<AppButtonProps> = forwardRef(({variant = AppVariant.Default, rounded = AppRounded.Square, size = AppSize.Medium, textButton, fullWidth, style,...props}, ref:Ref<any>) => {
//     const combineStyle = fullWidth ? {width: '100%'} : {};
//     return(
//             <TouchableOpacity
//                 ref={ref}
//                 disabled={AppVariant.Disable === variant}
//                 style={[styles.button, ButtonVariants(variant), ButtonRounded(rounded), ButtonSizes(size), combineStyle, style]}
//                 {...props}
//             >
//                 <AppText style={{color: Colors.textWhite}}>{textButton}</AppText>
//             </TouchableOpacity>
//     );
// });
const AppButton: FC<AppButtonProps> = forwardRef( ( { variant = AppVariant.Default, rounded = AppRounded.Square, size = AppSize.Medium, children, fullWidth, style, ...props }, ref: Ref<any> ) =>
{
    const combineStyle = fullWidth ? { width: '100%' as `${number}%` } : {};
    return (
        <Button
            ref={ref}
            mode="contained"
            contentStyle={ButtonSizes(size)}
            style={[combineStyle]}
            {...props}
        >
            {children}
        </Button>
    );
} );

export default memo( AppButton );
const styles = StyleSheet.create( {
    button: {
        paddingHorizontal: Spacing.extraTiny,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
} );
