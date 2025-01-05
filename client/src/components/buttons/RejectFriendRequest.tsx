import { useMutation } from "react-query";
import { rejectFriendRequest } from "../../api-clients";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

type RejectFriendRequestProps = {
  userId: string;
};
function RejectFriendRequest({ userId }: RejectFriendRequestProps) {
  const { refetchUser } = useAuthContext();
  const { toast } = useToast();

  const rejectMutation = useMutation(
    () => {
      if (!userId) {
        throw new Error("Invalid user ID");
      }
      return rejectFriendRequest(userId);
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: data.message || "Friend request rejected",
          variant: "default",
        });
        refetchUser();
      },
      onError: (error: Error) => {
        console.error(error);
        toast({
          title: "Error",
          description: error.message || "Failed to reject friend request",
          variant: "destructive",
        });
      },
    }
  );
  const isValidUserId = Boolean(userId && userId.trim());
  return (
    <Button
      onClick={() => rejectMutation.mutate()}
      variant="destructive"
      disabled={rejectMutation.isLoading || !isValidUserId}
      className="m-3"
    >
      {rejectMutation.isLoading ? "Rejecting..." : "Reject Request"}
    </Button>
  );
}

export default RejectFriendRequest;
