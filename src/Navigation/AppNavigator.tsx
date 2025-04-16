import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MainNavigation from './MainNavigation';

const { Navigator, Screen } = createStackNavigator<any>();

const AppNavigator = () => {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: false,
                ...TransitionPresets.SlideFromRightIOS
            }}
        >
            {MainNavigation({ Navigator, Screen })}
        </Navigator>
    );
};

export default AppNavigator;
