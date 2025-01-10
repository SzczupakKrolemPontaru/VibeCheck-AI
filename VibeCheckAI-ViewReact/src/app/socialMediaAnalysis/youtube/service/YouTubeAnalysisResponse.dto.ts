import {EmotionsEnum} from 'App/socialMediaAnalysis/enum/EmotionsEnum.enum';
import {SentimentEnum} from 'App/socialMediaAnalysis/enum/SentimentEnum.enum';
import {YouTubeChannelInformationDTO} from './YouTubeChannelInformation.dto';
import {YouTubeVideoInformationDTO} from './YouTubeVideoInformation.dto';

export interface YouTubeAnalysisResponseDTO {
    videoStatisticsInfo: YouTubeVideoInformationDTO,
    channelInfo: YouTubeChannelInformationDTO,
    emotions: Map<EmotionsEnum, number>,
    sentiments: Map<SentimentEnum, number>,
    toxicity: number
}