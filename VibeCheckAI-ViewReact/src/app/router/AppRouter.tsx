import {AuthorizationPage} from 'App/authorizationPage/AuthorizationPage.component';
import { YouTubeFavouritesList } from 'App/favouritesList/YouTubeFavouritesList.components';
import {SocialMediaAnalysis} from 'App/socialMediaAnalysis/SocialMediaAnalysys.component';
import {TopBar} from 'App/topBar/TopBar.component';
import { favouriteVideos } from 'Components/dataList/YouTubeFavourites.type';
import React, {FC, ReactElement} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

export const AppRouter: FC = (): ReactElement => (
    <BrowserRouter>
        <Routes>
            <Route
                path="/login"
                element={<AuthorizationPage />}
            />
            <Route
                path="/socialMediaAnalysis"
                element={
                    <>
                        <TopBar/>
                        <SocialMediaAnalysis/>
                    </>
            }/>
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
                />
            <Route path="/favourites" element={
                <>
                    <TopBar/>
                    <YouTubeFavouritesList favouriteVideos={favouriteVideos} />
                </>
            } />
        </Routes>
    </BrowserRouter>
);
