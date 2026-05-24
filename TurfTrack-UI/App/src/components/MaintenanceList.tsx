import { useMaintenanceStore } from '../store/maintenanceStore';
import type { MaintenanceActivity } from '../store/maintenanceStore';

const COLORS = {
  white: '#ffffff',
  lightGreen: '#f1f8f5',
  accentGreen: '#81c784',
  darkGreen: '#2d7a5f',
  borderLight: '#e0e7e1',
  textDark: '#2d3748',
  textGray: '#4a5568',
  error: '#d32f2f',
};

interface MaintenanceListProps {
  onAddClick: () => void;
  onEditClick: (activity: MaintenanceActivity) => void;
}

export const MaintenanceList = ({ onAddClick, onEditClick }: MaintenanceListProps) => {
  const { activities, removeActivity, clearActivities } = useMaintenanceStore();

  return (
    <section style={{ margin: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: COLORS.darkGreen, margin: 0 }}>Saved Activities</h2>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onAddClick}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: COLORS.accentGreen,
              color: COLORS.white,
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#66bb6a';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = COLORS.accentGreen;
            }}
          >
            + Add Activity
          </button>
          {activities.length > 0 && (
            <button
              type="button"
              onClick={clearActivities}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${COLORS.borderLight}`,
                background: COLORS.white,
                color: COLORS.textGray,
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = COLORS.lightGreen;
                (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.accentGreen;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = COLORS.white;
                (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.borderLight;
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {activities.length === 0 ? (
        <p style={{ color: COLORS.textGray, marginTop: '1rem', fontStyle: 'italic' }}>No maintenance activities added yet.</p>
      ) : (
        <div style={{ width: '100%', overflowX: 'auto', marginTop: '1rem' }}>
          <table
            style={{
              width: '100%',
              minWidth: 520,
              borderCollapse: 'collapse',
              background: COLORS.white,
            }}
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.9rem 1rem', borderBottom: `2px solid ${COLORS.borderLight}`, whiteSpace: 'nowrap', color: COLORS.darkGreen, fontWeight: '600', fontSize: '0.9rem' }}>
                  Activity
                </th>
                <th style={{ textAlign: 'left', padding: '0.9rem 1rem', borderBottom: `2px solid ${COLORS.borderLight}`, whiteSpace: 'nowrap', color: COLORS.darkGreen, fontWeight: '600', fontSize: '0.9rem' }}>
                  Season
                </th>
                <th style={{ textAlign: 'left', padding: '0.9rem 1rem', borderBottom: `2px solid ${COLORS.borderLight}`, whiteSpace: 'nowrap', color: COLORS.darkGreen, fontWeight: '600', fontSize: '0.9rem' }}>
                  Frequency
                </th>
                <th style={{ textAlign: 'left', padding: '0.9rem 1rem', borderBottom: `2px solid ${COLORS.borderLight}`, color: COLORS.darkGreen, fontWeight: '600', fontSize: '0.9rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item) => (
                <tr key={item.id} style={{ borderBottom: `1px solid ${COLORS.borderLight}`, transition: 'background-color 0.2s' }} onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor = COLORS.lightGreen;
                }} onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
                }}>
                  <td style={{ padding: '0.9rem 1rem', color: COLORS.textDark, fontWeight: '500' }}>{item.activity}</td>
                  <td style={{ padding: '0.9rem 1rem', color: COLORS.textGray }}>{item.season}</td>
                  <td style={{ padding: '0.9rem 1rem', color: COLORS.textGray }}>{item.frequency}</td>
                  <td style={{ padding: '0.9rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => onEditClick(item)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          background: COLORS.accentGreen,
                          color: COLORS.white,
                          border: 'none',
                          borderRadius: '0.4rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeActivity(item.id)}
                        style={{
                          padding: '0.5rem 0.85rem',
                          background: COLORS.error,
                          color: COLORS.white,
                          border: 'none',
                          borderRadius: '0.4rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
