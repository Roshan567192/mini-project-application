import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav style={{ padding: "10px", background: "#ddd" }}>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/projects">Projects</Link> |{" "}
      {!token ? (
        <>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={() => dispatch(logout())}>Logout</button>
      )}
    </nav>
  );
}

export default Navbar;
