
export interface SentimentAnalysisDTO {
    labels: string[];
    values: number[];
    toxicityPercentage: number;
    spamPercentage: number;
    potentialToxicComments: string[]; //TODO change to some interface with values for comment
    potentialSpamComments: string[];  // TODO same here
}

export const InitialSentimentAnalysisDTO: SentimentAnalysisDTO = {
    labels: ["Positive", "Negative", "Neutral"],
    values: [30, 5, 3],
    toxicityPercentage: 3.24,
    spamPercentage: 1.54,
    potentialToxicComments: [],
    potentialSpamComments: []
}