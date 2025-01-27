import {AuthorizationPage} from 'App/authorizationPage/AuthorizationPage.component';
import { YouTubeFavouritesList } from 'App/favouritesList/YouTubeFavouritesList.components';
import {SocialMediaAnalysis} from 'App/socialMediaAnalysis/SocialMediaAnalysys.component';
import {TopBar} from 'App/topBar/TopBar.component';
import { favouriteVideos } from 'Components/dataList/YouTubeFavourites.type';
import React, {FC, ReactElement} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from 'Redux/store';
import {UserSubscription} from 'Redux/user/UserSubscriptionLevel.type';
import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';

export const AppRouter: FC = (): ReactElement => {
    const subscriptionLevel: UserSubscription = useSelector((state: RootState) => state.user.subscriptionLevel);
    const selectedPlatform: PlatformType = useSelector((state: RootState) => state.selectedPlatform.platform);

    const isBlocked = subscriptionLevel !== UserSubscription.PREMIUM && selectedPlatform === PlatformType.TWITTER;

    return (
        <BrowserRouter>
            <TopBar />
                <Routes>
                    <Route
                        path="/login"
                        element={<AuthorizationPage />}
                    />
                    <Route
                        path="/socialMediaAnalysis"
                        element={<SocialMediaAnalysis />}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/favourites" element={<YouTubeFavouritesList favouriteVideos={favouriteVideos} />} />
                </Routes>
        </BrowserRouter>
    );
};