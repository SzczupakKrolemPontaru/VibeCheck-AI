import {
YouTubeChannelInformationDTO
} from 'App/socialMediaAnalysis/youtube/service/YouTubeChannelInformation.dto';
import {CustomLabel} from 'Components/label/CustomLabel.component';
import React, {FC, ReactElement} from 'react';
import {createYouTubeChannelLink} from 'Utils/VibeCheck.utils';

interface ChannelInformationProps {
    channelInformation?: YouTubeChannelInformationDTO;
}

export const ChannelInformation : FC<ChannelInformationProps> = (props: ChannelInformationProps): ReactElement => {


    return <div className="grid">
        <div className="col-4">
            <CustomLabel text="CHANNEL_TITLE"/>
            <a href={createYouTubeChannelLink(props.channelInformation?.customUrl ?? '')} target="_blank">
                {props.channelInformation?.title ?? ''}
            </a>
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_DESCRIPTION"/>
            {props.channelInformation?.description ?? ''}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_CREATED_AT"/>
            {new Date(props.channelInformation?.publishedAt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})  ?? ''}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_VIEWS_COUNT"/>
            {props.channelInformation?.viewCount?.toLocaleString() ?? '0'}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_SUBS_COUNT"/>
            {props.channelInformation?.subscriberCount?.toLocaleString() ?? '0'}
        </div>
        <div className="col-4">
            <CustomLabel text="CHANNEL_VIDEOS_COUNT"/>
            {props.channelInformation?.videoCount?.toLocaleString() ?? '0'}
        </div>
    </div>
}