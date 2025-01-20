import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import UserDetail from "./components/UserDetail";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/:id" element={<UserDetail />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
