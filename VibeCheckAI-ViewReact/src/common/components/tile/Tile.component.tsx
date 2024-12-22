import React, {ReactElement} from 'react';
import {StyledTile} from './Tile.style';
import {Panel} from "primereact/panel";
import {Card} from "primereact/card";

interface TileProps {
    className?: string;
    children: ReactElement[] | ReactElement;
    backgroundColor?: string;
    title?: string;
    subTitle?: string
}

export const Tile: React.FC<TileProps> = (props: TileProps): ReactElement => {
    return <StyledTile className={props.className} backgroundColor={props.backgroundColor}>
        <Card title={props.title} subTitle={props.subTitle}>
            {props.children}
        </Card>
    </StyledTile>
}