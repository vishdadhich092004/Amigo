import { useMutation } from "react-query";
import { acceptFriendRequest } from "../../api-clients";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface AcceptFriendRequestProps {
  userId: string;
  onAcceptSuccess?: () => void;
  className?: string;
}

function AcceptFriendRequest({
  userId,
  onAcceptSuccess,
  className = "",
}: AcceptFriendRequestProps) {
  const { refetchUser } = useAuthContext();
  const { toast } = useToast();

  const acceptMutation = useMutation(
    async () => {
      if (!userId?.trim()) {
        throw new Error("Invalid user ID");
      }
      return await acceptFriendRequest(userId);
    },
    {
      onSuccess: (data) => {
        toast({
          title: "Friend Request Accepted",
          description: data.message || "You are now friends!",
          variant: "default",
        });
        refetchUser();
        onAcceptSuccess?.();
      },
      onError: (error: Error) => {
        console.error("Friend request acceptance error:", error);
        toast({
          title: "Request Failed",
          description:
            error.message ||
            "Could not accept friend request. Please try again.",
          variant: "destructive",
        });
      },
    }
  );

  const handleAccept = () => {
    if (!userId?.trim()) {
      toast({
        title: "Error",
        description: "Invalid user ID provided",
        variant: "destructive",
      });
      return;
    }
    acceptMutation.mutate();
  };

  return (
    <Button
      onClick={handleAccept}
      variant="default"
      disabled={acceptMutation.isLoading || !userId?.trim()}
      className={`${acceptMutation.isLoading ? "opacity-70" : ""} ${className}`}
    >
      {acceptMutation.isLoading ? (
        <>
          <span className="animate-pulse">Accepting...</span>
        </>
      ) : (
        "Accept Request"
      )}
    </Button>
  );
}

export default AcceptFriendRequest;
