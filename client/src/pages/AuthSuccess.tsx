import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Store token in localStorage for session persistence
      localStorage.setItem('auth_token', token);
      // Redirect to dashboard on success
      navigate('/dashboard');
    } else {
      // Handle error case
      navigate('/auth');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-hestia-bg">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="text-xl font-black text-gray-950">Establishing Session...</h2>
      </div>
    </div>
  );
}
