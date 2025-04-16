import { StyleSheet } from 'react-native';
import Colors from 'Themes/Colors';
import { scale } from 'Themes/Scaling';

const AuthStyle = StyleSheet.create({
    loginContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapCircle:{
        width: scale(150),
        height: scale(150),
        borderRadius: scale(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(1),
        borderColor: Colors.primary,
        backgroundColor: '#1BB273',
    },
    wrapForgotPassword:{
        alignSelf: 'flex-end',
    },
    textStyleForgotPassword:{
        textDecorationLine: 'underline',
        letterSpacing: scale(0.5),
    },
});

export default AuthStyle;
