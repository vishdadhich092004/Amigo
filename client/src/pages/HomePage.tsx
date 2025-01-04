import { Link } from "react-router-dom";
import SearchUsers from "../components/SearchUsers";
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <div className="w-50 p-3 m-3">
        <SearchUsers />
      </div>
      <div className="m-2 p-2">
        <Link to="/register" className="p-3 m-3 bg-yellow-300">
          New User
        </Link>
      </div>
      <div className="m-2 p-2">
        <Link to="/login" className="p-3 m-3 bg-yellow-300">
          Existing User
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
