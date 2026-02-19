import platesServices from "../../services/plates";
import { useEffect } from "react";

export default function Plates() {
  const { getAvailablePlates, platesList, platesLoading, refetchPlates } =
    platesServices();

  useEffect(() => {
    if (refetchPlates) {
      getAvailablePlates();
    }
  });

  if (platesLoading) {
    return <Loading></Loading>;
  }

  console.log("PLATES");
  console.log(platesList);
  return <h1>Plates</h1>;
}
