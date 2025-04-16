import AppEmpty from 'Components/AppEmpty/AppEmpty';
import { FC, memo } from 'react';
import { FlatList, FlatListProps } from 'react-native';
interface AppListProps extends FlatListProps<any>
{
    windowSize?: number;
}
const AppList: FC<AppListProps> = ( { windowSize, ...props } ) =>
{

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            windowSize={windowSize ?? 50}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            ListEmptyComponent={<AppEmpty />}
            {...props} />
    );
};
export default memo( AppList );
