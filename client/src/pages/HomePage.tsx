import SearchUsers from "../components/SearchUsers";
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <div className="w-50 p-3 m-3">
        <SearchUsers />
      </div>
    </div>
  );
}

export default HomePage;
