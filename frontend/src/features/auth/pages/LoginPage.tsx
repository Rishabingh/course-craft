import { useEffect } from "react";
import LoginCard from "../components/LoginCard";
import { useTokenStore } from "../../../store";

export default function LoginPage() {
//const accessToken = useTokenStore((state) => state.accessToken);
const setToken = useTokenStore((state) => state.setToken);

useEffect(() => {
  setToken('hello555');
}, [setToken])
  return (
    <div>
      <LoginCard />
    </div>
  )
}
