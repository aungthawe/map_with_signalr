import React, { useEffect, useState } from "react";
import { useLocationStore } from "@/store/location-store";

const NameChecker = () => {
  const { name } = useLocationStore((s) => s);
  const setName = useLocationStore((s) => s.setName);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    if (!name) {
      setDialogVisible(true);
    }
  }, [name]);

  const handleNameSubmit = () => {
    setName(inputName);
    setDialogVisible(false);
  };

  return (
    <div>
      {dialogVisible && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 backdrop-filter backdrop-blur-xl z-50">
          <div className="bg-white/50 rounded-xl p-6 shadow-lg space-y-4">
            <h2 className="text-lg text-gray-700 font-semibold">
              Please enter your name:
            </h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleNameSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Submit
              </button>
              {/* <button
                onClick={() => setDialogVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-300"
              >
                Cancel
              </button> */}
            </div>
          </div>
        </div>
      )}
      {name && (
        <h1 className="text-2xl font-bold mt-4 text-gray-700">
          Welcome, {name} !
        </h1>
      )}
    </div>
  );
};

export default NameChecker;
