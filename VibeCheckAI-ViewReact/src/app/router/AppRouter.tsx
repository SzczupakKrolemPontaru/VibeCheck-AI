import {SocialMediaAnalysis} from 'App/socialMediaAnalysis/SocialMediaAnalysys.component';
import {TopBar} from 'App/topBar/TopBar.component';
import React, {ReactElement} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

const MainPage: ReactElement = <>
    <TopBar/>
    <SocialMediaAnalysis/>
</>

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={MainPage}>
        </Route>
    )
)