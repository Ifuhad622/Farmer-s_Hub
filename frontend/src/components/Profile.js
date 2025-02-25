import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile } from '../api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        // Add other fields as necessary
    });

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const profileData = await fetchUserProfile();
                setUser(profileData);
                setFormData({
                    username: profileData.username,
                    email: profileData.email,
                    // Initialize other fields as necessary
                });
            } catch (err) {
                setError('Failed to fetch user profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(formData);
            setUser(updatedUser);
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile');
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                {/* Add more fields as necessary */}
                <button type="submit">Update Profile</button>
            </form>
            {user && (
                <div>
                    <h2>Current Profile Information</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    {/* Display other fields as necessary */}
                </div>
            )}
        </div>
    );
};

export default Profile;
