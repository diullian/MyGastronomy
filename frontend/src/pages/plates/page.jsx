import PlateCard from "../../components/plateCard/plateCard";
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
  return (
    <>
      <div>
        {platesList.length > 0 ? (
          platesList.map((plate) => (
            <PlateCard key={plate._id} plateData={plate} />
          ))
        ) : (
          <p>No plates available at the moment.</p>
        )}
      </div>
    </>
  );
}
