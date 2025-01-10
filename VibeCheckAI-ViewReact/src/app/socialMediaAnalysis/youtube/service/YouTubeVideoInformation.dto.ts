export interface YouTubeVideoInformationDTO {
    title: string,
    publishedAt: Date
    videoId: string
    thumbnailUrl: string
    viewCount: number,
    likeCount: number,
    commentCount: number
}

export const InitialYouTubeVideoInformation: YouTubeVideoInformationDTO = {
    title: "🔥 MIX DO GRANIA ZYRĄ *poradnik dla ogrodników*",
    publishedAt: new Date("2022-10-29T12:28:31Z"),
    videoId: "rkOowmP1mHc",
    thumbnailUrl: "https://i.ytimg.com/vi/rkOowmP1mHc/maxresdefault.jpg",
    viewCount: 7387,
    likeCount: 163,
    commentCount: 38,
}