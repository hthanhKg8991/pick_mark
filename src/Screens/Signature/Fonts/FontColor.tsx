import { FC, memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import ColorPicker, { Panel1, HueSlider } from 'reanimated-color-picker';
import { runOnJS } from 'react-native-reanimated';

interface FontColorProps {
    fontColor: string;
    onChangeFontColor: (color: string) => void;
}

const FontColor: FC<FontColorProps> = ({ fontColor, onChangeFontColor }) => {

    const handleChange = useCallback((hex: string) => {
        onChangeFontColor(hex);
    }, [onChangeFontColor]);

    return (
        <View>
            <ColorPicker
                value={fontColor}
                onChange={({ hex }) => {
                    'worklet';
                    runOnJS(handleChange)(hex)  ;
                }}
                onComplete={({ hex }) => {
                    'worklet';
                    runOnJS(handleChange)(hex);
                }}
                style={styles.container}
            >
                <Panel1 />
                <HueSlider />
            </ColorPicker>
        </View>
    );
};

export default memo(FontColor);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
