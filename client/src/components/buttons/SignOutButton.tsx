import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { signOut } from "../../api-clients";
import { Button } from "../ui/button";
interface SignOutButtonProps {
  onClick?: () => void; // Optional prop to close dropdown
  className?: string;
  children?: React.ReactNode;
}

const SignOutButton = ({ className, children }: SignOutButtonProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validate-token");
      queryClient.setQueryData("validate-token", null);
      navigate("/");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Button onClick={handleClick} variant="default">
      {children || <LogOut className="w-4 h-4 mr-3 text-white" />}
    </Button>
  );
};

export default SignOutButton;
