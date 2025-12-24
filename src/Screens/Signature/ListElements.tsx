import React, { FC, memo, useCallback, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';

import FontSize from './Fonts/FontSize';
import FontColor from './Fonts/FontColor';
import SelectFontTab from './Fonts/SelectFontTab';
import SignatureText from './SignatureText';

/* ---------------- ROUTES ---------------- */

const routes = [
    { key: 'first' },
    { key: 'second' },
    { key: 'third' },
    { key: 'four' },
];

/* ---------------- TAB BAR ---------------- */

const CustomTabBar = memo(
    ({ routes, index, setIndex }: any) => (
        <View style={styles.tabBar}>
            {routes.map((route: any, i: number) => {
                const focused = index === i;

                const labelMap: Record<string, string> = {
                    first: 'T',
                    second: 'Size',
                    third: 'Color',
                    four: 'Font',
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={() => setIndex(i)}
                        style={styles.tabItem}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                focused && styles.tabTextActive,
                            ]}
                        >
                            {labelMap[route.key]}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
);

/* ---------------- MAIN ---------------- */

type ListElementsProps = {
    selectedFontKey: string;
    onSelect: (key: string) => void;
    fontSize: number;
    onChangeFontSize: (size: number) => void;
    fontColor: string;
    onChangeFontColor: (color: string) => void;
    watermarkOpacity: number;
    onChangeOpacity: (opacity: number) => void;
    signatureName: string;
    setSignatureName: (name: string) => void;
    rotate: number;
    setRotate: (name: number) => void;
};

const ListElements: FC<ListElementsProps> = (props) => {
    const [index, setIndex] = useState(0);

    /* -------- renderScene (ĐÚNG CÁCH) -------- */

    const renderScene = useCallback(
        ({ route }: any) => {
            switch (route.key) {
                case 'first':
                    return (
                        <SignatureText
                            signatureName={props.signatureName}
                            setSignatureName={props.setSignatureName}
                            watermarkOpacity={props.watermarkOpacity}
                            onChangeOpacity={props.onChangeOpacity}
                            fontSize={props.fontSize}
                            onChangeFontSize={props.onChangeFontSize}
                            rotate={props.rotate}
                            setRotate={props.setRotate}
                        />
                    );
                case 'second':
                    return (
                        <FontSize
                            fontSize={props.fontSize}
                            onChangeFontSize={props.onChangeFontSize}

                        />
                    );
                case 'third':
                    return (
                        <FontColor
                            fontColor={props.fontColor}
                            onChangeFontColor={props.onChangeFontColor}
                        />
                    );
                case 'four':
                    return (
                        <SelectFontTab
                            signatureName={props.signatureName}
                            selectedFontKey={props.selectedFontKey}
                            onSelectFont={props.onSelect}
                        />
                    );
                default:
                    return null;
            }
        },
        [
            props.signatureName,
            props.fontSize,
            props.fontColor,
            props.watermarkOpacity,
            props.selectedFontKey,
            props.rotate,
        ]
    );

    return (
        <View style={styles.container}>
            <CustomTabBar
                routes={routes}
                index={index}
                setIndex={setIndex}
            />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                swipeEnabled={false}
                lazy
                lazyPreloadDistance={0}
                renderTabBar={() => null}
            />
        </View>
    );
};

export default memo(ListElements);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    tabText: {
        color: '#999',
        fontSize: 14,
    },
    tabTextActive: {
        color: '#000',
        fontWeight: '700',
    },
});
