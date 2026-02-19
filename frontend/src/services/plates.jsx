import { useState } from "react";

export default function platesServices() {
  const [platesLoading, setPlatesLoading] = useState(false);
  const [refetchPlates, setRefetchPlates] = useState(true);
  const [platesList, setPlatesList] = useState([]);

  const url = "http://localhost:3000/plates";

  const getAvailablePlates = () => {
    setPlatesLoading(true);
    fetch(`${url}/availables`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setPlatesList(result.body);
        } else {
          console.log("Result but no success");
          console.log(result);
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      })
      .finally(() => {
        setRefetchPlates(false);
        setPlatesLoading(false);
      });
  };

  return { getAvailablePlates, setPlatesLoading, refetchPlates, platesList };
}
