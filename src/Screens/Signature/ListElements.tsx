import React, { Dispatch, FC, memo, SetStateAction, useCallback, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';

import FontStyles from './Fonts/FontStyles';
import FontColor from './Fonts/FontColor';
import SelectFontTab from './Fonts/SelectFontTab';
import SignatureText from './SignatureText';
import { FontStyle } from '@shopify/react-native-skia';
import { BaseStyle } from 'Styles';

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
                    second: 'Styles',
                    third: 'Color',
                    four: 'Fonts',
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
    watermarkMode: WatermarkMode;
    setWatermarkMode: Dispatch<SetStateAction<WatermarkMode>>;
};

const ListElements: FC<ListElementsProps> = ({
    signatureName,
    setSignatureName,
    watermarkOpacity,
    onChangeOpacity,
    fontSize,
    onChangeFontSize,
    rotate,
    setRotate,
    fontColor,
    onChangeFontColor,
    selectedFontKey,
    onSelect,
    watermarkMode,
    setWatermarkMode,
}) => {
    const [index, setIndex] = useState(0);

    /* -------- renderScene (ĐÚNG CÁCH) -------- */

    const renderScene = useCallback(
        ({ route }: any) => {
            switch (route.key) {
                case 'first':
                    return (
                        <SignatureText
                            signatureName={signatureName}
                            setSignatureName={setSignatureName}
                            watermarkOpacity={watermarkOpacity}
                            onChangeOpacity={onChangeOpacity}
                            fontSize={fontSize}
                            onChangeFontSize={onChangeFontSize}
                            rotate={rotate}
                            setRotate={setRotate}
                            watermarkMode={watermarkMode}
                        />
                    );
                case 'second':
                    return (
                        <FontStyles
                            signatureName={signatureName}
                            watermarkMode={watermarkMode}
                            setWatermarkMode={setWatermarkMode}

                        />
                    );
                case 'third':
                    return (
                        <FontColor
                            fontColor={fontColor}
                            onChangeFontColor={onChangeFontColor}
                        />
                    );
                case 'four':
                    return (
                        <SelectFontTab
                            signatureName={signatureName}
                            selectedFontKey={selectedFontKey}
                            onSelectFont={onSelect}
                        />
                    );
                default:
                    return null;
            }
        },
        [
            signatureName,
            fontSize,
            fontColor,
            watermarkOpacity,
            selectedFontKey,
            rotate,
            watermarkMode,
            setWatermarkMode,
        ]
    );

    return (
        <View style={[styles.container, BaseStyle.contentPadding]}>
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
        flex: 1
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
