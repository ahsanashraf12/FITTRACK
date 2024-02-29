import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Register } from "./Register";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const URL = `http://localhost:5001/api/auth/login`;

  // Define the function to store the token in localStorage
  const storeTokenInLS = (token) => {
    localStorage.setItem("token", token);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      console.log("login form", response);
  
      const res_data = await response.json();
  
      if (response.status === 200) { // Check for 200 status code
        // Call the function to store the token
        storeTokenInLS(res_data.token);
  
        setUser({ username: "", password: "" });
        toast.success("Login successful");
        navigate("/");
      } else if (response.status === 401) { // Check for 401 status code
        toast.error(
            res_data.extraDetails || res_data.message || "Invalid credentials"
        );
        console.log("invalid credential");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
      data-sidebar-position="fixed" data-header-position="fixed">
      <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div class="d-flex align-items-center justify-content-center w-100">
          <div class="row justify-content-center w-100">
            <div class="col-md-8 col-lg-6 col-xxl-3">
              <div class="card mb-0">
                <div class="card-body">
                  {/* <a class="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
                  </a> */}
                  <p className="text-center">Fittrack - We Care About Your Fitness</p>
                  <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Username</label>
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        name="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                    </div>
                    <div class="mb-4">
                      <label for="exampleInputPassword1" class="form-label">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" name="password" required
                        autoComplete="off" value={user.password} onChange={handleInput} />
                    </div>
                    <div class="d-flex align-items-center justify-content-between mb-4">
                      <div class="form-check">
                        <input class="form-check-input primary" type="checkbox" value="" id="flexCheckChecked" checked />
                        <label class="form-check-label text-dark" for="flexCheckChecked">
                          Remember this Device
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</button>
                    <div class="d-flex align-items-center justify-content-center">
                      <p class="fs-4 mb-0 fw-bold">New to Fittrack?</p>
                      <NavLink to="/register"> <a class="text-primary fw-bold ms-2">Create an account</a> </NavLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};