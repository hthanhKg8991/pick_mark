import { AppSize, AppVariant } from 'Constants';
import * as React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import TextSizes from './Entries/TextSize';
import TextVariants from './Entries/TextVariant';
import { Colors } from 'Themes';

type AppTextProps = {
    variant?: AppVariant;
    children: React.ReactNode;
    bold?: number | boolean;
    style?: StyleProp<TextStyle>;
    size?: AppSize;
    color?: string;
}

const AppText: React.FC<AppTextProps> = ( {
    children,
    variant = AppVariant.Default,
    size = AppSize.Default,
    color = Colors.text,
    bold,
    style,
    ...rest } ) =>
{
    const computedStyle: StyleProp<TextStyle> = [
        bold
            ? { fontWeight: typeof bold === 'number' ? ( bold >= 700 ? 'bold' : 'normal' ) : 'bold' }
            : {},
        style,
    ];
    return (
        <Text
            style={[ { color:color }, computedStyle, TextVariants( variant ), TextSizes( size ), style ]}
            {...rest}>
            {children}
        </Text>
    );
};

export default React.memo( AppText );
