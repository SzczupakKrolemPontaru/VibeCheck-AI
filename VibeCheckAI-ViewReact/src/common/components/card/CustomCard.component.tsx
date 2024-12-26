import React, {ReactElement} from 'react';
import {StyledCustomCard} from './CustomCard.style';
import {Card} from "primereact/card";

interface CustomCardProps {
    className?: string;
    children: ReactElement[] | ReactElement;
    backgroundColor?: string;
    title?: string;
    subTitle?: string
}

export const CustomCard: React.FC<CustomCardProps> = (props: CustomCardProps): ReactElement => {
    return <StyledCustomCard className={props.className} backgroundColor={props.backgroundColor}>
        <Card title={props.title} subTitle={props.subTitle}>
            {props.children}
        </Card>
    </StyledCustomCard>
}