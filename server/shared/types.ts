export type UserType = {
  _id: string;
  username: string;
  password: string;
  friends: string[];
  location: string;
  name: string;
  interests: string[];
  incomingFriendRequests: string[];
  sentFriendRequests: string[];
  bio: string;
  profileAvatar: string;
  setRandomAvatar: () => void;
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (userId: string) => void;
  rejectFriendRequest: (userId: string) => void;
};
