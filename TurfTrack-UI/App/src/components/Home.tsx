import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)',
      padding: '2rem',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        maxWidth: 700,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: '#1b5e20',
          marginBottom: '1rem',
          margin: '0 0 1rem 0',
        }}>
          Welcome to TurfTrack
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#374151',
          marginBottom: '2rem',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}>
          Your all-in-one solution for managing lawn maintenance activities, schedules, and reminders. Get started by adding your first activity or exploring your dashboard.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'inline-block',
            padding: '0.9rem 2.2rem',
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: '0.75rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(56,142,60,0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#2e7d32'}
          onMouseOut={(e) => e.currentTarget.style.background = '#388e3c'}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
