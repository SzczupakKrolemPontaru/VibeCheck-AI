import {AuthorizationPage} from 'App/authorizationPage/AuthorizationPage.component';
import {SocialMediaAnalysis} from 'App/socialMediaAnalysis/SocialMediaAnalysys.component';
import {TopBar} from 'App/topBar/TopBar.component';
import React, {FC, ReactElement} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const MainPage: ReactElement = <>
    <TopBar/>
    <SocialMediaAnalysis/>
</>

export const AppRouter: FC = (): ReactElement => (
	<BrowserRouter>
	<Routes>
		<Route
			path="/"
			element={<AuthorizationPage />}
		/>
		<Route
			path="/socialMediaAnalysis"
			element={MainPage}
		/>
	</Routes>
</BrowserRouter>
);
