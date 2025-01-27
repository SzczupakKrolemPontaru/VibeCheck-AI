import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {DataView} from 'primereact/dataview';
import {ConfirmPopup, confirmPopup} from 'primereact/confirmpopup';
import React, {FC, ReactElement, useRef, useState} from 'react';
import {StyledDataList} from './DataList.style';
import {YouTubeFavourites} from './YouTubeFavourites.type';
import {VibeCheckColors} from "Colors/VibeCheckColors";
import {translateText} from "../../../lang/TranslationUtils";

interface DataListProps {
    favouritesList: YouTubeFavourites[];
}

export const DataList: FC<DataListProps> = ({favouritesList}): ReactElement => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const toggleFavorite = (videoUrl: string, ref: React.RefObject<HTMLButtonElement>) => {
        if (favorites.includes(videoUrl)) {
            confirmPopup({
                target: ref.current,
                message: translateText('REMOVE_FROM_FAVORITES'),
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    setFavorites((prevFavorites) => prevFavorites.filter((url) => url !== videoUrl));
                    console.log(`Removing ${videoUrl} from favorites`);
                }
            });
        } else {
            setFavorites((prevFavorites) => [...prevFavorites, videoUrl]);
            console.log(`Adding ${videoUrl} to favorites`);
        }
    };

    const listTemplate = (data: YouTubeFavourites) => {
        const isAddedToFavorites = favorites.includes(data.videoUrl);
        const buttonRef = useRef<HTMLButtonElement>(null);

        return (
            <Card title={data.title} subTitle={data.channelTitle}>
                <img src={data.thumbnailUrl} alt={data.title} style={{width: '100%'}} />
                <div className="card-content">
                    <Button style={{background: VibeCheckColors.diagramPurple, borderColor: VibeCheckColors.diagramPurple}}
                            label="Watch"
                            icon="pi pi-play"
                            onClick={() => window.open(data.videoUrl, '_blank')}
                    />
                    <Button
                        icon={isAddedToFavorites ? 'pi pi-star-fill' : 'pi pi-star'}
                        className="favorite-button p-button-rounded p-button-text"
                        style={{color: isAddedToFavorites ? 'gold' : 'grey', boxShadow: 'none'}}
                        onClick={() => toggleFavorite(data.videoUrl, buttonRef)}
                        // @ts-ignore - buttonRef is not a valid prop for Button, Button props extends HTMLButtonAttributes anyway
                        ref={buttonRef}
                    />
                </div>
            </Card>
        );
    };

    return (
        <StyledDataList>
            <ConfirmPopup />
            <DataView value={favouritesList} layout={'grid'} itemTemplate={listTemplate} paginator rows={11}/>
        </StyledDataList>
    );
};