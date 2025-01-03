export type UserType = {
  _id: string;
  username: string;
  password: string;
  friends: UserType[];
  friendRequests: UserType[];
  profileAvatar: string;
  setRandomAvatar: () => void;
};
