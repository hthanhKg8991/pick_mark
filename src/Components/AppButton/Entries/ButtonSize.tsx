import { AppSize } from 'Constants';
import { Spacing } from 'Themes/Spacing';

const ButtonSizes = (size: AppSize) =>{
    switch(size){
        case AppSize.Small:
            return {
                height: Spacing.space32,
                paddingHorizontal: Spacing.space16,
            };
        case AppSize.Medium:
            return {
                height: Spacing.space48,
                paddingHorizontal: Spacing.space16,
            };
        case AppSize.Large:
            return {
                height: Spacing.space60,
                paddingHorizontal: Spacing.space16,
            };
        default:
            return {
                height: Spacing.space48,
                paddingHorizontal: Spacing.space16,
            };
    }
};
export default ButtonSizes;
