import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewUser from "./pages/NewUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<NewUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
