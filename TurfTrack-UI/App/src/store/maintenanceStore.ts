import { create } from 'zustand';

export type ActivityType =
  | 'Overseeding'
  | 'Manual weed removal'
  | 'Chemical weed removal'
  | 'Watering'
  | 'Lawn mowing'
  | 'Grass feeding';

export type Season = 'Spring' | 'Summer' | 'Fall';

export type Frequency = 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Tri-weekly';

export interface MaintenanceActivity {
  id: string;
  activity: ActivityType;
  season: Season;
  frequency: Frequency;
  createdAt: string;
}

interface MaintenanceStore {
  activities: MaintenanceActivity[];
  addActivity: (activity: Omit<MaintenanceActivity, 'id' | 'createdAt'>) => void;
  updateActivity: (id: string, activity: Omit<MaintenanceActivity, 'id' | 'createdAt'>) => void;
  removeActivity: (id: string) => void;
  clearActivities: () => void;
}

export const useMaintenanceStore = create<MaintenanceStore>((set) => ({
  activities: [],
  addActivity: (activity) => {
    const newActivity: MaintenanceActivity = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ activities: [...state.activities, newActivity] }));
  },
  updateActivity: (id, activity) => {
    set((state) => ({
      activities: state.activities.map((item) =>
        item.id === id ? { ...item, ...activity } : item
      ),
    }));
  },
  removeActivity: (id) => {
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    }));
  },
  clearActivities: () => {
    set({ activities: [] });
  },
}));
