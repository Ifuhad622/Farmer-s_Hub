# 🌾 Farmers Hub API

A robust RESTful API built with Node.js and Express.js that connects farmers with buyers, provides real-time market prices, weather updates, and a community forum.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Farmer, Buyer, Admin)
  - Secure password hashing
  - Email verification

- **Product Management**
  - CRUD operations for agricultural products
  - Image upload support
  - Stock management
  - Price tracking

- **Market Price System**
  - Real-time price updates
  - Historical price data
  - Price trend analysis
  - Location-based pricing

- **Weather Updates**
  - Current weather data
  - Weather forecasts
  - Weather alerts
  - Location-based updates

- **Community Forum**
  - Discussion threads
  - Comments and replies
  - Category management
  - Post moderation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **File Upload**: Multer
- **Weather API**: OpenWeather API
- **Documentation**: Swagger/OpenAPI

## 📋 Prerequisites

- Node.js >= 14.0.0
- MongoDB Atlas Account
- npm or yarn
- OpenWeather API Key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/farmers-hub-api.git
   cd farmers-hub-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your credentials:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_ATLAS_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   WEATHER_API_KEY=your_openweather_api_key
   ```

4. **Database Seeding**
   ```bash
   # Seed the database with sample data
   npm run seed

   # Clear the database
   npm run seed:delete
   ```

5. **Start the Server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📚 API Documentation

Detailed API documentation is available at:
- Development: `http://localhost:5000/api-docs`
- Production: `https://api.farmershub.com/api-docs`

For more details, see [API_Documentation.md](API_Documentation.md)

## 🗂️ Project Structure

farmers-hub-api/
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── productController.js
│ ├── marketController.js
│ ├── weatherController.js
│ └── forumController.js
├── middleware/
│ ├── auth.js
│ ├── error.js
│ └── upload.js
├── models/
│ ├── User.js
│ ├── Product.js
│ ├── MarketPrice.js
│ └── ForumPost.js
├── routes/
│ ├── authRoutes.js
│ ├── productRoutes.js
│ ├── marketRoutes.js
│ ├── weatherRoutes.js
│ └── forumRoutes.js
├── utils/
│ ├── errorHandler.js
│ └── validators.js
└── tests/
├── auth.test.js
└── product.test.js
This README includes:
Clear project description and features
Detailed installation instructions
Complete tech stack information
Project structure
Available scripts
Security measures
Contributing guidelines
Support information
Status badges
Future roadmap

## 📝 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run seed` - Seed database with sample data
- `npm run seed:delete` - Clear database

## 🔒 Security

- CORS enabled
- Rate limiting
- Data validation
- XSS protection
- NoSQL injection prevention
- Security headers (helmet)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- OpenWeather API for weather data
- MongoDB Atlas for database hosting
- Express.js community for the excellent framework

## 📞 Support

For support, email api@farmershub.com or join our Slack channel.

## 🔄 Status

- Build: ![Build Status](https://img.shields.io/travis/yourusername/farmers-hub-api)
- Version: ![Version](https://img.shields.io/github/v/release/yourusername/farmers-hub-api)
- License: ![License](https://img.shields.io/github/license/yourusername/farmers-hub-api)

## 📊 Roadmap

- [ ] Implement real-time notifications
- [ ] Add payment gateway integration
- [ ] Develop mobile app
- [ ] Add analytics dashboard
- [ ] Implement machine learning for price predictions
