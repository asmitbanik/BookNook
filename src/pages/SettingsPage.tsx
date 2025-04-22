import React, { useState } from "react";

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3">
          <input
            id="notifications"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="font-semibold">
            Enable Notifications
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <input
            id="emailUpdates"
            type="checkbox"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="emailUpdates" className="font-semibold">
            Receive Email Updates
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
