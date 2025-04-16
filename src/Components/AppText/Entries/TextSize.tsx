import { AppSize } from 'Constants';
import { FontSizes } from 'Themes';

const TextSizes = ( size: AppSize ) =>
{
    switch ( size )
    {
        case AppSize.Default:
            return {
                fontSize: FontSizes.font14,
            };
        case AppSize.font10:
            return {
                fontSize: FontSizes.font10,
            };
        case AppSize.font12:
            return {
                fontSize: FontSizes.font12,
            };
        case AppSize.font16:
            return {
                fontSize: FontSizes.font16,
            };
        case AppSize.font24:
            return {
                fontSize: FontSizes.font24,
            };
        default:
            return {
                fontSize: FontSizes.font14,
            };
    }
};
export default TextSizes;
