import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { registerUser } from "../api-clients";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
export interface RegisterFormData {
  username: string;
  password: string;
}

function NewUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(registerUser, {
    onSuccess: async (data) => {
      navigate("/");
      alert("User Created");
      console.log(data);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div className="flex flex-col">
      <h1>New User</h1>
      <div className="p-3 m-3">
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter a username"
              {...register("username", {
                required: "UserName is required",
                minLength: {
                  value: 3,
                  message: "Username must be atleast 3 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Username cannot exceed 16 characters",
                },
              })}
            />
            {errors.username && (
              <p className="text-sm text-black">{errors.username.message}</p>
            )}
          </div>
          <div className="mb-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter a Strong Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-sm text-black">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="p-3 m-3 bg-blue-200">
            Create User
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
