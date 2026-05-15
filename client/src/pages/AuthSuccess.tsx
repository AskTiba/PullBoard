import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * AuthSuccess Component
 * Handles the OAuth callback redirect, captures the JWT from the query parameters,
 * and establishes session persistence before redirecting to the main dashboard.
 */
export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Securely store the token. In a production Supreme Authority system, 
      // we would use a more secure storage mechanism than localStorage.
      localStorage.setItem('auth_token', token);
      
      // Redirect to dashboard on success, ensuring the app state refreshes
      navigate('/dashboard', { replace: true });
    } else {
      // Fallback for failed authentication scenarios
      navigate('/auth', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-hestia-bg">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto" />
        <h2 className="text-xl font-black text-gray-950">Establishing Session...</h2>
        <p className="text-slate-600 font-medium">Securing your session with Hestia precision.</p>
      </div>
    </main>
  );
}
