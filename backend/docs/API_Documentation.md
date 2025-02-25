# Farmers Hub API Documentation

## Base URL
https://api.farmershub.com/api/v1


## Authentication

### Register User
http
POST /auth/register


**Request Body:**
son
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"role": "farmer"
}


#### Get Profile
http
GET /auth/profile

**Response (200 OK):**
json
{
"success": true,
"data": {
"id": "user_id",
"name": "John Doe",
"email": "john@example.com",
"role": "farmer",
"location": "Punjab",
"phoneNumber": "+91-9876543210"
}
}

## Products API
### Product Endpoints

#### Get All Products
http
GET /products


**Query Parameters:**
- `category` (string): Filter by category (vegetables, fruits, grains)
- `search` (string): Search in name and description
- `page` (number, default: 1): Page number
- `limit` (number, default: 10): Items per page
- `sort` (string): Sort by field (price, createdAt)
- `order` (string): Sort order (asc, desc)

**Response (200 OK):**


json
{
"success": true,
"data": {
"products": [{
"id": "product_id",
"name": "Organic Wheat",
"price": 30.00,
"category": "grains",
"stock": 1000,
"seller": {
"id": "user_id",
"name": "John Doe"
}
}],
"pagination": {
"page": 1,
"limit": 10,
"total": 100,
"pages": 10
}
}
}


#### Create Product
http
POST /products

**Request Body:**
json
{
"name": "Organic Wheat",
"description": "Fresh organic wheat from Punjab farms",
"price": 30.00,
"category": "grains",
"stock": 1000,
"unit": "kg",
"images": ["base64_image_data"]
}


**Response (201 Created):**
json
{
"success": true,
"data": {
"id": "product_id",
"name": "Organic Wheat",
"price": 30.00,
"category": "grains"
}
}

## Market Prices API

### Market Price Endpoints

#### Get Market Prices
http
GET /market/prices


**Query Parameters:**
- `category` (string): Filter by category
- `location` (string): Filter by location
- `date` (string): Filter by date
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200 OK):**

json
{
"success": true,
"data": {
"prices": [{
"id": "price_id",
"product": {
"id": "product_id",
"name": "Organic Wheat"
},
"location": "Delhi",
"price": 25.00,
"trend": "rising",
"date": "2023-12-20T10:00:00Z"
}],
"pagination": {
"page": 1,
"limit": 10,
"total": 50
}
}
}

## Weather API

### Weather Endpoints

#### Get Current Weather
http
GET /weather/current

**Query Parameters:**
- `city` (string, required): City name
- `units` (string, optional): metric/imperial (default: metric)

**Response (200 OK):**

json
{
"success": true,
"data": {
"temperature": 32,
"description": "Clear sky",
"humidity": 65,
"windSpeed": 12,
"location": "Delhi",
"timestamp": "2023-12-20T10:00:00Z"
}
}


## Forum API

### Forum Endpoints

#### Get Posts
http
GET /forum/posts

**Query Parameters:**
- `category` (string): Filter by category
- `tags` (array): Filter by tags
- `search` (string): Search in title and content
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200 OK):**


json
{
"success": true,
"data": {
"posts": [{
"id": "post_id",
"title": "Best farming practices",
"content": "Here are some tips...",
"author": {
"id": "user_id",
"name": "John Doe"
},
"category": "farming_tips",
"tags": ["organic", "farming"],
"createdAt": "2023-12-20T10:00:00Z",
"comments": [{
"id": "comment_id",
"content": "Great tips!",
"user": {
"id": "user_id",
"name": "Jane Doe"
},
"createdAt": "2023-12-20T11:00:00Z"
}]
}],
"pagination": {
"page": 1,
"limit": 10,
"total": 100
}
}
}

## Error Handling

### Error Response Format
json
{
"success": false,
"message": "Error message here",
"error": {
"code": "ERROR_CODE",
"details": "Additional error details"
}
}

### Common Error Codes

- `AUTH_001`: Authentication failed
- `AUTH_002`: Invalid token
- `AUTH_003`: Token expired
- `VALIDATION_001`: Invalid input data
- `RESOURCE_001`: Resource not found
- `PERMISSION_001`: Insufficient permissions

## Rate Limiting

- Free tier: 100 requests per 15 minutes
- Premium tier: 1000 requests per 15 minutes
- Headers included in response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

## Data Models

### User Model
typescript
{
id: string
name: string
email: string
password: string (hashed)
role: enum['farmer', 'buyer', 'admin']
location: string
phoneNumber: string
isVerified: boolean
createdAt: datetime
updatedAt: datetime
}

### Product Model
typescript
{
id: string
name: string
description: string
price: number
category: string
stock: number
unit: string
images: string[]
seller: ref(User)
rating: number
numReviews: number
createdAt: datetime
updatedAt: datetime
}

## Webhooks

### Available Events

1. Price Updates
http
POST /webhooks/prices

```json
{
  "event": "price.updated",
  "data": {
    "productId": "product_id",
    "oldPrice": 25.00,
    "newPrice": 28.00,
    "location": "Delhi",
    "timestamp": "2023-12-20T10:00:00Z"
  }
}

### Stock Updates
POST /webhooks/stock


json{ "event": "stock.updated", "data": { "productId": "product_id", "oldStock": 100, "newStock": 80, "timestamp": "2023-12-20T10:00:00Z" }}
API Versioning
Current version: v1
Version is specified in the URL
Older versions will be supported for 6 months after deprecation notice
Security
All endpoints use HTTPS
JWT tokens expire after 30 days
Password requirements:
Minimum 8 characters
At least one uppercase letter
At least one number
At least one special character
Support
Technical support: api@farmershub.com
Documentation: docs.farmershub.com
Status page: status.farmershub.com
Changelog
Version 1.1.0 (2023-12-20)
Added webhook support
Enhanced rate limiting
Added new product categories
Improved error handling
Version 1.0.0 (2023-11-01)
Initial release
Basic CRUD operations
Authentication system
Market price tracking
