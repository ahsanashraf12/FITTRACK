import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
<<<<<<< HEAD
import { UserDashboard } from "./pages/UserDashboard";
import { UserProfile } from "./components/UserProfile"; // Import UserProfile component
=======
import { UserDashboard } from "./pages/UserDashboard"; 
import { UserProfile } from "./components/UserProfile"; // Import UserProfile from 
>>>>>>> d7b12bca8114d6bfb82c3b08f0cf7b5a0e0c9085

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

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> d7b12bca8114d6bfb82c3b08f0cf7b5a0e0c9085
