import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // Render nothing until we confirm `userInfo` state
  if (userInfo === null) {
    return null;
  }

  return <>{children}</>;
}
