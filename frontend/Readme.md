Farmer’s_Hub/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── styles.css             // Tailwind directives & custom styles
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js          // Navigation bar (may include auth-related buttons)
│   │   │   ├── Weather.js         // Weather forecast component
│   │   │   ├── CropTips.js        // Crop management tips component
│   │   │   ├── MarketPrices.js    // Real-time market prices component
│   │   │   ├── Forum.js           // Community forum component
│   │   │   ├── ECommerce.js       // E-commerce marketplace component
│   │   │   ├── Support.js         // Government & NGO support links component
│   │   │   ├── RequireAuth.jsx    // New: Route guard to protect private pages
│   │   │   └── PageLoader.jsx     // New: Loading spinner (for auth and data loading UX)
│   │   ├── context/
│   │   │   └── AuthContext.jsx    // New: AuthProvider & useAuth hook for centralized state
│   │   ├── hooks/
│   │   │   └── useLocalStorage.jsx// New: Custom hook for persisting state (e.g. auth tokens)
│   │   ├── pages/
│   │   │   ├── Home.jsx           // Public landing page
│   │   │   ├── Login.jsx          // Login page (with focus management and ARIA attributes)
│   │   │   ├── Dashboard.jsx      // Protected dashboard page for authenticated users
│   │   │   ├── Profile.jsx        // Protected profile page displaying user info
│   │   │   └── NotFound.jsx       // 404 error page
│   │   ├── App.js                 // Main component that sets up routes
│   │   ├── index.js               // Entry point; wraps App with BrowserRouter & AuthProvider
│   ├── package.json
│   ├── webpack.config.js
├── backend/
│   ├── controllers/
│   │   ├── authController.js      // Handles user login/logout, token issuance, etc.
│   │   ├── weatherController.js
│   │   ├── marketController.js
│   │   ├── forumController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── User.js                // User schema/model for authentication & authorization
│   │   ├── Product.js
│   │   ├── ForumPost.js
│   │   └── MarketPrice.js
│   ├── routes/
│   │   ├── authRoutes.js          // API endpoints for authentication
│   │   ├── weatherRoutes.js
│   │   ├── marketRoutes.js
│   │   ├── forumRoutes.js
│   │   └── productRoutes.js
│   ├── middleware/
│   │   └── auth.js                // Server-side middleware to protect routes
│   ├── config/
│   │   └── db.js                  // Database connection setup
│   ├── server.js                  // Express server entry point
│   ├── .env                     // Environment variables (DB, JWT secret, etc.)
│   ├── package.json
├── database/
│   └── seedData.js                // Script to seed the database
├── docs/
│   ├── README.md                  // Documentation for project overview
│   └── API_Documentation.md       // Detailed API documentation for backend endpoints
├── assets/
│   └── images/                    // Static images used by the application
├── .gitignore
└── README.md                    // Project README with setup and usage instructions


Setup & Installation
Clone the Repository

git clone https://github.com/Ifuhad622/Farmers_Hub.git
cd Farmers_Hub

 Install Dependencies
Frontend
cd frontend
npm install
npm start

Backend
cd backend
npm install
node server.js

Environment Variables (.env)
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/farmers_hub
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
WEATHER_API_KEY=your_weather_api_key

Contributing
Contributions are welcome! Fork the repo, make your changes, and submit a pull request.