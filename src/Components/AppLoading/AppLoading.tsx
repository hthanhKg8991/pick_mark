import React, { createRef, useImperativeHandle, useState } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { scale } from 'Themes/Scaling';
import { Spacing } from 'Themes/Spacing';

export const refLoading = createRef<any>();

export const LoadingGlobal = ( status: boolean ) =>
{
    refLoading?.current?.loading?.( status );
};

export const AppLoading = () =>
{
    const [ isLoading, setIsLoading ] = useState( false );

    useImperativeHandle(
        refLoading,
        () => ( {
            loading: ( status: boolean ) =>
            {
                setIsLoading( status );
                setTimeout( () =>
                {
                    setIsLoading( false );
                }, 30 * 1000 );
            },
        } ),
        [],
    );

    if ( !isLoading )
    {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={{ height: scale( 150 ), width: scale( 15 ), borderRadius: Spacing.medium }}>
                <ActivityIndicator size={'large'} color={'white'} />
            </View>
        </View>
    );
};

export default AppLoading;

const styles = StyleSheet.create( {
    container: {
        zIndex: 999,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.418)',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
} );
