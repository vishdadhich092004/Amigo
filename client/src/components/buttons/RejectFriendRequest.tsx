import { useMutation } from "react-query";
import { rejectFriendRequest } from "../../api-clients";
import { useAuthContext } from "../../contexts/AuthContext";

function RejectFriendRequest(userId: string) {
  const { refetchUser } = useAuthContext();
  const rejectMutation = useMutation(() => rejectFriendRequest(userId), {
    onSuccess: () => {
      alert("Friend Request Rejected");
      refetchUser();
    },
    onError: (e) => {
      console.error(e);
      alert("Issue to reject friend request");
    },
  });
  const handleSubmit = () => {
    rejectMutation.mutate();
  };
  return (
    <button onSubmit={handleSubmit} className="m-3 p-3 bg-red-700 text-white">
      Reject
    </button>
  );
}

export default RejectFriendRequest;
