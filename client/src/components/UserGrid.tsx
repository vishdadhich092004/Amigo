import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, RssIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserType } from "../../../server/shared/types";
import { fetchUsers } from "@/api-clients";
import { useAuthContext } from "@/contexts/AuthContext";
import SendFriendRequest from "./buttons/SendFriendRequest";

const UserGrid = () => {
  const { isAuthenticated, user } = useAuthContext();
  const [users, setUsers] = useState<UserType[] | null>(null);

  useEffect(() => {
    async function loadfetchedUsers() {
      const data = await fetchUsers();
      setUsers(data);
    }
    loadfetchedUsers();
  }, [user]);

  if (!users) {
    return <h1>No User Found</h1>;
  }
  return (
    <div className="container py-8">
      <h2 className="text-3xl font-bold mb-6">Suggested Connections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((fetchedUser) => (
          <Card key={fetchedUser._id} className="flex flex-col">
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={fetchedUser.profileAvatar}
                    alt={fetchedUser.name}
                  />
                  <AvatarFallback>
                    {fetchedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {isAuthenticated &&
                  !user?.friends.includes(fetchedUser._id) &&
                  !user?.sentFriendRequests.includes(fetchedUser._id) && (
                    <SendFriendRequest userId={fetchedUser._id} />
                  )}
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{fetchedUser.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {fetchedUser.username}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground">{fetchedUser.bio}</p>

              <div className="flex items-center text-sm text-muted-foreground">
                <span>{fetchedUser.location}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {fetchedUser.interests.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4">
              <div className="flex justify-between items-center w-full text-sm">
                <div className="flex items-center gap-1">
                  <RssIcon className="h-4 w-4" />
                  <span>{fetchedUser.friends.length} followers</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
