import React, { useState } from 'react';
import { LawnMaintenanceForm } from './LawnMaintenanceForm';
import { MaintenanceList } from './MaintenanceList';
import { Logout } from './Logout';
import { UserProfile } from './UserProfile';
import { useMaintenanceStore } from '../store/maintenanceStore';
import type { MaintenanceActivity } from '../store/maintenanceStore';

const COLORS = {
  white: '#ffffff',
  lightGreen: '#f1f8f5',
  accentGreen: '#81c784',
  darkGreen: '#2d7a5f',
};

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [editingActivity, setEditingActivity] = useState<MaintenanceActivity | null>(null);
  const activities = useMaintenanceStore((state) => state.activities);
  const showForm = activities.length === 0 || editingActivity !== null;

  const handleAddClick = () => {
    setEditingActivity(null);
  };

  const handleEditClick = (activity: MaintenanceActivity) => {
    setEditingActivity(activity);
  };

  const handleEditComplete = () => {
    setEditingActivity(null);
  };

  return (
  <div style={{
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${COLORS.lightGreen} 0%, ${COLORS.white} 100%)`,
    padding: '2rem',
  }}>
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          color: COLORS.darkGreen,
          margin: 0,
        }}>
          Lawn Maintenance Dashboard
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <UserProfile />
          <Logout onLogout={onLogout} />
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: showForm ? '1fr 1fr' : '1fr',
        gap: '2rem',
      }}>
        {showForm && (
          <div style={{
            background: COLORS.white,
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 12px rgba(45, 122, 95, 0.08)',
            border: `1px solid rgba(129, 199, 132, 0.15)`,
          }}>
            <LawnMaintenanceForm editingActivity={editingActivity} onEditComplete={handleEditComplete} />
          </div>
        )}
        {activities.length > 0 && (
          <div style={{
            background: COLORS.white,
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 2px 12px rgba(45, 122, 95, 0.08)',
            border: `1px solid rgba(129, 199, 132, 0.15)`,
          }}>
            <MaintenanceList onAddClick={handleAddClick} onEditClick={handleEditClick} />
          </div>
        )}
      </div>
    </div>
  </div>
  );
};
