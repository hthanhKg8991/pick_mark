import { AppRounded } from 'Constants';
import { Spacing } from 'Themes/Spacing';

const ButtonRounded = (rounded: AppRounded) =>{
    switch(rounded){
        case AppRounded.Circle:
            return {
                borderRadius: '100%',
            };
        case AppRounded.Square:
            return {
                borderRadius: Spacing.space4,
            };
        case AppRounded.Shape:
            return {
                borderRadius: Spacing.space8,
            };
        default:
            return {
                borderRadius: Spacing.space4,
            };
    }
};
export default ButtonRounded;
