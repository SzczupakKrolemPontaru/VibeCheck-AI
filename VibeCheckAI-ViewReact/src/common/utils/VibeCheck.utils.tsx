export const EMPTY_STRING = "";

export const isDefined = (object: any): boolean => {
    return object !== null && object !== undefined;
};

export const calcRemToPx = (rem: number): number => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}