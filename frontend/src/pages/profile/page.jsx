import { Router } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
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
    console.log("ENTREI" + authData?.user?._id);

    if (refetchOrders) {
      const orders = getUserOrders(authData?.user?._id);
      console.log("ORDENS");
      console.log(orders);
    }
  }, [authData?.user?._id, refetchOrders]);

  if (orderLoading) {
    return <h1>Loading...</h1>;
  }

  console.log("ORDER LIST ->>");
  console.log(ordersList);

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
      <div className={styles.orderContainer}>
        {ordersList && ordersList?.length > 0 ? (
          <div>
            {ordersList.map((order) => {
              return (
                <div key={order._id}>
                  <h2>Pedido: {order._id}</h2>
                  <p>Data: {new Date(order.createdAt).toLocaleDateString()}</p>

                  <h3>Items do pedido</h3>
                  <ul>
                    {order.orderItems?.itemDetails.map((details, index) => (
                      <li key={index}>
                        <p>Prato: {details.name}</p>
                        <p>Description: {details.description}</p>
                        <img src={details.imgUrl} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>Sem pedidos encontrados</h1>
        )}
      </div>
    </>
  );
}
