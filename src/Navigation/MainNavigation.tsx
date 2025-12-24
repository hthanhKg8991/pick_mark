import Screens from 'Navigation/ScreenName';
import React from 'react';
import SaleOrders from 'Screens/SaleOrders';
import SignWithSkia from 'Screens/Signature/SignWithSkia';
// import ScanBarcode from 'Screens/SaleOrders';
// import AppCamera from 'Components/AppCamera/AppCamera';
// import CreateEdit from 'Screens/SaleOrders/Components/CreateEdit';
// import OrderDetail from 'Screens/SaleOrders/Components/OrderDetail';


const MainNavigation = (Stack: any) => {
    return(
        <>
            <Stack.Screen
                name={Screens.SignWithSkia}
                component={SignWithSkia}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Screens.SaleOrders}
                component={SaleOrders}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name={Screens.AppCamera}
                component={AppCamera}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Screens.SaleOrdersForm}
                component={CreateEdit}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Screens.SaleOrdersDetail}
                component={OrderDetail}
                options={{ headerShown: false }}
            /> */}
        </>
    );
};

export default MainNavigation;
