import { create } from "zustand";
import { LocationUpdateDto } from "@/types/LocationUpdateDto";
export type LocationStore = {
  locations: LocationUpdateDto[];
  updateLocations: (dto: LocationUpdateDto) => void;
  stopSharing: () => void;
  connected: boolean;
};

export const useLocationStore = create<LocationStore>((set) => ({
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

  stopSharing: () =>
    set({
      locations: [],
    }),
}));
