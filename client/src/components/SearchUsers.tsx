import { useState } from "react";
import { useMutation } from "react-query";
import { searchUsers } from "../api-clients"; // Ensure this is correctly implemented
import { useForm } from "react-hook-form";
import { UserType } from "../../../server/shared/types";

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
        console.log(data);
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

  return (
    <div className="flex flex-col mb-3">
      <h1 className="text-xl font-bold mb-4">Search User</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="mb-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search for a username"
            {...register("username", {
              required: "Please enter something in the search box",
            })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500"
          disabled={searchMutation.isLoading}
        >
          {searchMutation.isLoading ? "Searching..." : "Search User"}
        </button>
      </form>

      {result.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Search Results:</h2>
          <ul className="space-y-2">
            {result.map((user: UserType) => (
              <li
                key={user._id}
                className="flex items-center p-2 border rounded-lg hover:bg-gray-100"
              >
                <img
                  src={user.profileAvatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.length === 0 && !searchMutation.isLoading && (
        <p className="mt-4 text-gray-600">No users found.</p>
      )}
    </div>
  );
}

export default SearchUsers;
