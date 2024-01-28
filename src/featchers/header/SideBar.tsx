import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <NavLink to="/">Todolists</NavLink>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
};
