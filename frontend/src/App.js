import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; // Home page component
import Weather from "./components/Weather";
import CropTips from "./components/CropTips";
import MarketPrices from "./components/MarketPrices";
import Forum from "./components/Forum";
import ECommerce from "./components/ECommerce";
import Support from "./components/Support";
import RequireAuth from "./components/RequireAuth"; // Importing RequireAuth component
import PageLoader from "./components/PageLoader"; // Importing the loader for waiting states
import "./App.css"; // Import your global CSS styles

function App() {
    return (
        <Router>
            {/* Navbar component that will be present on all pages */}
            <Navbar />

            {/* Main content container with spacing */}
            <div className="container mx-auto px-4 py-8">
                {/* Suspense for lazy-loaded components */}
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        {/* Homepage Route */}
                        <Route path="/" element={<Home />} />

                        {/* Protected Routes (Require Authentication) */}
                        <Route
                            path="/weather"
                            element={
                                <RequireAuth>
                                    <Weather />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/crop-tips"
                            element={
                                <RequireAuth>
                                    <CropTips />
                                </RequireAuth>
                            }
                        />

                        {/* Other public pages */}
                        <Route path="/market-prices" element={<MarketPrices />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/e-commerce" element={<ECommerce />} />
                        <Route path="/support" element={<Support />} />

                        {/* 404 Page Not Found */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
