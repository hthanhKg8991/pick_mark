import { NavigationContainer, NavigationState, useNavigationContainerRef } from '@react-navigation/native';
import { navigationRef } from 'Navigation/RootNavigation';
import React, { useEffect } from 'react';
import AppNavigator from './AppNavigator';
const AppNavigationContainer = () => {

    const navRef = useNavigationContainerRef<any>();
    const [screenStacking, setScreenStacking] = React.useState<string[]>([]);

    useEffect(() => {
        const _screenStacking = screenStacking.join(' --> ');
        console.log('ThanhNguyen:: _screenStacking', _screenStacking);
    }, [
        screenStacking,
    ]);

    const onStateChange = async (state: NavigationState | undefined) => {
        if (state) {
            const { routes } = state;
            __DEV__ && setScreenStacking(routes.map((route: { name: any; }) => `${route.name}`));
        }
    };
    return (
        <NavigationContainer
            ref={(ref: any) => {
                navigationRef.current = ref;
                navRef.current = ref;
            }}
            onStateChange={onStateChange}
        //   theme={themeNavigation}
        >
            <AppNavigator />
        </NavigationContainer >
    );
};

export default AppNavigationContainer;
