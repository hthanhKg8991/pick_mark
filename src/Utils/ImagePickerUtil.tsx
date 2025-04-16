import ImageCroftPicker, { ImageOrVideo } from 'react-native-image-crop-picker';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
interface ImageOptions
{
    width: number;
    height: number;
    mediaType?: 'photo' | 'video' | 'any';
    cropping?: boolean;
    compressImageQuality?: number;
    maxFiles?: number;
    multiple?: boolean;
}
interface IImageOption
{
    smallImage: ImageOptions;
    profileImage: ImageOptions;
    standardImage: ImageOptions;
    defaultImage: ImageOptions;
    defaultVideo: ImageOptions;
    defaultVideoMix: ImageOptions;
}
const optionsImage: IImageOption = {
    smallImage: {
        width: 60,
        height: 60,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.8,
    },
    profileImage: {
        width: 2000,
        height: 2000,
        mediaType: 'photo',
        multiple: false,
        compressImageQuality: 1,



        // compressImageMaxWidth: 1, compressImageMaxWidth: 1500
    },
    standardImage: {
        width: 120,
        height: 120,
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.8,
    },
    defaultImage: {
        width: 900,
        height: 1600,
        mediaType: 'photo',
        maxFiles: 4,
        compressImageQuality: 0.8,
    },
    defaultVideo: {
        width: 900,
        height: 1600,
        mediaType: 'video',
        compressImageQuality: 0.8,
        maxFiles: 1,
    },
    defaultVideoMix: {
        width: 900,
        height: 1600,
        mediaType: 'any',
        compressImageQuality: 0.8,
    },
};
/**
 *
 * @param callBack call back image pick
 * @param options add custom option
 * only selected 1 image
 */
const openCamera = async ( callBack: ( param: ImageOrVideo | null ) => void, options: any ) =>
{
    try
    {
        const image = ( await ImageCroftPicker.openCamera( {
            ...( options ?? optionsImage.defaultImage ),
            multiply: false,
        } ) ) as ImageOrVideo;
        if ( image.size > MAX_FILE_SIZE )
        {
            throw new Error( 'Error: File size too large' );
        }
        callBack( image );
    } catch ( error )
    {
        callBack( null );
    }
};
/**
 * function multiple select image
 * @param callBack callback Image
 * @param options  add option image
 * @param isMultiple  add is multiple
 */

const launchLibrary = async ( options?: any, isMultiple: boolean = false, maxFiles: number = 4 ) =>
{
    try
    {
        const Image = ( await ImageCroftPicker.openPicker( {
            ...( options ?? optionsImage.defaultImage ),
            multiply: isMultiple,
            maxFiles: isMultiple ? maxFiles : 1,
        } ) ) as ImageOrVideo[];

        if ( isMultiple && Image.length > maxFiles )
        {
            const error = `${'Image over limit'} ${maxFiles}` as string;
            throw new Error( error );
        }
        if ( isMultiple && Image?.some( item => item.size > MAX_FILE_SIZE ) )
        {
            throw new Error( 'Error: File size too large' );
        }
        return Image;
    } catch ( error )
    {
        return null;
    }
};
// * function check has video and count video > max video length

const isErrorImage = ( media: ImageOrVideo[], maxFile: number ) =>
{
    const video = media?.filter( item => item.mime.includes( 'image' ) );
    return video.length > maxFile;
};
/**
 * function mix media picker
 * @param options  add option default Option has add
 * @param isMultiple multiple select
 * @param maxFiles  max files
 * note: pick one media per time
 */
const mixMediaPicker = async ( {
    options,
    maxImage = 12,
}: {
    options?: ImageOptions;
    maxImage: number;
} ) =>
{
    try
    {
        const optionPicker = options ?? optionsImage.defaultVideoMix;
        const imageResponse = ( await ImageCroftPicker.openPicker( optionPicker ) ) as
            | ImageOrVideo
            | ImageOrVideo[];
        const media = !Array.isArray( imageResponse ) ? [ imageResponse ] : [ ...imageResponse ];
        if ( media?.[ 0 ]?.mime?.includes( 'image' ) )
        {
            media[ 0 ]?.path &&
                ( media[ 0 ] = await ImageCroftPicker.openCropper( {
                    path: media[ 0 ]?.path,
                    mediaType: 'photo',
                    width: optionPicker.width,
                    height: optionPicker.height,
                    compressImageQuality: 1,
                } ) );
        }
        if ( isErrorImage( media, maxImage ) )
        {
            const error = `'image over limit' ${maxImage}`;
            throw new Error( error );
        }
        // * map to  IImage
        return (
            ( media?.map( e =>
            {
                return {
                    ...e,
                    type: e?.mime,
                    uri: e?.path,
                    name: e?.path?.split( '/' ).pop() ?? new Date().getTime().toString(),
                    size: e.size,
                    id: e.path + new Date().getTime().toString(),
                };
            } ) ) ?? []
        );
    } catch ( error )
    {
        return null;
    }
};

const mediaPickerScan = async ( {
    options,
    maxImage = 12,
}: {
    options?: ImageOptions;
    maxImage: number;
} ) =>
{
    try
    {
        const optionPicker = options ?? optionsImage.defaultVideoMix;
        const imageResponse = ( await ImageCroftPicker.openPicker( optionPicker ) ) as
            | ImageOrVideo
            | ImageOrVideo[];
        const media = !Array.isArray( imageResponse ) ? [ imageResponse ] : [ ...imageResponse ];
        if ( isErrorImage( media, maxImage ) )
        {
            const error = `'image over limit' ${maxImage}`;
            throw new Error( error );
        }
        // * map to  IImage
        return (
            ( media?.map( e =>
            {
                return {
                    ...e,
                    type: e?.mime,
                    uri: e?.path,
                    name: e?.path?.split( '/' ).pop() ?? new Date().getTime().toString(),
                    size: e.size,
                    id: e.path + new Date().getTime().toString(),
                };
            } ) ) ?? []
        );
    } catch ( error )
    {
        return null;
    }
};
/**
 * function clean up cache
 */

const cleanUpCache = async () =>
{
    await ImageCroftPicker.clean();
};
export { cleanUpCache, launchLibrary, mixMediaPicker, openCamera, optionsImage, mediaPickerScan };

