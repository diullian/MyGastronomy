import { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "./page.module.css";
import authServices from "../services/auth";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState(null);
  const { login, signup, authLoading } = authServices();

  const handleChangeFormType = () => {
    setFormData(null);
    if (formType === "login") {
      setFormType("signup");
    } else {
      setFormType("login");
    }
  };

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("->>>> SUBMIT <<<<-");
    console.log(formData);

    switch (formType) {
      case "login":
        login(formData);
        break;
      case "signup":
        if (formData.password !== formData.confirmPassword) {
          console.log("Passwords do not match ");
          return;
        }
        signup(formData);
        break;
    }
  };

  if (authLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (formType === "login") {
    return (
      <div className={styles.authPageContainer}>
        <h1>Login</h1>
        <button onClick={handleChangeFormType}>
          Don't you have an account? Click here
        </button>
        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            label="E-mail"
            type="email"
            name="email"
            onChange={handleFormDataChange}
          ></TextField>
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            onChange={handleFormDataChange}
          ></TextField>

          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }

  if (formType === "signup") {
    return (
      <>
        <h1>Sign up</h1>
        <button onClick={handleChangeFormType}>
          Alread have an account? Click here
        </button>

        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            label="Fullname"
            type="fullname"
            name="fullname"
            onChange={handleFormDataChange}
          ></TextField>
          <TextField
            required
            label="E-mail"
            type="email"
            name="email"
            onChange={handleFormDataChange}
          ></TextField>
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            onChange={handleFormDataChange}
          ></TextField>
          <TextField
            required
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            onChange={handleFormDataChange}
          ></TextField>
          <Button type="submit">Signup</Button>
        </form>
      </>
    );
  }
}
