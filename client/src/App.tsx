import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewUser from "./pages/NewUser";
import LoginUser from "./pages/LoginUser";
import Layout from "./layouts/Layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <NewUser />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <LoginUser />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
