import React from 'react';
import './Home.css';

const Home = () => {
  const features = [
    { title: 'Weather Forecast', description: 'Accurate weather predictions to plan your farming activities.' },
    { title: 'Crop Management Tips', description: 'Expert advice on planting, pest control, and harvesting.' },
    { title: 'Market Prices', description: 'Real-time crop and livestock market prices.' },
    { title: 'Community Forum', description: 'Engage with fellow farmers and share experiences.' },
    { title: 'E-commerce', description: 'Buy and sell farming equipment, seeds, and produce.' },
    { title: 'Support', description: 'Links to government and NGO support programs.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="hero">
        <img 
          src="/images/hero-image.jpg"
          alt="Hero" 
          className="hero-image"
          onError={(e) => {
            console.error('Image failed to load');
            e.target.style.display = 'none';
          }}
        />
        <div className="hero-content">
          <h1 className="hero-text">Welcome to Farmer's Hub</h1>
          <p>Your all-in-one platform for farming insights, tools, and community support.</p>
          <a href="#shop" className="btn hero-btn">Visit Marketplace</a>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
