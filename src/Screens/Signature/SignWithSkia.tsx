/* eslint-disable react-native/no-inline-styles */
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import {
    AnimatedProp,
    Canvas,
    Group,
    PaintStyle,
    Path,
    Rect,
    SkFont,
    Skia,
    Image as SkiaImage,
    Text as SkiaText,
    useFont,
    useImage,
} from '@shopify/react-native-skia';
import { FONT_LIST } from 'Constants/fonts';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import RNFS from 'react-native-fs';
import { Gesture, GestureDetector, Text } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSharedValue } from 'react-native-reanimated';
// import ListElements from './ListElements';
import BaseContainer from 'Base/BaseContainer';
import { BaseStyle } from 'Styles';
import { LoadingGlobal } from 'Components/AppLoading';
import ListElements from './ListElements';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
type WatermarkText = {
    x: number;
    y: number;
    rotation: number;
};
type FontKey =
    | 'pacifico'
    | 'mrTattoo'
    | 'greatvibes'
    | 'allura'
    | 'my_everything'
    | 'lettersBlushing';

const SignWithSkia = () => {
    /* -------------------- STATE -------------------- */
    const [watermarks, setWatermarks] = useState<WatermarkText[]>([]);
    const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
    const [signatureName, setSignatureName] = useState('Thanh');
    const [fontColor, setFontColor] = useState('#ffffff');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [fontSize, setFontSize] = useState(12);
    const [rotate, setRotate] = useState(0);
    const [selectedFontKey, setSelectedFontKey] =
        useState<FontKey>('pacifico');

    const image = useImage(imageUri);
    const textPaintStroke = Skia.Paint();
    textPaintStroke.setColor(Skia.Color('red')); // border color
    textPaintStroke.setStyle(PaintStyle.Stroke);
    textPaintStroke.setStrokeWidth(2); // border width


    /* -------------------- PREVIEW SIZE -------------------- */
    const previewWidth = SCREEN_WIDTH;
    const previewHeight = useMemo(() => {
        if (!image) return SCREEN_WIDTH;
        return (image.height() / image.width()) * previewWidth;
    }, [image, previewWidth]);
    // const actualPreviewHeight = previewHeight * PREVIEW_SCALE;
    const actualPreviewHeight = previewHeight;
    /* -------------------- TEXT POSITION -------------------- */
    const textX = useSharedValue(50);
    const textY = useSharedValue(80);
    const startX = useSharedValue(0);
    const startY = useSharedValue(0);

    /* -------------------- DRAW PATH -------------------- */
    const paths = useRef<any[]>([]);
    const currentPath = useRef<any>(null);
    const [, forceUpdate] = useState(0);

    /* -------------------- COLOR -------------------- */
    const skiaColor = useRef(Skia.Color(fontColor));
    useEffect(() => {
        skiaColor.current = Skia.Color(fontColor);
    }, [fontColor]);

    // watermark opacity helper
    const getSkiaColor = (hexColor: string, opacity: number) => {
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        const a = Math.round(opacity * 255);
        const colorHex = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        return Skia.Color(colorHex);
    };

    // const generateWatermarks = (
    //     width: number,
    //     height: number,
    //     textWidth: number,   // đo trước bằng font
    //     textHeight: number,
    //     padding = 40
    // ): WatermarkText[] => {
    //     const result: WatermarkText[] = [];

    //     const density = 1.5;
    //     const cellW = textWidth * density + 20;
    //     const cellH = textHeight * density + 20;


    //     for (let row = 0, y = 0; y < height; row++, y += cellH) {
    //         for (let x = 0; x < width; x += cellW) {
    //             const offsetX = row % 2 === 0 ? 0 : cellW / 2;

    //             result.push({
    //                 x: x + offsetX + cellW / 2,
    //                 y: y + cellH / 2,
    //                 rotation: ((Math.random() * 40 - 20) * Math.PI) / 180,
    //             });
    //         }
    //     }

    //     return result;
    // };
    const generateWatermarks = (
        width: number,
        height: number,
        textWidth: number,
        textHeight: number,
        padding = 40,
    ): WatermarkText[] => {
        const result: WatermarkText[] = [];

        const density = 1.5;

        const cellW = textWidth * density + padding;
        const cellH = textHeight * density + padding;

        const rotation = (rotate * Math.PI) / 180; // xoay cố định -30°

        for (let row = 0, y = -cellH; y < height + cellH; row++, y += cellH) {
            const offsetX = row % 2 === 0 ? 0 : cellW / 2;

            for (let x = -cellW; x < width + cellW; x += cellW) {
                result.push({
                    x: x + offsetX + cellW / 2,
                    y: y + cellH / 2,
                    rotation,
                });
            }
        }

        return result;
    };

    /* -------------------- FONTS -------------------- */
    const fonts = {
        pacifico: useFont(FONT_LIST[0].source, fontSize),
        mrTattoo: useFont(FONT_LIST[1].source, fontSize),
        greatvibes: useFont(FONT_LIST[2].source, fontSize),
        allura: useFont(FONT_LIST[3].source, fontSize),
        my_everything: useFont(FONT_LIST[4].source, fontSize),
        lettersBlushing: useFont(FONT_LIST[5].source, fontSize),
    } as const;

    const currentFont = fonts[selectedFontKey];
    const previewFont = useMemo(() => {
        if (!currentFont) return null;
        return Skia.Font(
            currentFont.getTypeface()!,
            // fontSize * PREVIEW_SCALE * PREVIEW_SCALE
            fontSize
        );
    }, [currentFont, fontSize]);


    const textBounds = useMemo(() => {
        if (!previewFont) return null;
        return previewFont.measureText(signatureName);
    }, [previewFont, signatureName]);

    useEffect(() => {
        if (!image || !previewFont || !textBounds) return;

        const marks = generateWatermarks(
            previewWidth,
            previewHeight,
            textBounds.width,
            textBounds.height,
        );

        setWatermarks(marks);
    }, [signatureName, textBounds, previewWidth, previewHeight, rotate]);


    /* -------------------- PICK IMAGE -------------------- */
    const pickImage = useCallback(async () => {
        const res = await launchImageLibrary({ mediaType: 'photo' });
        if (res.assets?.[0]?.uri) {
            setImageUri(res.assets[0].uri);
            textX.value = 50;
            textY.value = 80;
            const marks = generateWatermarks(
                previewWidth,
                previewHeight,
                textBounds?.width ?? 100,
                textBounds?.height ?? 40

            );

            setWatermarks(marks);

            paths.current = [];
            forceUpdate(v => v + 1);
        }
    }, []);

    /* -------------------- GESTURES -------------------- */
    const panDraw = Gesture.Pan()
        .onStart(e => {
            const path = Skia.Path.Make();
            path.moveTo(e.x, e.y);
            currentPath.current = path;
            paths.current.push(path);
        })
        .onUpdate(e => {
            currentPath.current?.lineTo(e.x, e.y);
            forceUpdate(v => v + 1);
        });

    const panWatermark = (index: number) =>
        Gesture.Pan()
            .onStart(() => {
                startX.value = watermarks[index].x;
                startY.value = watermarks[index].y;
            })
            .onUpdate(e => {
                const newWatermarks = [...watermarks];
                newWatermarks[index] = {
                    ...newWatermarks[index],
                    x: startX.value + e.translationX,
                    y: startY.value + e.translationY,
                };
                setWatermarks(newWatermarks);
            });

    const panText = Gesture.Pan()
        .onStart(() => {
            startX.value = textX.value;
            startY.value = textY.value;
        })
        .onUpdate(e => {
            textX.value = startX.value + e.translationX;
            textY.value = startY.value + e.translationY;
        });



    /* -------------------- SAVE IMAGE (ORIGINAL SIZE) -------------------- */
    const saveImage = async () => {
        LoadingGlobal(true)
        requestAnimationFrame(async () => {
            try {
                if (!image || !currentFont) {
                    Alert.alert('Lỗi', 'Ảnh hoặc font chưa sẵn sàng');
                    return;
                }

                const imgW = image.width();
                const imgH = image.height();

                const surface = Skia.Surface.Make(imgW, imgH);
                if (!surface) return;

                const canvas = surface.getCanvas();
                canvas.clear(Skia.Color('white'));

                // scale factors
                // const scaleX = imgW / previewWidth;
                const scaleX = imgW / (previewWidth);
                // const scaleY = imgH / (previewHeight * PREVIEW_SCALE);
                const scaleY = imgH / (previewHeight);
                // draw original image
                canvas.drawImageRect(
                    image,
                    // Skia.XYWHRect(0, 0, imgW, imgH),
                    Skia.XYWHRect(0, 0, imgW, imgH),
                    // Skia.XYWHRect(0, 0, imgW, imgH),
                    Skia.XYWHRect(0, 0, imgW, imgH),
                    Skia.Paint()
                );


                // draw paths
                const pathPaint = Skia.Paint();
                pathPaint.setColor(getSkiaColor(fontColor, watermarkOpacity));
                pathPaint.setStyle(PaintStyle.Stroke);
                pathPaint.setStrokeWidth(4 * scaleX);

                paths.current.forEach(p => {
                    const copy = p.copy();
                    copy.transform(
                        Skia.Matrix([scaleX, 0, 0, 0, scaleY, 0, 0, 0, 1])
                    );
                    canvas.drawPath(copy, pathPaint);
                });

                // draw text
                const fontObj = Skia.Font(
                    currentFont.getTypeface()!,
                    // fontSize * scaleY * PREVIEW_SCALE
                    fontSize * scaleY
                );

                const textPaint = Skia.Paint();
                textPaint.setColor(getSkiaColor(fontColor, watermarkOpacity));
                // canvas.drawText(
                //     name,
                //     textX.value * scaleX * PREVIEW_SCALE,
                //     textY.value * scaleY,
                //     textPaint,
                //     fontObj
                // );
                watermarks.forEach(wm => {
                    console.log('N41Mobile:: fontSize * PREVIEW_SCALE', previewWidth, fontSize, actualPreviewHeight);
                    console.log('N41Mobile:: fontSize * PREVIEW_SCALE  wm.x * scaleX * previewWidth', wm.x * scaleX * previewWidth);
                    const tx = wm.x * scaleX;  // vì wm.x trên actualPreviewWidth = previewWidth
                    const ty = wm.y * scaleY;  // vì wm.y trên actualPreviewHeight = previewHeight * PREVIEW_SCALE


                    // let previewHeightInOriginal = actualPreviewHeight * scaleY
                    // if (ty > previewHeightInOriginal) return;
                    canvas.save();
                    canvas.translate(tx, ty);
                    const rotationDeg = wm.rotation * (180 / Math.PI);

                    canvas.rotate(rotationDeg, 0, 0);
                    // canvas.rotate(wm.rotation * 180 / Math.PI, tx, ty);

                    canvas.drawText(
                        signatureName,
                        0, 0,
                        textPaint,
                        fontObj
                    );

                    canvas.restore();
                });



                const snapshot = surface.makeImageSnapshot();
                const base64 = snapshot.encodeToBase64();

                const filePath = `${RNFS.CachesDirectoryPath}/signed_${Date.now()}.png`;
                await RNFS.writeFile(filePath, base64, 'base64');
                await CameraRoll.saveAsset(`file://${filePath}`, { type: 'photo' });

                Alert.alert('Thành công', 'Ảnh đã lưu đúng tỉ lệ gốc');
            } catch (e) {
                console.error(e);
                Alert.alert('Lỗi', 'Không thể lưu ảnh');
            } finally {
                LoadingGlobal(false)
            }
        })

    };

    const renderWatermarks = () => {
        return (
            <>
                {watermarks.map((wm: WatermarkText, i: number) => (
                    <Group
                        key={i}
                        transform={[
                            { translateX: wm.x },
                            { translateY: wm.y },
                            { rotate: wm.rotation },
                            { translateX: -wm.x },
                            { translateY: -wm.y },
                        ]}
                    >
                        <SkiaText
                            text={signatureName}
                            x={wm.x}
                            y={wm.y}
                            font={previewFont}
                            color={getSkiaColor(fontColor, watermarkOpacity)}
                        />

                    </Group>
                ))}
            </>
        )
    };


    /* -------------------- RENDER HEADER-------------------- */
    const renderHeader = () => {
        return (
            <View style={[BaseStyle.groupRow, BaseStyle.floatEnd]}>
                <Button title="Chọn ảnh" onPress={pickImage} />
                <Button title="Lưu ảnh" onPress={saveImage} />
            </View>
        )
    }
    /* -------------------- RENDER -------------------- */
    return (
        <BaseContainer
            title="Sign With Skia"
            containerStyle={[BaseStyle.container]}
        >
            {renderHeader()}
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1, flexShrink: 1 }}>
                    <GestureDetector gesture={panDraw}>
                        <View style={styles.canvasWrapper}>
                            {image && currentFont && (
                                <GestureDetector gesture={panText}>
                                    <Canvas
                                        style={{
                                            width: previewWidth,
                                            height: actualPreviewHeight,
                                        }}>
                                        <SkiaImage
                                            image={image}
                                            x={0}
                                            y={0}
                                            width={previewWidth}
                                            height={actualPreviewHeight}
                                        />
                                        {paths.current.map((p, i) => (
                                            <Path
                                                key={i}
                                                path={p}
                                                style="stroke"
                                                strokeWidth={4}
                                                color={fontColor}
                                            />
                                        ))}
                                        {renderWatermarks()}
                                    </Canvas>
                                </GestureDetector>
                            )}
                            {/* {renderPreviewImage()} */}
                        </View>
                    </GestureDetector>
                </ScrollView>
                <View style={[BaseStyle.container]}>

                    <ListElements
                        selectedFontKey={selectedFontKey}
                        onSelect={k => setSelectedFontKey(k as FontKey)}
                        fontSize={fontSize}
                        onChangeFontSize={setFontSize}
                        fontColor={fontColor}
                        onChangeFontColor={setFontColor}
                        watermarkOpacity={watermarkOpacity}
                        onChangeOpacity={setWatermarkOpacity}
                        signatureName={signatureName}
                        setSignatureName={setSignatureName}
                        rotate={rotate}
                        setRotate={setRotate}
                    />

                    <View style={styles.actions}>
                        {/* <Button
                            title="Xóa chữ ký tay"
                            onPress={() => {
                                paths.current = [];
                                forceUpdate(v => v + 1);
                            }}
                        /> */}
                        {/* <Button
                        title="Reset text"
                        onPress={() => {
                            textX.value = 50;
                            textY.value = 80;
                        }}
                    /> */}
                    </View>
                </View>
            </View>
        </BaseContainer>
    );
}
export default memo(SignWithSkia);

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    canvasWrapper: { backgroundColor: '#fff' },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
});