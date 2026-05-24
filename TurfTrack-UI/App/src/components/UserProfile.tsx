import { useUserStore } from '../store/userStore';

const COLORS = {
  white: '#ffffff',
  lightGreen: '#f1f8f5',
  accentGreen: '#81c784',
  darkGreen: '#2d7a5f',
  borderLight: '#e0e7e1',
};

export const UserProfile = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.75rem 1.2rem',
      background: COLORS.white,
      borderRadius: '0.75rem',
      border: `1px solid ${COLORS.borderLight}`,
      boxShadow: '0 2px 8px rgba(45, 122, 95, 0.06)',
    }}>
      {/* {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          style={{
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: `2px solid ${COLORS.accentGreen}`,
            objectFit: 'cover',
          }}
        />
      )} */}
      <div>
        <p style={{
          fontSize: '0.85rem',
          color: COLORS.darkGreen,
          fontWeight: '600',
          margin: 0,
        }}>
          {user.name}
        </p>
        <p style={{
          fontSize: '0.75rem',
          color: '#6b7280',
          margin: '0.2rem 0 0 0',
        }}>
          {user.email}
        </p>
      </div>
    </div>
  );
};
