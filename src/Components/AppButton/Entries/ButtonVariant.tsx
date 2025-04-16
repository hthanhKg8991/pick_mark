import { AppVariant } from 'Constants';
import Colors from 'Themes/Colors';

const ButtonVariants = (variant: AppVariant) => {
    switch(variant){
        case AppVariant.Default:
            return {
                backgroundColor: Colors.primary,
            };
        case AppVariant.Outline:
            return {
                borderWidth:1,
                borderColor: Colors.borderPrimary,
            };
        case AppVariant.Warning:
            return {
                backgroundColor: Colors.backgroundWarning,
            };
        case AppVariant.Disable:
            return {
                backgroundColor: Colors.backgroundDisable,
            };
        case AppVariant.Error:
            return {
                backgroundColor: Colors.error,
            };
        default:
            return {
                backgroundColor: Colors.error,
            };
    }
 
};
export default ButtonVariants;
