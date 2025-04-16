import { Dimensions } from 'react-native';
const {width, height, fontScale} = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Guideline sizes are based on standard ~5" screen mobile device
// const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 812;
const guidelineBaseWidth = 430;
const guidelineBaseHeight = 931;

const scale = (size: number) => (shortDimension / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  (size + (scale(size) - size) * factor) / fontScale;
const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

export { DEVICE_HEIGHT, DEVICE_WIDTH, moderateScale, moderateVerticalScale, scale, verticalScale };
