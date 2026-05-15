import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      // Securely store the token
      localStorage.setItem('auth_token', token);
      
      // Artificial delay to allow the "Elite" loading animation to play
      const timer = setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      navigate('/auth', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-hestia-bg mesh-gradient">
      <div className="text-center space-y-8 max-w-md px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-24 h-24 border-4 border-blue-100 rounded-full mx-auto" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-24 h-24 border-4 border-t-blue-600 rounded-full mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-3xl text-editorial text-gray-950">Establishing Authority</h2>
          <p className="text-slate-500 font-medium text-lg">
            Securing your session with Hestia precision. <br />
            Preparing your dashboard...
          </p>
        </motion.div>

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="h-1 bg-blue-600 rounded-full max-w-[200px] mx-auto"
        />
      </div>
    </main>
  );
}
