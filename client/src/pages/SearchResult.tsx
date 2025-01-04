import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserType } from "../../../server/shared/types";

interface SearchResultsProps {
  results: UserType[];
  isLoading: boolean;
}

export function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="absolute top-full mt-2 w-full bg-background rounded-md border shadow-lg p-2">
        <p className="text-sm text-muted-foreground p-2">Searching...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  console.log(results);
  return (
    <div className="absolute top-full mt-2 w-full bg-background rounded-md border shadow-lg p-2">
      <ul className="space-y-2">
        {results ? (
          results.map((user) => (
            <li
              key={user._id}
              className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.username}</span>
            </li>
          ))
        ) : (
          <span className="text-sm font-medium">No User Exists</span>
        )}
      </ul>
    </div>
  );
}
