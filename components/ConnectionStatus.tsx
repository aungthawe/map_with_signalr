"use client";

import { useLocationStore } from "@/store/location-store";

export default function ConnectionStatus() {
  const connected = useLocationStore((s) => s.connected);

  return (
    <div className="flex items-center gap-2 text-green-600">
      <div className="h-3 w-3 rounded-full bg-green-500"></div>
      <span className="font-medium">Connected</span>
    </div>
  );
}
