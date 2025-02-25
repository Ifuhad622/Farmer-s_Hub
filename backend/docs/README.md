# Farmers Hub API

A RESTful API for connecting farmers with buyers, providing market prices, weather updates, and a community forum.

## Features

- 🔐 Authentication & Authorization
- 🌾 Product Management
- 💰 Market Price Tracking
- 🌤 Weather Updates
- 💬 Community Forum
- 📊 Analytics & Reports

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- OpenWeather API

## Prerequisites

- Node.js >= 14.0.0
- MongoDB Atlas Account
- npm or yarn
- OpenWeather API Key

## Installation

1. Clone the repository

git clone https://github.com/yourusername/farmers-hub-api.git
cd farmers-hub-api


2. Install dependencies
npm install


3. Create .env file

NODE_ENV=development
PORT=5000
MONGODB_ATLAS_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
WEATHER_API_KEY=your_openweather_api_key


4. Seed the database
npm run seed


5. Start the server
Development
npm run dev

Production
npm start


## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run seed` - Seed database
- `npm run seed:delete` - Clear database

## Project Structure


farmers-hub-api/
├── config/
│ └── db.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── data/
└── tests/



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

