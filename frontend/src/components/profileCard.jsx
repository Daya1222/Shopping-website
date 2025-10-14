import { useNavigate } from "react-router-dom";

function ProfileCard() {
  const navigate = useNavigate(null);

  return (
    <div className="" onClick={() => navigate("/profile")}>
      this is profile card
    </div>
  );
}

export default ProfileCard;
