import {moderateScale} from 'Themes/Scaling';

const FontSizes = {
  /**
   * font10: moderateScale(10)
   */
  font10: moderateScale(10),
  /**
   * font12: moderateScale(12)
   */
  font12: moderateScale(12),
  /**
   * font14: moderateScale(14)
   */
  font14: moderateScale(14),
  /**
   * font16: moderateScale(16)
   */
  font16: moderateScale(16),
  /**
   * font24: moderateScale(24)
   */
  font24: moderateScale(24),
};

export type IFontSize = keyof typeof FontSizes;
export {FontSizes};
