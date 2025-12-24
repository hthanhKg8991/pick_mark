import { FC, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface FontSizeProps {
    fontSize: number;
    onChangeFontSize: (size: number) => void;
    opacity?: number;
    onChangeOpacity?: (opacity: number) => void;
}

const FontSize: FC<FontSizeProps> = ({
    fontSize,
    onChangeFontSize,
    opacity = 1,
    onChangeOpacity,
}) => {
    return (
        <View style={styles.container}>
            {/* FONT SIZE */}
            <Text style={styles.label}>Font Size: {Math.round(fontSize)}</Text>
            <Slider
                minimumValue={10}
                maximumValue={100}
                value={fontSize}
                step={1}
                onValueChange={onChangeFontSize}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#ccc"
            />

            {/* OPACITY */}
            {onChangeOpacity && (
                <>
                    <Text style={styles.label}>
                        Opacity: {opacity.toFixed(2)}
                    </Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={1}
                        value={opacity}
                        step={0.01}
                        onValueChange={onChangeOpacity}
                        minimumTrackTintColor="#000"
                        maximumTrackTintColor="#ccc"
                    />
                </>
            )}
        </View>
    );
};

export default memo(FontSize);

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
    },
});
