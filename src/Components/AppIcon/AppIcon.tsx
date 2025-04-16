import { FC } from 'react';
import { IconProps } from 'react-native-vector-icons/Icon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Spacing } from 'Themes/Spacing';
interface AppIconProps extends IconProps {
    name: string;
}
const AppIcon:FC<AppIconProps> = ({name, ...rest}) => {
    return(
        <Icon
            name={name}
            size={Spacing.xLarge}
            {...rest}
        />
    );
};
export default AppIcon;
