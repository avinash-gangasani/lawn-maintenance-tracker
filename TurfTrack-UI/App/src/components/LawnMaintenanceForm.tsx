import { useState, useEffect } from 'react';
import { useMaintenanceStore } from '../store/maintenanceStore';
import type { ActivityType, Season, Frequency, MaintenanceActivity } from '../store/maintenanceStore';

const COLORS = {
  white: '#ffffff',
  lightGreen: '#f1f8f5',
  accentGreen: '#81c784',
  darkGreen: '#2d7a5f',
  borderLight: '#e0e7e1',
  textGray: '#4a5568',
  error: '#d32f2f',
};

const ACTIVITY_OPTIONS: ActivityType[] = [
  'Overseeding',
  'Manual weed removal',
  'Chemical weed removal',
  'Watering',
  'Lawn mowing',
  'Grass feeding',
];

const SEASON_OPTIONS: Season[] = ['Spring', 'Summer', 'Fall'];

const FREQUENCY_OPTIONS: Frequency[] = ['Daily', 'Weekly', 'Bi-Weekly', 'Tri-weekly'];

interface LawnMaintenanceFormProps {
  editingActivity?: MaintenanceActivity | null;
  onEditComplete?: () => void;
}

export const LawnMaintenanceForm = ({ editingActivity, onEditComplete }: LawnMaintenanceFormProps) => {
  const [activity, setActivity] = useState<ActivityType>('Overseeding');
  const [season, setSeason] = useState<Season>('Spring');
  const [frequency, setFrequency] = useState<Frequency>('Weekly');
  const [error, setError] = useState<string>('');
  const { activities, addActivity, updateActivity } = useMaintenanceStore();

  // Load data if editing
  useEffect(() => {
    if (editingActivity) {
      setActivity(editingActivity.activity);
      setSeason(editingActivity.season);
      setFrequency(editingActivity.frequency);
      setError('');
    } else {
      resetForm();
    }
  }, [editingActivity]);

  const resetForm = () => {
    setActivity('Overseeding');
    setSeason('Spring');
    setFrequency('Weekly');
    setError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingActivity) {
      // Check for duplicates excluding the current activity
      const isDuplicate = activities.some(
        (item) =>
          item.id !== editingActivity.id &&
          item.activity === activity &&
          item.season === season
      );

      if (isDuplicate) {
        setError('This activity and season combination already exists. Please choose a different combination.');
        return;
      }

      updateActivity(editingActivity.id, { activity, season, frequency });
      setError('');
      resetForm();
      if (onEditComplete) {
        onEditComplete();
      }
    } else {
      // Add new activity
      const isDuplicate = activities.some(
        (item) => item.activity === activity && item.season === season,
      );

      if (isDuplicate) {
        setError('This activity and season combination already exists. Please choose a different combination.');
        return;
      }

      addActivity({ activity, season, frequency });
      setError('');
      resetForm();
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: COLORS.darkGreen, marginBottom: '1.5rem', margin: 0 }}>
        {editingActivity ? 'Edit Activity' : 'Add New Activity'}
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label style={{ display: 'block' }}>
          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: COLORS.darkGreen, marginBottom: '0.5rem' }}>Activity</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as ActivityType)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: `1px solid ${COLORS.borderLight}`,
              backgroundColor: COLORS.white,
              color: COLORS.textGray,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            {ACTIVITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: COLORS.darkGreen, marginBottom: '0.5rem' }}>Season</span>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as Season)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: `1px solid ${COLORS.borderLight}`,
              backgroundColor: COLORS.white,
              color: COLORS.textGray,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            {SEASON_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'block' }}>
          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: COLORS.darkGreen, marginBottom: '0.5rem' }}>Frequency</span>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Frequency)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: `1px solid ${COLORS.borderLight}`,
              backgroundColor: COLORS.white,
              color: COLORS.textGray,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            {FREQUENCY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {error && (
          <div style={{ color: COLORS.error, fontSize: '0.9rem', padding: '0.75rem', backgroundColor: 'rgba(211, 47, 47, 0.05)', borderRadius: '0.5rem', border: `1px solid rgba(211, 47, 47, 0.1)` }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            padding: '0.9rem 1.2rem',
            background: COLORS.accentGreen,
            color: COLORS.white,
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'background-color 0.2s',
            marginTop: '0.5rem',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#66bb6a';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = COLORS.accentGreen;
          }}
        >
          {editingActivity ? 'Update Activity' : 'Save Activity'}
        </button>
      </form>
    </div>
  );
};
