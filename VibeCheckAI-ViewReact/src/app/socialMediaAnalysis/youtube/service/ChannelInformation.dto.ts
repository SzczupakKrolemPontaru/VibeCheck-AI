export interface ChannelInformationDTO {
    channelTitle: string;
    channelDescription: string;
    channelCustomUrl: string;
    channelViewsCount: number;
    channelSubsCount: number;
    channelVideoCount: number;
    channelCreatedAt: Date;
}

export const InitialChannelInformation: ChannelInformationDTO = {
    channelTitle: "DJ Skręt Jąder",
    channelDescription: "elo żelo \n\n\n",
    channelCustomUrl: "djskretjader",
    channelViewsCount: 3424777,
    channelSubsCount: 19300,
    channelVideoCount: 111,
    channelCreatedAt: new Date("2022-01-02T13:16:48.834868Z")
}