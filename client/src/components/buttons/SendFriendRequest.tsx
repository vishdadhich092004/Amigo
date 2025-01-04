import { useMutation } from "react-query";
import { sendFriendRequest } from "../../api-clients";
import { useAuthContext } from "../../contexts/AuthContext";

function SendFriendRequest(userId: string) {
  const { refetchUser } = useAuthContext();
  const sendMutation = useMutation(() => sendFriendRequest(userId), {
    onSuccess: () => {
      alert("Friend Request Sent");
      refetchUser();
    },
    onError: (e) => {
      console.error(e);
      alert("Issue in sending friend request");
    },
  });
  const handleSubmit = () => {
    sendMutation.mutate();
  };
  return (
    <button
      onSubmit={handleSubmit}
      className="m-3 p-3 bg-yellow-700 text-white"
    >
      Send
    </button>
  );
}

export default SendFriendRequest;
