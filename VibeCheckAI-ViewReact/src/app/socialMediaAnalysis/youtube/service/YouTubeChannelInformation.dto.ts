export interface YouTubeChannelInformationDTO {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: Date;
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
}

export const InitialYouTubeChannelInformation: YouTubeChannelInformationDTO = {
    title: "DJ Skręt Jąder",
    description: "elo żelo \n\n\n",
    customUrl: "djskretjader",
    viewCount: 3424777,
    subscriberCount: 19300,
    videoCount: 111,
    publishedAt: new Date("2022-01-02T13:16:48.834868Z")
}