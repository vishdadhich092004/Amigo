import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewUser from "./pages/NewUser";
import LoginUser from "./pages/LoginUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<NewUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
