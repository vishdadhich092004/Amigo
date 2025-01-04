export type UserType = {
  _id: string;
  username: string;
  password: string;
  friends: string[];
  friendRequests: string[];
  profileAvatar: string;
  setRandomAvatar: () => void;
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (userId: string) => void;
  rejectFriendRequest: (userId: string) => void;
};
