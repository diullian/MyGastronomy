import { Router } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useLogout } from "../../helpers/helpers";
import orderServices from "../services/orders";
import { useEffect } from "react";

export default function Profile() {
  const { getUserOrders, orderLoading, refetchOrders } = orderServices();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const logout = useLogout();

  useEffect(() => {
    console.log("ENTREI" + authData?.user?._id);

    if (refetchOrders) {
      const orders = getUserOrders(authData?.user?._id);
      console.log("ORDENS");
      console.log(orders);
    }
  }, [authData?.user?._id, refetchOrders]);

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
      <div></div>
    </>
  );
}
