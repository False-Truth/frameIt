import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, Home, Settings } from 'lucide-react';
import './SignOutPage.css';

const SignOutPage = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutComplete, setSignOutComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto sign-out after component mounts
    handleSignOut();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    
    // Simulate sign-out process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear user session/data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    sessionStorage.clear();
    
    setIsSigningOut(false);
    setSignOutComplete(true);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLoginAgain = () => {
    navigate('/signin');
  };

  if (isSigningOut) {
    return (
      <div className="signout-container">
        <div className="signout-card">
          <div className="signout-loading">
            <div className="loading-spinner">
              <LogOut className="spinner-icon" />
            </div>
            <h2>Signing Out...</h2>
            <p>Please wait while we secure your session</p>
          </div>
        </div>
      </div>
    );
  }

  if (signOutComplete) {
    return (
      <div className="signout-container">
        <div className="signout-card">
          <div className="signout-success">
            <div className="success-icon">
              <Shield />
            </div>
            <h2>Signed Out Successfully</h2>
            <p>You have been securely signed out of your account.</p>
            <p className="security-note">For your security, all session data has been cleared.</p>
            
            <div className="signout-actions">
              <button 
                onClick={handleGoHome}
                className="action-btn primary"
              >
                <Home size={18} />
                Go to Homepage
              </button>
              <button 
                onClick={handleLoginAgain}
                className="action-btn secondary"
              >
                <LogOut size={18} />
                Sign In Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SignOutPage;
