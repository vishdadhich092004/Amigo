import { useMutation } from "react-query";
import { acceptFriendRequest } from "../../api-clients";
import { useAuthContext } from "../../contexts/AuthContext";

function AcceptFriendRequest(userId: string) {
  const { refetchUser } = useAuthContext();
  const acceptMutation = useMutation(() => acceptFriendRequest(userId), {
    onSuccess: () => {
      alert("Friend Request Accepted");
      refetchUser();
    },
    onError: (e) => {
      console.error(e);
      alert("Issue to accept friend request");
    },
  });
  const handleSubmit = () => {
    acceptMutation.mutate();
  };
  return (
    <button onSubmit={handleSubmit} className="m-3 p-3 bg-blue-700 text-white">
      Accept
    </button>
  );
}

export default AcceptFriendRequest;
