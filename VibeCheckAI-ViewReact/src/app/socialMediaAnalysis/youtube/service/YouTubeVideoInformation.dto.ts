export interface YouTubeVideoInformationDTO {
    title: string;
    videoId: string;
    thumbnailUrl: string;
    viewsCount: number;
    likesCount: number;
    commentsCount: number;
    publishDate: Date;
}

export const InitialYouTubeVideoInformation: YouTubeVideoInformationDTO = {
    title: "🔥 MIX DO GRANIA ZYRĄ *poradnik dla ogrodników*",
    videoId: "rkOowmP1mHc",
    thumbnailUrl: "https://i.ytimg.com/vi/rkOowmP1mHc/maxresdefault.jpg",
    viewsCount: 7387,
    likesCount: 163,
    commentsCount: 38,
    publishDate: new Date("2022-10-29T12:28:31Z")
}