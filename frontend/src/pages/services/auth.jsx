import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function authServices() {
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  const url = "http://localhost:3000/auth";
  const login = (formData) => {
    setAuthLoading(true);
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Result");
        console.log(result);

        if (result.success && result.body.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.body.token,
              user: result.body.user,
            }),
          );

          navigate("/profile", { replace: true });
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const logout = () => {};

  const signup = (formData) => {
    // console.log("VAMOS REGISTRAR");
    // console.log(formData);
    // console.log("--");
    // console.log(JSON.stringify(formData));

    setAuthLoading(true);
    fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Result");
        console.log(result);

        if (result.success && result.body.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: result.body.token,
              user: result.body.user,
            }),
          );
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  return { signup, login, logout, authLoading };
}
