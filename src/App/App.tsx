import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import MainPage from "../pages/MainPage/MainPage";
import LoginPage from '../pages/LoginPage/LoginPage';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/MainPage" element={isLoggedIn ? <MainPage /> : <Navigate to="/LoginPage" />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;