import React from 'react';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Bienvenue sur la page d'accueil</h1>
        <p className="text-center text-gray-600 mb-4">Vous êtes maintenant connecté.</p>
      </div>
    </div>
  );
}
