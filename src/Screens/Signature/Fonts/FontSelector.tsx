// components/FontSelector.tsx
import React from 'react';
import { View, Button, ScrollView, StyleSheet, Pressable, TouchableHighlight, Text } from 'react-native';
import { scale } from 'Themes/Scaling';
import { FONT_MAP } from 'Utils/Helpers';

type FontItem = {
    key: string;
    name: string;
};

type Props = {
    fonts: FontItem[];
    selectedFontKey: string;
    onSelectFont: (key: string) => void;
    signatureName: string;
};

export const FontSelector: React.FC<Props> = ({
    fonts,
    selectedFontKey,
    onSelectFont,
    signatureName,
}) => {
    return (
        <ScrollView horizontal style={{ flexGrow: 0 }}>
            <Pressable style={styles.container}>
                {fonts.map(font => {
                    console.log('N41Mobile:: FONT_MAP[font.key]', FONT_MAP[font.key]);
                    return (
                        <Pressable key={font.key} style={styles.wrapButton}
                            onPress={() => onSelectFont(font.key)}>
                            <Text
                                style={[
                                    styles.text,
                                    { fontFamily: FONT_MAP[font.key] },
                                    // { fontFamily: 'Pacifico-Regular' },
                                    selectedFontKey === font.key && styles.textActive,
                                ]}
                            >
                                {signatureName}
                            </Text>
                        </Pressable>
                    )
                })}
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#f0f0f0',
        flexGrow: 1,
    },
    wrapButton: {
        marginRight: scale(8),
        backgroundColor:'#e4e1e1',
        paddingHorizontal: scale(12),
        justifyContent:'center'
    },
    text: {
        fontSize: 24,
        color: '#333',
    },
    textActive: {
        color: 'red',
    },

});