import AppIcon from 'Components/AppIcon/AppIcon';
import { AppText } from 'Components/AppText';
import { View } from 'react-native';
import { BaseStyle } from 'Styles';
import Colors from 'Themes/Colors';
import { Spacing } from 'Themes/Spacing';

const AppEmpty = () => {
    return(
        <View style={BaseStyle.emptyContainer}>
            <AppIcon name="folder-open" size={Spacing.massive} color={Colors.backgroundDisable}/>
            <AppText>Not found data!</AppText>
        </View>
    );
};
export default AppEmpty;
