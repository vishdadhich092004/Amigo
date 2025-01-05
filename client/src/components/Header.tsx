import { Merge, Home, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import SearchUsers from "./SearchUsers";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import IncomingFriendRequests from "./buttons/IncomingFriendRequests";
import UserNavAvatar from "./UserNavAvatar";

const Header = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const handleSignInBtn = () => {
    navigate("/login");
  };
  const handleSignUpBtn = () => {
    navigate("/register");
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Merge className="h-6 w-6" />
            <span className="font-bold font-rubikVinyl text-2xl">Amigo</span>
          </a>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full max-w-lg">
            <SearchUsers />
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <IncomingFriendRequests />
            {isAuthenticated ? (
              <UserNavAvatar username={user?.username || "User"} />
            ) : (
              <>
                <Button onClick={handleSignInBtn} variant="secondary">
                  Sign In
                </Button>
                <Button onClick={handleSignUpBtn} variant="default">
                  Sign Up
                </Button>
              </>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
