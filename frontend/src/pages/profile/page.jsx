import { Router } from "react-router-dom";
import { LuLogOut, LuTimer, LuCheck, LuCircleAlert } from "react-icons/lu";
import { useLogout } from "../../helpers/helpers";
import orderServices from "../services/orders";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Profile() {
  const { getUserOrders, orderLoading, refetchOrders, ordersList } =
    orderServices();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const logout = useLogout();

  useEffect(() => {
    if (refetchOrders) {
      const orders = getUserOrders(authData?.user?._id);
    }
  }, [authData?.user?._id, refetchOrders]);

  if (orderLoading) {
    return <h1>Loading...</h1>;
  }

  console.log("ORDER LIST ->>");
  console.log(ordersList);

  return (
    <div className={styles.pageContainer}>
      <div>
        <h1>{authData?.user?.fullname}</h1>
        <h3>{authData?.user?.email}</h3>
      </div>

      <button onClick={() => logout()}>
        Logout
        <LuLogOut />
      </button>

      {ordersList.length > 0 ? (
        <div className={styles.ordersContainer}>
          {ordersList.map((order) => (
            <div key={order._id} className={styles.orderContainer}>
              {order.pickupStatus === "Pending" ? (
                <p className={`${styles.pickupStatus} ${styles.pending}`}>
                  {order.pickupStatus}
                  <LuTimer />
                </p>
              ) : null}
              {order.pickupStatus === "Completed" ? (
                <p className={`${styles.pickupStatus} ${styles.completed}`}>
                  <LuCheck />
                  {order.pickupStatus}
                </p>
              ) : null}
              {order.pickupStatus === "Canceled" ? (
                <p className={`${styles.pickupStatus} ${styles.canceled}`}>
                  <LuCircleAlert />
                  {order.pickupStatus}
                </p>
              ) : null}
              <h3>{order.pickupTime}</h3>
              {order.orderItems.map((item) => (
                <div key={item._id}>
                  <h4>{item.itemDetails[0].name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>You do not have orders yet.</div>
      )}
    </div>
  );
}
