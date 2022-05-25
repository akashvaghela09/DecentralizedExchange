import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { PageNotFound } from "./PageNotFound";

const AllRoutes = () => {
    return (
        <div className="bg-slate-900 h-fit">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export { AllRoutes }