import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Card() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.BACKEND_URL}/api/users/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Cover Image */}
        <div className="h-36 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <img 
            src="https://i.imgur.com/Qtrsrk5.jpg" 
            alt="Cover" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        {/* Profile Section */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center text-gray-500 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          {/* User Info */}
          <div className="mt-14 text-center">
            <h3 className="text-lg font-semibold text-gray-400">Hello!</h3>
            <h2 className="text-xl font-bold text-gray-800 mt-1">Babu Ayush</h2>
            
            {/* LinkedIn Link */}
            <div className="mt-3">
              <Link to="/" className="inline-block text-blue-600 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-center font-semibold text-gray-700 mb-3">Total Problems Solved</h3>
            <div className="text-center text-2xl font-bold text-indigo-600 mb-4">8,797</div>
            
            {/* Problem Categories */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-green-800">Easy</h4>
                <span className="text-xl font-bold text-green-600">142</span>
              </div>
              
              <div className="bg-yellow-100 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800">Medium</h4>
                <span className="text-xl font-bold text-yellow-600">129</span>
              </div>
              
              <div className="bg-red-100 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-red-800">Hard</h4>
                <span className="text-xl font-bold text-red-600">142</span>
              </div>
            </div>
          </div>
          
          {/* Loading and Error States */}
          {isLoading && (
            <div className="mt-4 text-center text-gray-500">
              <div className="animate-pulse">Loading user data...</div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 text-center text-red-500">
              <div>Error loading data: {error}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;