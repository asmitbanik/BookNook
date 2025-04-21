import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserInfo {
  name: string;
  mood: string;
  favoriteGenre: string;
  readingGoal: string;
}

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  addPoints: (points: number) => void;
  addBadge: (badge: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  const setUserInfo = (info: UserInfo) => {
    setUserInfoState(info);
  };

  const addPoints = (pointsToAdd: number) => {
    setPoints(prev => prev + pointsToAdd);
  };

  const addBadge = (badge: string) => {
    setBadges(prev => {
      if (!prev.includes(badge)) {
        return [...prev, badge];
      }
      return prev;
    });
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, addPoints, addBadge }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
