import { googleLogout } from '@react-oauth/google';
import { useUserStore } from '../store/userStore';

interface LogoutProps {
  onLogout: () => void;
}

const COLORS = {
  white: '#ffffff',
  error: '#d32f2f',
  errorHover: '#b71c1c',
};

export const Logout = ({ onLogout }: LogoutProps) => {
            const clearUser = useUserStore((state) => state.clearUser);
            const handleLogout = async () => {
    try {
      // Step A: Tell your .NET Backend to revoke the session/tokens
      const response = await fetch('http://localhost:5194/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include your app's authorization token so the backend knows who is logging out
          'Authorization': `Bearer ${localStorage.getItem('app_token')}`,
        },
      });

      if (response.ok) {
        console.log('Backend logout successful');
      }
    } catch (error) {
      console.error('Backend logout failed, continuing frontend cleanup...', error);
    }

    // Step B: Clean up local application state & tokens
    localStorage.removeItem('app_token');
    // Clear user from store
    clearUser();

    // Step C: Trigger Google Identity Services logout to prevent auto-sign-in loop
    googleLogout();

    // Step D: Callback to parent component to update state
    onLogout();
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '0.6rem 1.2rem',
        background: COLORS.error,
        color: COLORS.white,
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = COLORS.errorHover;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = COLORS.error;
      }}
    >
      Log Out
    </button>
  );
};
