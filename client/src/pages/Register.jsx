import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Import the toast library
import { Navbar } from "../components/Navbar";
import { v4 as uuidv4 } from 'uuid'; // Import only the v4 function from uuid

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const URL = `http://localhost:5001/api/user/register`;

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = uuidv4();

      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...user,
          userId: userId,
        }),
      });

      const res_data = await response.json();

      if (response.ok) {
        setUser({
          username: '',
          password: '',
          name: '',
          email: '',
          userId: res_data.userId,
        });

        toast.success('Registration successful');
        navigate('/login');
      } else {
        if (res_data.errors) {
          res_data.errors.forEach((error) => {
            toast.error(error.msg);
          });
        } else {
          toast.error(
            res_data.message ? res_data.message : 'Registration failed. Please try again.'
          );
        }
      }
    } catch (error) {
      console.log('register ', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a href="./index.html" className="text-nowrap logo-img text-center d-block py-3 w-100">
                      <img src="../assets/images/logos/dark-logo.svg" width="180" alt="" />
                    </a>
                    <p className="text-center">Fittrack - We Care About Your Fitness</p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="exampleInputtext1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="textHelp"
                          name="name" required autoComplete="off" value={user.name} onChange={handleInput} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputtext1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="textHelp"
                          name="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          name="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <div className="input-group">
                          <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" name="password" required
                            autoComplete="off" value={user.password} onChange={handleInput} />
                          <button type="button" className="btn btn-outline-secondary" onClick={handleTogglePassword}>
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign Up</button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">Already have an Account?</p>
                        <NavLink to="/login"> <a className="text-primary fw-bold ms-2">Sign In</a> </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
