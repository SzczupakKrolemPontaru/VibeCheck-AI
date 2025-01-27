import {LinkInput} from 'App/linkInput/LinkInput.component';
import React, {FC, ReactElement, useState} from 'react';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledTwitterAnalysis} from './TwitterAnalysis.style';
import { Skeleton } from 'primereact/skeleton';
import {CustomCard} from "Components/card/CustomCard.component";
import {Image} from "primereact/image";
import {ChannelInformation} from "App/socialMediaAnalysis/youtube/channelInformation/ChannelInformation.component";
import {Knob} from "primereact/knob";
import {DonutChart} from "Components/chart/donutChart/DonutChart.component";
import {calcRemToPx} from "Utils/VibeCheck.utils";
import {Accordion} from "primereact/accordion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faEye, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {VibeCheckColors} from "Colors/VibeCheckColors";

interface TwitterAnalysisProps {
}

export const TwitterAnalysis: FC<TwitterAnalysisProps> = (props: TwitterAnalysisProps): ReactElement => {

    const [linkValue, setLinkValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return <StyledTwitterAnalysis>
        <LinkInput
            header={translateText("ANALYZE_TWITTER")}
            linkValue={linkValue}
            setLinkValue={setLinkValue}
            placeholder={translateText("TWITTER_LINK_INPUT_PLACEHOLDER")}
            onClick={() => setIsLoading(false)}
        />
        <div className="grid">
            <div className="col-7 h-full">
                <Skeleton width="100%" height="35rem" />
            </div>
            <div className="col-5">
                <div className="flex flex-column h-full gap-4">
                    <Skeleton width="100%" height="150px" />
                    <Skeleton width="100%" height="150px" />
                </div>
            </div>
            <div className="col-4">
                <Skeleton width="100%" height="300px" />
            </div>
            <div className="col-6">
                <Skeleton width="100%" height="300px" />
            </div>
            <div className="col-6">
                <Skeleton width="100%" height="300px" />
            </div>
        </div>
    </StyledTwitterAnalysis>
}