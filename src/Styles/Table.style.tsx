import { StyleSheet } from 'react-native';

const TableStyle = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    header: {
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        padding: 10,
        textAlign: 'center',
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
});

export default TableStyle;
