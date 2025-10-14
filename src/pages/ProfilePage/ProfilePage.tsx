import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import "./ProfilePage.scss";

export default function ProfilePage() {
  const username = useSelector((state: RootState) => state.login.username);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-card">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Full name:</strong> aaa</p>
        <p><strong>Email:</strong> sdsd@.com</p>
      </div>
    </div>
  );
}