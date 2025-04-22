import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const ProfilePage: React.FC = () => {
  const { userInfo, setUserInfo } = useUser();
  const [name, setName] = useState(userInfo?.name || "");

  useEffect(() => {
    setName(userInfo?.name || "");
  }, [userInfo]);

  const handleSave = () => {
    setUserInfo && setUserInfo({ ...userInfo, name } as any);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="block font-semibold mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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

export default ProfilePage;
