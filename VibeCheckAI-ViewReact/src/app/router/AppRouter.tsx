import {TopBar} from 'App/topBar/TopBar.component';
import {YoutubeStatistics} from 'App/youtubeStatistics/YoutubeStatistics.component';
import React, {ReactElement} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

const MainPage: ReactElement = <>
    <TopBar/>
    <YoutubeStatistics/>
</>

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={MainPage}>
            <Route path="home" element={MainPage}/>
        </Route>
    )
)