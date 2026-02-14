import { Router } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useLogout } from "../../helpers/helpers";

export default function Profile() {
  const authData = JSON.parse(localStorage.getItem("auth"));
  const logout = useLogout();

  return (
    <>
      <h1>{authData?.user?.fullname}</h1>
      <h1>{authData?.user?.email}</h1>
      <button
        onClick={() => {
          logout();
        }}
      >
        <LuLogOut></LuLogOut>
      </button>
    </>
  );
}
