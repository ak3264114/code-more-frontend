import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { Link } from 'react-router-dom';

function Home() {
  const animationContainer = useRef(null);
  
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./img/coding.json')
    });
    
    return () => anim.destroy();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left content */}
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              It's about Competition and having fun with friends
            </h1>
            <p className="text-xl text-indigo-200">
              See all your competitors in one place
            </p>
            <div className="pt-4">
              <Link to="/profile">
                <button className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right content - Animation */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div 
              ref={animationContainer} 
              className="w-full h-64 md:h-96 bg-opacity-20 bg-white rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Added feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-indigo-300 text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Leaderboards</h3>
            <p className="text-indigo-200">Track your progress and compare with friends on live leaderboards.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-indigo-300 text-3xl mb-4">👨‍💻</div>
            <h3 className="text-xl font-semibold mb-2">Coding Challenges</h3>
            <p className="text-indigo-200">Test your skills with our library of interactive coding challenges.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-indigo-300 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Skill Progression</h3>
            <p className="text-indigo-200">Watch your skills grow as you complete more challenges.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;