import React, { FC, forwardRef, memo, Ref } from 'react';
import { View, ViewProps } from 'react-native';
import { BaseStyle } from 'Styles';
import { scale } from 'Themes/Scaling';

interface AppDividerProps extends ViewProps
{
    style?: ViewProps[ 'style' ];
    size?: number;
    color?: string;
    isVertical?: boolean;
}

const AppDivider: FC<AppDividerProps> = forwardRef( ( {isVertical, style, size, color }, ref: Ref<View> ) =>
{
    const computedStyle = {
        height: size ?? scale( 1 ),
        borderColor: color,
    };
    const computedStyleVertical = {
        width: scale( 1 ),
        height: '100%' as unknown as number, // Cast to avoid type error
        backgroundColor: '#e0e0e0',
    }
    return (
        <View
            ref={ref}
            style={[ BaseStyle.divider, isVertical ? computedStyleVertical : computedStyle, style ]} />
    );
} );

export default memo( AppDivider );
