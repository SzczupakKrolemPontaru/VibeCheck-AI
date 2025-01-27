import React, {FC, ReactElement} from 'react';
import {DataList} from 'src/common/components/dataList/DataList.component';
import {YouTubeFavourites} from 'src/common/components/dataList/YouTubeFavourites.type';

interface YouTubeFavouritesListProps {
    favouriteVideos: YouTubeFavourites[];
}

export const YouTubeFavouritesList: FC<YouTubeFavouritesListProps> = ({favouriteVideos}): ReactElement => {
    return (
        <div>
            <h2>Favourite YouTube Videos</h2>
            <DataList favouritesList={favouriteVideos} />
        </div>
    );
};