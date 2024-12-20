import {enTexts} from "./en";
import {isDefined} from "../common/utils/VibeCheck.utils";

export const translateText = (textId: string) => {
    const translatedText: string = enTexts[textId];
    return isDefined(translatedText) ? translatedText : textId;
}