import AppIcon from 'Components/AppIcon/AppIcon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextInputProps, TouchableOpacity } from 'react-native';
import { stringInterpolate } from 'Utils/Helpers';

type FormField = {
    code: string;
    name: string;
    rules: {
        required: {
            value: boolean;
            message: string;
        };
        pattern?: {
            value: RegExp;
            message: string;
        };
        minLength?: {
            value: number;
            message: string;
        };
    };
    message: string;
    inputProps: TextInputProps & {
        iconRight?: React.ReactNode; // Định nghĩa kiểu cho `iconRight`
    };
};

const FormLogin = (
    isPasswordVisible: boolean,
    setPasswordVisible: ( value: boolean ) => void
): FormField[] =>
{
    const { t } = useTranslation([]);
    return [
        {
            code: 'Email',
            name: t('Auth.Email'),
            rules: {
                required: {
                    value: true,
                    message: t('Auth.PleaseEnterYourEmail'),
                },
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email is not valid',
                },
            },
            message:  stringInterpolate(t('Auth.PleaseEnterYour_S'), ['Email']),
            inputProps: {
                placeholder: stringInterpolate(t('Auth.PleaseEnterYour_S'), ['Email']),
                autoCapitalize: 'none',
            },
        },
        {
            code: 'Password',
            name: t('Auth.Password'),
            rules: {
                required: {
                    value: true,
                    message: stringInterpolate(t('Auth.PleaseEnterYour_S'), ['Password']),
                },
                minLength: {
                    value: 8,
                    message: stringInterpolate(t('PasswordMustBeAtLeast_S_Characters'), [ 8 ]),
                },
            },
            message: 'Please enter a valid password with at least 8 characters',
            inputProps: {
                placeholder: stringInterpolate(t('Auth.PleaseEnterYour_S'), ['Password']),
                secureTextEntry: !isPasswordVisible,
                iconRight: (
                    <TouchableOpacity onPress={() => setPasswordVisible( !isPasswordVisible )}>
                        {!isPasswordVisible ? <AppIcon name="visibility-off" /> : <AppIcon name="visibility" />}
                    </TouchableOpacity>
                ),
            },
        },
    ];
};

export default FormLogin;
