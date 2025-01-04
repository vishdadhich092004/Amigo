import { useState } from "react";
import { useMutation } from "react-query";
import { searchUsers } from "../api-clients";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface SearchData {
  username: string;
}

function SearchUsers() {
  const [result, setResult] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchData>();

  const searchMutation = useMutation(
    (data: SearchData) => searchUsers(data.username),
    {
      onSuccess: (data) => {
        setResult(data); // Update state with search results
      },
      onError: (e) => {
        console.error(e);
        alert("Issue with search");
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    searchMutation.mutate(data); // Trigger mutation with form data
  });
  console.log(result);

  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <Input
        type="text"
        id="search"
        placeholder="Search.."
        {...register("username", {
          required: "Please enter something in the search box",
        })}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {errors.username && (
        <p className="text-sm text-red-600">{errors.username.message}</p>
      )}
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="ml-2"
        disabled={searchMutation.isLoading}
      >
        {searchMutation.isLoading ? (
          "Searching..."
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}

export default SearchUsers;
