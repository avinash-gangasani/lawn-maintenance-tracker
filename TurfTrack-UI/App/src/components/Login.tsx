import { GoogleLogin } from '@react-oauth/google';
import { authenticateWithGoogle, decodeGoogleToken } from '../services/authService';
import { useUserStore } from '../store/userStore';
import type { GoogleCredentialResponse } from '../services/authService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const COLORS = {
  white: '#ffffff',
  lightGreen: '#f1f8f5',
  accentGreen: '#81c784',
  darkGreen: '#2d7a5f',
};

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const setUser = useUserStore((state) => state.setUser);

  const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    console.log('Google Credential Response received');
    const token = credentialResponse.credential;

    // Decode token to extract user information
    const userInfo = decodeGoogleToken(token);
    if (userInfo) {
      setUser(userInfo);
    }

    const result = await authenticateWithGoogle(token);
    
    if (result.success) {
      onLoginSuccess();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.lightGreen} 100%)`,
      padding: '2rem',
    }}>
      <div style={{
        background: COLORS.white,
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        maxWidth: 500,
        boxShadow: '0 4px 24px 0 rgba(45, 122, 95, 0.08)',
        textAlign: 'center',
        border: `1px solid rgba(129, 199, 132, 0.2)`,
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: COLORS.darkGreen,
          marginBottom: '1rem',
        }}>
          Welcome to TurfTrack
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#4a5568',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}>
          Sign in with your Google account to access your lawn maintenance dashboard.
        </p>
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={() => console.log('Login Failed')} 
        />
      </div>
    </div>
  );
};
