package com.example.vibecheckai.enums;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class EmotionComparator implements Comparator<EmotionsEnum> {
    private static final List<EmotionsEnum> ORDER = Arrays.asList(
            EmotionsEnum.ANGER,
            EmotionsEnum.ANTICIPATION,
            EmotionsEnum.DISGUST,
            EmotionsEnum.FEAR,
            EmotionsEnum.PESSIMISM,
            EmotionsEnum.SADNESS,
            EmotionsEnum.JOY,
            EmotionsEnum.LOVE,
            EmotionsEnum.OPTIMISM,
            EmotionsEnum.SURPRISE,
            EmotionsEnum.TRUST
    );

    @Override
    public int compare(EmotionsEnum o1, EmotionsEnum o2) {
        return Integer.compare(ORDER.indexOf(o1), ORDER.indexOf(o2));
    }
}