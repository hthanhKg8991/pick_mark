import AppInput from 'Components/AppInput/AppInput';
import Vertical from 'Components/AppSpacing/Vertical';
import { FC } from 'react';
import { Controller, FormProps, FormProviderProps } from 'react-hook-form';
import { Spacing } from '../../Themes/Spacing';

interface AppFormProps extends FormProps<FormProviderProps>
{
    listForm?: Array<any>,
    defaultValues?: Record<string, any>,
    control?: any,
    errors?: any,
}
const AppForm: FC<AppFormProps> = ( { listForm, defaultValues, control, errors } ) =>
{
    return (
        <>
            {
                listForm?.map( ( item, index ) =>
                {
                    return (
                        <Controller
                            key={`${item.id}-${index}`}
                            name={item.name}
                            control={control}
                            rules={item.rules}
                            defaultValue={defaultValues}
                            render={( { field: { onChange, onBlur, value } } ) =>
                            {
                                return (
                                    <>
                                        <AppInput
                                            label={item.name}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            defaultValue={defaultValues?.[ item.code ]}
                                            errorMessage={errors[ item.code ] && errors[ item.code ]?.message}
                                            {...item.inputProps}
                                        />
                                        <Vertical space={Spacing.space12} />
                                    </>
                                );
                            }}
                        />
                    );
                } )

            }
        </>
    );
};
export default AppForm;

