import { StyleSheet } from 'react-native';
import Colors from 'Themes/Colors';
import { scale } from 'Themes/Scaling';
import { Spacing } from 'Themes/Spacing';

const BaseStyle = StyleSheet.create({
    container:{
        flex: 1,
    },
    contentPadding:{
        paddingHorizontal: Spacing.space16,
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerVertical:{
        alignItems: 'center',
    },
    emptyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider:{
        borderBottomWidth: scale(1),
        borderBottomColor: Colors.divide,
    },
    groupRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: Spacing.space12,
    },
    letterSpacing2:{
        letterSpacing: Spacing.space2,
    },
    flexShrink:{
        flexShrink: 1,
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    floatEnd:{
        justifyContent:'flex-end'
    }
});

export default BaseStyle;
