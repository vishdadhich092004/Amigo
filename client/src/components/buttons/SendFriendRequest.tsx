import { useMutation } from "react-query";
import { sendFriendRequest } from "../../api-clients";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

type SendFriendRequestProps = {
  userId: string;
};

function SendFriendRequest({ userId }: SendFriendRequestProps) {
  const { refetchUser } = useAuthContext();
  const { toast } = useToast();

  const sendMutation = useMutation(
    () => {
      if (!userId) {
        throw new Error("Invalid user ID");
      }
      return sendFriendRequest(userId);
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: data.message || "Friend request sent successfully",
          variant: "default",
        });
        refetchUser();
      },
      onError: (error: Error) => {
        console.error(error);
        toast({
          title: "Error",
          description: error.message || "Failed to send friend request",
          variant: "destructive",
        });
      },
    }
  );

  // Disable the button if userId is not valid
  const isValidUserId = Boolean(userId && userId.trim());

  return (
    <Button
      onClick={() => sendMutation.mutate()}
      variant="destructive"
      disabled={sendMutation.isLoading || !isValidUserId}
      className="m-3"
    >
      {sendMutation.isLoading ? "Sending..." : "Send Request"}
    </Button>
  );
}

export default SendFriendRequest;
