import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative bg-white min-h-screen w-full flex flex-col justify-center items-center overflow-hidden" >
      {/* Background layer with blur */}
      <div
        className="absolute inset-0 z-0"
        style={{
          //backgroundImage: "url('/bg.jpeg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)" // helps avoid empty edges due to blur
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center mx-56 gap-9 text-black text-center">
        <h1 className="text-[50px] font-extrabold mb-0">
          Discover Your Next Adventure with AI <br />
        </h1>
        <h2 className="text-[50px] font-extrabold mb-5 mt-0 pt-0">
          Personalized Itineraries at Your Fingertips
        </h2>

        <p className="text-xl">
          Your personal trip planner and travel curator, creating custom itineraries to your interests and budget.
        </p>

        <Link to={'/create-trip'}>
          <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
