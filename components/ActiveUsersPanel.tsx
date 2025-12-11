"use client";

import { useLocationStore } from "@/store/location-store";

export default function ActiveUsersPanel() {
  const users = useLocationStore((s) => s.locations);
  const stopSharing = useLocationStore((s) => s.stopSharing);

  return (
    <div className="bg-white/70 rounded-xl shadow-xl p-6 backdrop-blur-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Active Users
        </h2>

        <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
          {users.length}
        </div>
      </div>

      <button
        onClick={stopSharing}
        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg mb-4"
      >
        Stop Sharing
      </button>

      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {users.map((u: any) => (
          <div
            key={u.userId}
            className="p-3 border rounded-lg bg-white flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
              {u.userId[0].toUpperCase()}
            </div>

            <div>
              <p className="font-medium">
                {u.userId === "Me" ? "aung thawe (You)" : u.userId}
              </p>
              <p className="text-xs text-gray-500">
                {u.latitude.toFixed(4)}, {u.longitude.toFixed(4)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
