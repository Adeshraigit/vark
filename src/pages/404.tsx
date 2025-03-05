import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/'), 2000); // Redirect after 5 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 text-green-900">
      <div className="text-center p-8 rounded-2xl shadow-lg bg-white max-w-md w-full">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-6 text-lg">Oops! The page you're looking for doesn't exist.</p>
        <p className="mb-4">Redirecting to the homepage in 5 seconds...</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
