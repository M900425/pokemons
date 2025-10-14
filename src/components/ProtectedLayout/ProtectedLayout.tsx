import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/loginSlice";
import "./ProtectedLayout.scss";

export default function ProtectedLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/LoginPage");
  };

  return (
    <div className="layout">
      <nav className="sidebar">
        <h2 className="logo">Pokédex</h2>
        <ul>
          <li>
            <NavLink to="/MainPage" className={({ isActive }) => (isActive ? "active" : "")}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink to="/Profile" className={({ isActive }) => (isActive ? "active" : "")}>
              Profile
            </NavLink>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}