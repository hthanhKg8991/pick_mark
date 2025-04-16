import { AppVariant } from 'Constants';
import { Colors } from 'Themes';
// import { Colors } from 'Themes';

const TextVariants = (variant: AppVariant) =>{
    switch(variant){
        case AppVariant.Default:
            return {
                color: Colors.text,
            };
        case AppVariant.Warning:
            return {
                color: Colors.textWarning,
            };
        case AppVariant.Disable:
            return {
                color: Colors.textDisabled,
            };
        case AppVariant.Error:
            return {
                color: Colors.textError,
            };
        default:
            return {
                color: Colors.textWhite,
            };
    }
 
};
export default TextVariants;
