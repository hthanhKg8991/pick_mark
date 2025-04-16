import { StyleSheet } from 'react-native';
import Colors from 'Themes/Colors';
import { scale } from 'Themes/Scaling';
import { Spacing } from 'Themes/Spacing';

const OrderStyle = StyleSheet.create( {
    headerList: {
        borderBottomWidth: scale( 1 ),
        borderBottomColor: Colors.divide,
        paddingVertical: Spacing.mediumSmall,
        paddingHorizontal: Spacing.large,
    },
    items: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: Spacing.mediumSmall,
        paddingVertical: Spacing.mediumSmall,
        paddingHorizontal: Spacing.large,
    },
    container: {
        flexGrow: 1,
    },
    footer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    imageGroup: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: Spacing.mediumSmall,
    },
    imageView: {
        gap: Spacing.mediumSmall,
        backgroundColor: Colors.backgroundGrayOverlay,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.mediumSmall,
        borderRadius: Spacing.extraTiny,
    },
    groupColumnHeader:{
        gap: Spacing.mediumSmall,
    },
    groupItem:{
        flexShrink:1,
        width:'100%',
        gap: Spacing.mediumSmall,
    },
    groupsColumn:{
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: Spacing.mediumSmall,
    },
    itemColumn:{
        flex:1,
        flexShrink:1,
        gap: Spacing.small,
    },
    groupTotal:{
        gap: Spacing.mediumSmall,
    },

} );

export default OrderStyle;
