import "./LoginPage.scss";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { setUsername, setPassword, login } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const username = useSelector((state: RootState) => state.login.username);
  const password = useSelector((state: RootState) => state.login.password);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
    alert("Please fill in all fields");
    return;
    }
    dispatch(login());
    navigate("/MainPage");
  };

  return (
    <div className="login_page">
      <input
        className="log_input"
        placeholder="username"
        value={username}
        onChange={(e) => dispatch(setUsername(e.target.value))}
      />
      <input
        className="log_input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
      />
      <button className="log_button" onClick={handleLogin}>Sign in</button>
    </div>
  );
}