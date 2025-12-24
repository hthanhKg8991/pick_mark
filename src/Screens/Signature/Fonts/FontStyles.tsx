import { Dispatch, FC, memo, SetStateAction } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { DEVICE_WIDTH, scale } from 'Themes/Scaling';
import { Colors } from 'Themes';

interface FontStylesProps {
    signatureName: string;
    watermarkMode: WatermarkMode;
    setWatermarkMode: Dispatch<SetStateAction<WatermarkMode>>;
}

const FontStyles: FC<FontStylesProps> = ({
    signatureName,
    watermarkMode,
    setWatermarkMode
}) => {
    console.log('N41Mobile:: ',);
    const createWatermarks = (text: string, boxWidth: number, boxHeight: number, fontSize: number, padding = 8) => {
        const watermarks = [];
        const textWidth = text.length * fontSize * 0.5;
        const textHeight = fontSize;
        const stepX = textWidth + padding;
        const stepY = textHeight + padding;
        const cols = Math.ceil(boxWidth / stepX);
        const rows = Math.ceil(boxHeight / stepY);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                watermarks.push({
                    x: col * stepX,
                    y: row * stepY,
                    text,
                    rotation: '-30deg',
                });
            }
        }
        return watermarks;
    };


    let txtMultiple = 'thanh';
    let boxWidth = (DEVICE_WIDTH / 2.8);

    const isActive = (mode: WatermarkMode) => {
        if (mode.type !== watermarkMode.type) return false;

        // Nếu là single, so sánh layout
        if (mode.type === 'single' && watermarkMode.type === 'single') {
            return mode.layout === watermarkMode.layout;
        }

        // Nếu là multiple, type đã giống nhau → active
        return true;
    };


    return (
        <View style={styles.container}>
            {/* FONT SIZE */}
            <Pressable style={[styles.wrapperWaterMark, isActive({ type: 'multiple' }) && {
                borderColor: 'red'
            }]}
                onPress={() => setWatermarkMode({ type: 'multiple' })}
            >
                <View style={[styles.wrapperWaterMultiple

                ]}>
                    {createWatermarks(txtMultiple, scale(boxWidth), scale(boxWidth), 12).map((wm, index) => (
                        <Text
                            key={index}
                            style={{
                                position: 'absolute',
                                left: wm.x,
                                top: wm.y,
                                transform: [{ rotate: wm.rotation }],
                                fontSize: 10,
                                color: '#000',
                            }}
                        >
                            {wm.text}
                        </Text>
                    ))}
                </View>
            </Pressable>
            <Pressable style={[styles.wrapperWaterMark,
            isActive({ type: 'single', layout: 'center' }) && {
                borderColor: 'red'
            }
            ]}
                onPress={() => setWatermarkMode({ type: 'single', layout: 'center' })}
            >
                <Text numberOfLines={1}  // giới hạn 1 dòng
                    ellipsizeMode="tail">{txtMultiple}</Text>
            </Pressable>
            <Pressable style={[styles.wrapperWaterMark,
            isActive({ type: 'single', layout: 'diagonal' }) && {
                borderColor: 'red'
            }]}
                onPress={() => setWatermarkMode({ type: 'single', layout: 'diagonal' })}

            >
                <Text style={[styles.waterDiagonal]}
                    numberOfLines={1}  // giới hạn 1 dòng
                    ellipsizeMode="tail"
                >{txtMultiple}</Text>
            </Pressable>

        </View>
    );
};

export default memo(FontStyles);

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        gap: scale(8)
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
    },
    wrapperWaterMark: {
        borderWidth: scale(1),
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(DEVICE_WIDTH / 3),
        height: scale(DEVICE_WIDTH / 3),
        padding: scale(10)
    },
    wrapperWaterMultiple: {
        gap: scale(8),
        width: scale(DEVICE_WIDTH / 3.3),
        height: scale(DEVICE_WIDTH / 3.3),
        overflow: 'hidden',
        padding: scale(30)
    },
    waterMultiple: {
        transform: [
            { rotate: '-30deg' },
        ],
    },
    waterDiagonal: {
        transform: [
            { rotate: '-45deg' },
        ],
    },
});
