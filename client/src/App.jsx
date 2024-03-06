import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserDashboard } from "./pages/UserDashboard"; 
import { UserProfile } from "./components/UserProfile"; // Import UserProfile from 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          {/* Route for UserProfile with userId parameter */}
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
