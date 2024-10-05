import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="container mx-auto px-4 text-center text-yellow-300">
        <p className="font-bold">&copy; 2024 Space Education Orrery. All rights reserved.</p>
        <p className="mt-2">
          <a href="#" className="underline">Privacy Policy</a> | 
          <a href="#" className="underline ml-2">Terms of Service</a>
        </p>
        <div className="mt-4">
          <p className="font-bold">Space Exploration Challenge</p>
          <p>
            Participate in our "Space Education Orrery Challenge" to learn more about the solar system and beyond. 
            Compete with friends and earn rewards for discovering amazing facts about space!
          </p>
        </div>
      </div>
    </footer>
  );
}
