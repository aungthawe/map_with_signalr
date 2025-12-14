"use client";

import { useLocationStore } from "@/store/location-store";

export default function ConnectionStatus() {
  const connected = useLocationStore((s) => s.connected);

  return (
    <div
      className={`flex items-center gap-2 ${
        connected ? "text-green-600" : "text-red-600"
      }`}
    >
      <div className={`h-3 w-3 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}></div>
      {connected ? "Connected" : "Disconnected"}
    </div>
  );
}
