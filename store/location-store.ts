import { create } from "zustand";

export interface LocationUpdate {
  userId: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface LocationState {
  locations: Record<string, LocationUpdate>;
  updateLocations: (data: LocationUpdate) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  locations: {},
  updateLocations: (data) =>
    set((state) => ({
      locations: {
        ...state.locations,
        [data.userId]: data,
      },
    })),
}));
