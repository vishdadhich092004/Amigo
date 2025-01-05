import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { incomingFriendRequests } from "@/api-clients";
import { UserType } from "../../../../server/shared/types";
import AcceptFriendRequest from "./AcceptFriendRequest";
import RejectFriendRequest from "./RejectFriendRequest";
import { useAuthContext } from "@/contexts/AuthContext";

const IncomingFriendRequests = () => {
  const { refetchUser } = useAuthContext();
  const [friendRequests, setFriendRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchFriendRequests = async () => {
      const data = await incomingFriendRequests();
      setFriendRequests(data);
      setIsLoading(false);
    };
    fetchFriendRequests();
  }, []);

  console.log(friendRequests);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {friendRequests.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
              {friendRequests.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        {isLoading ? (
          <DropdownMenuItem className="text-center">
            Loading...
          </DropdownMenuItem>
        ) : friendRequests.length === 0 ? (
          <DropdownMenuItem className="text-center text-muted-foreground">
            No friend requests
          </DropdownMenuItem>
        ) : (
          friendRequests.map((request: UserType) => (
            <DropdownMenuItem key={request._id} className="p-0">
              <Card className="w-full p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {request.profileAvatar && (
                      <div
                        className="h-8 w-8 rounded-full overflow-hidden"
                        dangerouslySetInnerHTML={{
                          __html: request.profileAvatar,
                        }}
                      />
                    )}
                    <div>
                      <p className="font-medium">{request.username}</p>
                      {request.name && (
                        <p className="text-sm text-muted-foreground">
                          {request.name}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <AcceptFriendRequest
                      userId={request._id}
                      onAcceptSuccess={() => {
                        refetchUser();
                      }}
                      className="my-2"
                    />
                    <RejectFriendRequest userId={request._id} />
                  </div>
                </div>
              </Card>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IncomingFriendRequests;
