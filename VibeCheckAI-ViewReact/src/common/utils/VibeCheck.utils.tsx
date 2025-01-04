export const EMPTY_STRING = "";

export const isDefined = (object: any): boolean => {
    return object !== null && object !== undefined;
};

export const calcRemToPx = (rem: number): number => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const createYouTubeChannelLink = (channelName: string) => {
    return "https://www.youtube.com/c/" + channelName;
}

export const dateToString = (date: Date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

}