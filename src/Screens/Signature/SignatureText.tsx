import Slider from '@react-native-community/slider';
import BaseContainer from 'Base/BaseContainer';
import { FC, memo } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BaseStyle } from 'Styles';
import { scale } from 'Themes/Scaling';
interface SignatureTextProps {
    signatureName: string;
    setSignatureName: (name: string) => void;
    fontSize: number;
    onChangeFontSize: (opacity: number) => void;
    watermarkOpacity: number;
    onChangeOpacity: (opacity: number) => void;
    rotate: number;
    setRotate: (opacity: number) => void;
}
const SignatureText: FC<SignatureTextProps> = ({
    signatureName,
    setSignatureName,
    fontSize,
    onChangeFontSize,
    watermarkOpacity,
    onChangeOpacity,
    rotate,
    setRotate
}) => {
    const opacityPercent = Math.round(watermarkOpacity * 100);

    return (

        <View style={[BaseStyle.container]}>
            <TextInput
                value={signatureName}
                onChangeText={setSignatureName}
                placeholder="Nhập tên"
                style={{ borderWidth: 1, padding: 8, backgroundColor: '#fff', marginBottom: 16 }}
            />
            <View>
                <Text style={styles.label}>Font Size: {Math.round(fontSize)}</Text>
                <Slider
                    minimumValue={10}
                    maximumValue={48}
                    value={fontSize}
                    step={1}
                    onValueChange={onChangeFontSize}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#ccc"
                />
            </View>
            <View>
                <Text style={styles.label}>Opacity: {opacityPercent}%</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    value={opacityPercent}
                    step={1}
                    // onValueChange={onChangeOpacity}
                    onValueChange={(value) => {
                        onChangeOpacity(value / 100);
                    }}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#ccc"
                />
            </View>
            <View>
                <Text style={styles.label}>Xoay: {rotate}</Text>
                <Slider
                    minimumValue={-90}
                    maximumValue={90}
                    value={rotate}
                    step={1}
                    // onValueChange={onChangeOpacity}
                    onValueChange={setRotate}
                    minimumTrackTintColor="#000"
                    maximumTrackTintColor="#ccc"
                />
            </View>
        </View>
    )
}
export default memo(SignatureText);
const styles = StyleSheet.create({
    label: {
        marginBottom: scale(8),
        fontWeight: '600',
    },
})