import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Importer useRouter pour la redirection
import Image from 'next/image';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});  // Pour stocker les erreurs par champ
  const router = useRouter();  // Initialiser useRouter pour la redirection

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, login: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.status === 400) {
        setErrors(data.errors);
      } else if (response.status === 401) {
        setMessage(data.message);
      } else if (response.status === 200) {
        setMessage(data.message);
        router.push('/home');  // Rediriger vers la page d'accueil après connexion réussie
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      setErrors({ api: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: "url('../assets/it-concepts-it-consulting-1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Welcome to NUMERYX</h2>

        <div className="flex justify-center mb-6">
          <Image 
            src="/assets/logo.jpg"
            alt="Numeryx Logo"
            width={80}
            height={80}
          />
        </div>

        {message && (
          <p className="text-red-500 text-sm mb-4 text-center">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
              Login
            </label>
            <input
              type="text"
              id="login"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your login"
              value={login}
              onChange={handleLoginChange}
            />
            {errors.login && <p className="text-red-500 text-sm">{errors.login}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
