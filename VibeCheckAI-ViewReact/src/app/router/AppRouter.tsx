import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {ReactElement} from "react";
import React from "react";
import {TopBar} from "App/topBar/TopBar.component";

const MainPage: ReactElement = <>
    <TopBar/>
</>

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/chat" element={MainPage}/>
    )
)