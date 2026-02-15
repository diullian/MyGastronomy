import { useState } from "react";

export default function orderServices() {
  const [orderLoading, setorderLoading] = useState(false);
  const [refetchOrders, setRefetchOrders] = useState(true);
  const [ordersData, setOrdersData] = useState(null);

  const url = "http://localhost:3000/orders";

  const getUserOrders = (userId) => {
    setorderLoading(true);
    fetch(`${url}/userorders/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {})
      .catch((error) => {
        console.log("Error");
        console.log(error);
      })
      .finally(() => {
        setRefetchOrders(false);
        setorderLoading(false);
      });
  };

  return { getUserOrders, orderLoading, refetchOrders };
}
