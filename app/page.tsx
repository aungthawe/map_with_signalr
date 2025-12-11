"use client";

import RealtimeMap from "@/components/RealtimeMap";
import ActiveUsersPanel from "@/components/ActiveUsersPanel";
import ConnectionStatus from "@/components/ConnectionStatus";
import NameChecker from "@/components/NameChecker";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-cyan-100">
      <NameChecker />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-blue-700">Location Tracker</h1>
          <p className="text-gray-600">Real-time location sharing</p>
        </div>

        <ConnectionStatus />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <ActiveUsersPanel />
        </div>

        <div className="col-span-8">
          <RealtimeMap />
        </div>
      </div>
    </div>
  );
}
