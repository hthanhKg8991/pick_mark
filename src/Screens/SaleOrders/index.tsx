import BaseContainer from 'Base/BaseContainer';
import AppCamera from 'Components/AppCamera/AppCamera';
import AppDivider from 'Components/AppDivider/AppDivider';
import AppIcon from 'Components/AppIcon/AppIcon';
import AppImage from 'Components/AppImage/AppImage';
import AppList from 'Components/AppList/AppList';
import { AppText } from 'Components/AppText';
import { AppSize } from 'Constants';
import OrderList from 'DummyData/OrderList.json';
import i18n from 'Languages/i18n';
import { AppModal } from 'Modals';
import RootNavigationInstance from 'Navigation/RootNavigation';
import Screens from 'Navigation/ScreenName';
import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { BaseStyle, OrderStyle } from 'Styles';
import Colors from 'Themes/Colors';
const SaleOrders = () =>
{
    const { t } = useTranslation( [] );
    const totalQuantity = OrderList.reduce( ( sum, item ) => sum + item.quantity, 0 );
    const totalExtPrice = OrderList.reduce( ( sum, item ) => sum + item.extPrice, 0 );
    const refModalLaunch = useRef<any>( null );
    const handleScanner = () =>
    {
        refModalLaunch.current.showModal();
        // RootNavigationInstance?.navigate( Screens.AppCamera, {} );
    };
    const handleOrderDetail = ( item: any ) =>
    {
        RootNavigationInstance?.navigate( Screens.SaleOrdersDetail, { item: item } );
        // RootNavigationInstance?.navigate( Screens.SaleOrdersForm, {item: item} );
    };

    const renderItem = ( { item, index }: any ) =>
    {
        return (
            <TouchableOpacity
                onPress={() => handleOrderDetail( item )}
                style={OrderStyle.items}
                key={`${item.id}-${index}`}>
                <View style={BaseStyle.groupRow}>
                    <AppImage
                        source={{ uri: item.image } as any}
                        sizeW={50}
                        sizeH={50}
                    />
                    <View>
                        <View style={BaseStyle.groupRow}>
                            <AppText bold>{item.code}</AppText>
                            <AppText bold>/</AppText>
                            <AppText bold>{item.name}</AppText>
                        </View>
                        <View style={BaseStyle.groupRow}>
                            <View style={BaseStyle.groupRow}>
                                <AppText size={AppSize.Large}>Unit Price: </AppText>
                                <AppText bold>{`$${item.unitPrice}`}</AppText>
                            </View>
                            <AppText>|</AppText>
                            <View style={BaseStyle.groupRow}>
                                <AppText size={AppSize.Large}>Ext Price: </AppText>
                                <AppText bold>{`$${item.extPrice}`}</AppText>
                            </View>
                        </View>
                        <View style={BaseStyle.groupRow}>
                            <AppText size={AppSize.Large}>Qty: </AppText>
                            <AppText bold>{`${item.quantity}`}</AppText>
                        </View>
                        <View style={BaseStyle.groupRow}>
                            <AppText size={AppSize.Large}>Bundle: </AppText>
                            <AppText bold>{`${item.bundle}`}</AppText>
                        </View>
                    </View>
                </View>
                <View>
                    <AppIcon name="arrow-forward-ios" />
                </View>
            </TouchableOpacity>
        );
    };

    const renderDivider = () =>
    {
        return (
            <AppDivider color={Colors.divide} />
        );
    };

    const renderHeader = () =>
    {
        return (
            <View style={OrderStyle.headerList}>
                <View style={BaseStyle.groupRow}>
                    <View style={BaseStyle.groupRow}>
                        <AppText size={AppSize.Large}>{t( 'Orders.Total' )} Qty: </AppText>
                        <AppText bold>{totalQuantity} </AppText>
                    </View>
                    <View style={BaseStyle.groupRow}>
                        <AppText size={AppSize.Large}>Total Ext Price:</AppText>
                        <AppText bold>{totalExtPrice} </AppText>
                    </View>
                </View>
            </View>
        );
    };

    const renderList = () =>
    {
        return (
            <AppList
                contentContainerStyle={OrderStyle.container}
                ListFooterComponentStyle={OrderStyle.footer}
                data={OrderList}
                renderItem={renderItem}
                ItemSeparatorComponent={renderDivider}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
            />
        );
    };

    return (
        <BaseContainer isHeader headerProps={{
            title: 'Order List',
            isBackButton: true,
            onBackPress: () => RootNavigationInstance?.goBack(),
            rightHeader: (
                <View style={BaseStyle.groupRow}>
                    <AppIcon name="add" />
                    <TouchableOpacity onPress={handleScanner}>
                        <AppIcon name="photo-camera" />
                    </TouchableOpacity>
                </View> ),
        }}>
            <View style={[ BaseStyle.container ]}>
                {renderList()}
            </View>
            {/* renderScanner */}

            <AppModal ref={refModalLaunch} onRequestClose={() => refModalLaunch.current.hideModal()}>
                <AppCamera
                    isFocused={true}
                    onClose={() => refModalLaunch.current.hideModal()}
                />
            </AppModal>
        </BaseContainer>
    );
};
export default memo( SaleOrders );
