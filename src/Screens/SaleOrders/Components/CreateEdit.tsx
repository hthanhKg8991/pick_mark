import BaseContainer from 'Base/BaseContainer';
import AppForm from 'Components/AppForm';
import { FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import FormCreateEditOrder from './FormOrder';
import AppButton from 'Components/AppButton/AppButton';
import { AppVariant, AppRounded, AppSize } from 'Constants';
import AppImage from 'Components/AppImage/AppImage';
import { AppText } from 'Components/AppText';
import { BaseStyle, OrderStyle } from 'Styles';
import Vertical from 'Components/AppSpacing/Vertical';
import { Spacing } from 'Themes/Spacing';
import OrderList from 'DummyData/OrderList.json';

type CreateEditProps = {
    route: any;
};
const CreateEdit: FC<CreateEditProps> = ( { route } ) =>
{
    const { value } = route.params;
    const item = OrderList.find(orderItem => orderItem.code === value);
    console.log( 'OrderDetail::OrderList', route.params );
    console.log( 'OrderDetail::Lisst',item );

    console.log( 'item', item );
    const defaultValues = {
        Style: item?.style,
        Color: item?.colors,
        Description: item?.description,
        Season: item?.season,
        ETA: item?.eta,
        Bundle: item?.bundle.toString(),
        Price1: item?.price1,
        Price2: item?.price2,
        Price3: item?.price3,
        Price4: item?.price4,
        Price5: item?.price5.toString(),
        Coo: item?.coo,
        MSRP: item?.msrp,
        AvailDate: item?.availDate,
        Unit_Qty: item?.quantity.toString(),
        Bin: item?.bin,
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
    };

    const renderImageList = () =>
    {
        return (
            <View>
                <AppText bold>Image</AppText>
                <Vertical space={Spacing.medium}/>
                <View style={[ BaseStyle.container, BaseStyle.groupRow, BaseStyle.center, OrderStyle.imageGroup ]}>
                    <View style={OrderStyle.imageView}>
                        <AppText bold>Image Font</AppText>
                        <AppImage
                            source={{ uri: item?.imageFont } as any}
                            sizeW={100}
                            sizeH={100}
                            isPreview
                        />
                    </View>
                    <View style={OrderStyle.imageView}>
                        <AppText bold>Image Back</AppText>
                        <AppImage
                            source={{ uri: item?.imageBack } as any}
                            sizeW={100}
                            sizeH={100}
                            isPreview
                        />
                    </View>
                </View>

            </View>
        );
    };

    return (
        <BaseContainer
            isPaddingHorizontal
            isHeader
            headerProps={{
                title: 'Create Order',
                isBackButton: true,
                rightHeader: <View />,
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        {renderImageList()}
                        <Vertical space={Spacing.largePlus}/>
                        <AppForm
                            control={control}
                            listForm={FormCreateEditOrder}
                            errors={errors}
                            defaultValues={defaultValues}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <AppButton
                variant={AppVariant.Default}
                rounded={AppRounded.Shape}
                size={AppSize.Large}
                fullWidth
                onPress={handleSubmit( onSubmit )}
            >
                Save
            </AppButton>
            <Vertical space={Spacing.largePlus} />
        </BaseContainer>
    );
};
export default memo( CreateEdit );
