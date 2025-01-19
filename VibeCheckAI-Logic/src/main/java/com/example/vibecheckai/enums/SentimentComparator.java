package com.example.vibecheckai.enums;

import java.util.*;

public class SentimentComparator implements Comparator<SentimentEnum> {
    private static final List<SentimentEnum> ORDER = Arrays.asList(
            SentimentEnum.VERY_NEGATIVE,
            SentimentEnum.NEGATIVE,
            SentimentEnum.NEUTRAL,
            SentimentEnum.POSITIVE,
            SentimentEnum.VERY_POSITIVE
    );

    @Override
    public int compare(SentimentEnum o1, SentimentEnum o2) {
        return Integer.compare(ORDER.indexOf(o1), ORDER.indexOf(o2));
    }
}