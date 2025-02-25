import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://localhost:5000'; // Change this to your backend URL if needed

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to fetch user profile
export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to update user profile
export const updateUserProfile = async (userData) => {
    try {
        const response = await axios.put(`${API_URL}/profile/update`, userData);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Function to fetch market prices
export const fetchMarketPrices = async () => {
    try {
        const response = await axios.get(`${API_URL}/market-prices`);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error fetching market prices:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

// Add more API functions as needed

const handleRegister = async (userData) => {
    try {
        const result = await registerUser(userData);
        console.log('Registration successful:', result);
    } catch (error) {
        console.error('Registration failed:', error);
    }
};
