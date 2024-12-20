import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {ReactElement} from "react";
import React from "react";

const MainPage: ReactElement = <>HAHAHA</>

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/chat" element={MainPage}/>
    )
)