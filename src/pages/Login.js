// // src/pages/Login.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Auth.css";

// const Login = ({ setUser }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/users/login", formData);

//       const loggedInUser = response.data;

//       localStorage.setItem("user", JSON.stringify(loggedInUser));
//       setUser(loggedInUser);

//       // ✅ FIXED ROLE CHECK (uppercase)
//       if (loggedInUser.role === "ADMIN") {
//         navigate("/adminhome");
//       } else if (loggedInUser.role === "USER") {
//         navigate("/userhome");
//       } else {
//         alert("Unknown role!");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Invalid credentials! Please try again.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>
//         <p className="text-center mt-2">
//           Don't have an account? <span onClick={() => navigate("/register")} className="link">Register</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);

      if (res.data.user.role === "ADMIN") {
        navigate("/adminhome");
      } else {
        navigate("/userhome");
      }
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-3">Login</h3>
      <form onSubmit={submit} className="card p-4 shadow">
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
