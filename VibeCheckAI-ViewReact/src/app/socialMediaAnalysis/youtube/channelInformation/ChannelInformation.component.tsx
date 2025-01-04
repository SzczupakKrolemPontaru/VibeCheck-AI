import React, {FC, ReactElement} from "react";
import {CustomLabel} from "Components/label/CustomLabel.component";
import {createYouTubeChannelLink} from "Utils/VibeCheck.utils";
import {YouTubeChannelInformationDTO} from "App/socialMediaAnalysis/youtube/service/YouTubeChannelInformation.dto";

interface ChannelInformationProps {
    channelInformation: YouTubeChannelInformationDTO;
}

export const ChannelInformation : FC<ChannelInformationProps> = (props: ChannelInformationProps): ReactElement => {
    return <div className="grid">
        <div className="col-4">
            <CustomLabel text="CHANNEL_TITLE"/>
            <a href={createYouTubeChannelLink(props.channelInformation.channelCustomUrl)} target="_blank">
                {props.channelInformation.channelTitle}
            </a>
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_DESCRIPTION"/>
            {props.channelInformation.channelDescription}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_CREATED_AT"/>
            {props.channelInformation.channelCreatedAt.toLocaleString()}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_VIEWS_COUNT"/>
            {props.channelInformation.channelViewsCount.toLocaleString()}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_SUBS_COUNT"/>
            {props.channelInformation.channelSubsCount.toLocaleString()}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_VIDEOS_COUNT"/>
            {props.channelInformation.channelVideoCount.toLocaleString()}
        </div>
    </div>
}