import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ProtectedLayout from "../components/ProtectedLayout/ProtectedLayout";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to={isLoggedIn ? "/MainPage" : "/LoginPage"} />} />
      </Routes>
    </Router>
  );
}

export default App;