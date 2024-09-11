import React from "react";
import CustomRoutes from "./routes";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <>
    <ul className="bg-green-500 p-5 flex justify-center space-x-6">
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/about'}>About</NavLink>
      </li>
    </ul>
      <CustomRoutes />
    </>
  );
}

export default App;
