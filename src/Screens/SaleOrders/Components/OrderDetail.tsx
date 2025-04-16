import BaseContainer from 'Base/BaseContainer';
import AppDivider from 'Components/AppDivider/AppDivider';
import AppImage from 'Components/AppImage/AppImage';
import Vertical from 'Components/AppSpacing/Vertical';
import AppTable from 'Components/AppTable';
import { AppText } from 'Components/AppText';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { BaseStyle, OrderStyle, TableStyle } from 'Styles';
import Colors from 'Themes/Colors';
import { Spacing } from 'Themes/Spacing';

type OrderDetailProps = {
    route: any;
};
const OrderDetail: FC<OrderDetailProps> = ( { route } ) =>
{
    const { t } = useTranslation( [] );
    const { item } = route.params;

    const renderImageList = () =>
    {
        return (
            <>
                <AppText bold>Image</AppText>
                <Vertical space={Spacing.medium} />
                <View style={[ BaseStyle.groupRow, BaseStyle.center, OrderStyle.imageGroup ]}>
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

            </>
        );
    };
    const renderRowItem = ( name: string, value: string ) =>
    {
        return (
            <View style={[ OrderStyle.groupItem ]}>
                <View style={[ BaseStyle.groupRow ]}>
                    <AppText>{name}: </AppText>
                    <AppText bold style={[ BaseStyle.flexShrink ]} >{value}</AppText>
                </View>
                <Divider />
            </View>
        )
    };

    const renderTotal = () =>
    {
        const tableData = [
            { label: 'OnHand', total: 0, S: 0, M: 0, L: 0, color: 'transparent' },
            { label: 'On Order', total: 234, S: 117, M: 78, L: 39, color: 'transparent' },
            { label: 'WIP', total: 150, S: 75, M: 50, L: 25, color: 'transparent' },
            { label: 'ATS', total: -84, S: -42, M: -28, L: -14, color: 'transparent' },
            { label: 'OTS', total: -234, S: -117, M: -78, L: -39, color: 'transparent' },
            { label: 'ATA', total: 0, S: 0, M: 0, L: 0, color: 'transparent' },
        ];
        return (
            <View style={[ OrderStyle.groupTotal ]}>
                <AppText bold>Total</AppText>
                <AppTable
                    tableData={tableData}
                    tableHead={[ '', 'Total', 'S', 'M', 'L' ]}
                    renderItem={
                        ( rowItem, index ) =>
                        {
                            return (
                                <View key={index} style={TableStyle.row}>
                                    <AppText style={[ TableStyle.cell ]}>
                                        {rowItem.label}
                                    </AppText>
                                    <AppText style={[ TableStyle.cell, { backgroundColor: rowItem.total < 0 ? Colors.textError : rowItem.color, color: rowItem.total < 0 ? Colors.textWhite : Colors.textPrimary } ]}>
                                        {rowItem.total}
                                    </AppText>
                                    <AppText style={[ TableStyle.cell, { backgroundColor: rowItem.S < 0 ? Colors.textError : rowItem.color, color: rowItem.S < 0 ? Colors.textWhite : Colors.textPrimary } ]}>
                                        {rowItem.S}
                                    </AppText>
                                    <AppText style={[ TableStyle.cell, { backgroundColor: rowItem.M < 0 ? Colors.textError : rowItem.color, color: rowItem.M < 0 ? Colors.textWhite : Colors.textPrimary } ]}>
                                        {rowItem.M}
                                    </AppText>
                                    <AppText style={[ TableStyle.cell, { backgroundColor: rowItem.L < 0 ? Colors.textError : rowItem.color, color: rowItem.L < 0 ? Colors.textWhite : Colors.textPrimary } ]}>
                                        {rowItem.L}
                                    </AppText>
                                </View>
                            )
                        }
                    }
                />
            </View >
        );
    };

    return (
        <BaseContainer
            isHeader
            // edge={{ bottom: true }}
            isPaddingHorizontal
            headerProps={{
                title: t('Orders.TitleDetail'),
                isBackButton: true,
                rightHeader: <View />,
            }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            // style={[ BaseStyle.container ]}
            // contentContainerStyle={[ BaseStyle.container ]}
            >
                <View style={[ OrderStyle.groupColumnHeader ]}>
                    {renderImageList()}
                    <Vertical space={Spacing.extraTiny} />
                    {renderRowItem( t('Orders.Description'), item?.description )}
                    {renderRowItem( 'Season', item?.season )}
                </View>
                <Vertical space={Spacing.extraTiny} />
                <View style={[ OrderStyle.groupsColumn ]}>
                    <View style={[ OrderStyle.itemColumn ]}>
                        {renderRowItem( 'Colors', item?.colors )}
                        {renderRowItem( 'Style', item?.style )}
                        {renderRowItem( 'ETA', item?.eta )}
                        {renderRowItem( 'Bundle', item?.bundle )}
                        {renderRowItem( 'Price1', item?.price1 )}
                        {renderRowItem( 'Price2', item?.price2 )}
                        {renderRowItem( 'Price3', item?.price3 )}
                    </View>
                    <AppDivider isVertical />
                    <View style={[ OrderStyle.itemColumn ]}>
                        {renderRowItem( 'Price4', item?.price4 )}
                        {renderRowItem( 'Price5', item?.price5 )}
                        {renderRowItem( 'MSRP', item?.msrp )}
                        {renderRowItem( 'Coo', item?.coo )}
                        {renderRowItem( 'AvailDate', item?.availDate )}
                        {renderRowItem( 'Unit Qty', item?.quantity )}
                        {renderRowItem( 'Bin', item?.bin )}
                    </View>
                </View>
                <Vertical space={Spacing.large} />
                {renderTotal()}
                <Vertical space={Spacing.largePlus} />
            </ScrollView>
        </BaseContainer>
    );
};
export default OrderDetail;
