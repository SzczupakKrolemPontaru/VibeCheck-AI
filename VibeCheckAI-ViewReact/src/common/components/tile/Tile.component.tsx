import React, {ReactElement} from 'react';
import {StyledTile} from './Tile.style';

interface TileProps {
    children: ReactElement[] | ReactElement;
    backgroundColor?: string;
}

export const Tile: React.FC<TileProps> = (props: TileProps): ReactElement => {
    return <StyledTile backgroundColor={props.backgroundColor}>
        {props.children}
    </StyledTile>
}