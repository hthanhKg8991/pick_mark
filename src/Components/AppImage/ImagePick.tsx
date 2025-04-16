import AppText from 'Components/AppText/AppText';
import { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { mixMediaPicker, optionsImage } from 'Utils/ImagePickerUtil';

type ImagePickProps = {
    onPickImage?: ( uri: any ) => void;
    onRemoveImage?: () => void;
    currenImage?: any | null;
};
const ImagePick: FC<ImagePickProps> = ( { onPickImage, onRemoveImage, currenImage } ) =>
{
    const [ stateImage, setStateImage ] = useState<any>( null );

    const handlePickImage = async () =>
    {
        try
        {
            const image = await mixMediaPicker( {
                options: optionsImage.profileImage,
                maxImage: 1,
            } );
            image && setStateImage( image?.[ 0 ] ?? null );
            image && onPickImage && onPickImage( image?.[ 0 ] ?? null );
        } catch ( error )
        {
            console.error( 'Error picking image:', error );
        }
    };

    return (
        <TouchableOpacity onPress={handlePickImage}>
            <AppText>Select Image</AppText>
        </TouchableOpacity>
    );
};
export default ImagePick;
