import { create } from "zustand";
import { LocationUpdateDto } from "@/types/LocationUpdateDto";
export type LocationStore = {
  name: string;
  setName: (name: string) => void;
  locations: LocationUpdateDto[];
  updateLocations: (dto: LocationUpdateDto) => void;
  sharing: boolean;
  setSharing: (sharing: boolean) => void;
  connected: boolean;
  clearLocations: () => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  name: "",
  setName: (name: string) => set({ name }),
  sharing: true,
  locations: [],
  connected: true,
  updateLocations: (dto: LocationUpdateDto) =>
    set((state: any) => {
      const existing = state.locations.find(
        (x: any) => x.userId === dto.userId
      );

      if (existing) {
        return {
          locations: state.locations.map((u: any) =>
            u.userId === dto.userId ? dto : u
          ),
        };
      }

      return { locations: [...state.locations, dto] };
    }),
  setSharing: (sharing: boolean) => set({ sharing }),
  clearLocations: () =>
    set((state) => ({
      connected: !state.connected,
      locations: state.locations.filter(
        (x) => !x.userId.startsWith(state.name)
      ),
    })),
}));
