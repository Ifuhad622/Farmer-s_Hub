import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth"; // Importing authentication wrapper
import PageLoader from "./components/PageLoader"; // Loader for suspense fallback
import NotFound from "./components/NotFound"; // 404 Page
import "./App.css"; // Import global CSS styles
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register'; // Import the Register component
import Weather from './components/Weather'; // Import the Weather component

// Lazy-loaded components for better performance
const Home = lazy(() => import("./components/Home"));
const CropTips = lazy(() => import("./components/CropTips"));
const MarketPrices = lazy(() => import("./components/MarketPrices"));
const Forum = lazy(() => import("./components/Forum"));
const ECommerce = lazy(() => import("./components/ECommerce"));
const Support = lazy(() => import("./components/Support"));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/market-prices" element={<MarketPrices />} />
                            <Route path="/forum" element={<Forum />} />
                            <Route path="/e-commerce" element={<ECommerce />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/weather" element={<Weather />} />
                            <Route 
                                path="/crop-tips" 
                                element={
                                    <RequireAuth>
                                        <CropTips />
                                    </RequireAuth>
                                } 
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </div>
                <footer>
                    <p>© 2025 Farmer's Hub | All rights reserved.</p>
                </footer>
            </Router>
        </AuthProvider>
    );
}

export default App;
