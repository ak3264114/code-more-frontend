import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import APIService from "../APIService";
import { DataContext } from "../Context/DataContext";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";

const Login = () => {
  const { isLoggedIn, setSnackType, setSnackMessage, setSnackOpen } =useContext(DataContext);
  const [requestSended,setRequestSended] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resData, setResData] = useState("");
  const history = useHistory();

  async function handleSubmit() {
    setRequestSended(true);
    try {
      const response = await APIService.login(userName, password);
      if (response.status === "succes") {
        localStorage.setItem("loginToken", response.token);
        history.push("/profile");
        setResData(response);
        setSnackType("success");
        setSnackMessage("Login Successfully");
        setSnackOpen(true);
        setRequestSended(false);
      }
    } catch (e) {
      setSnackType("error");
      setSnackMessage("some eroor occured !", e);
      setSnackOpen(true);
      setRequestSended(false);
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      history.push("/profile");
    }
  }, [isLoggedIn]);

  console.log(resData);
  return (
    <>
      <div className="form-body">
        <h2>Welcome Back!</h2>
        <form>
          <div className="form-item">
            <input
              type={"text"}
              placeholder={"Username"}
              name={"username"}
              value={userName}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="form-item">
            <input
              type={"password"}
              placeholder={"Password"}
              name={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-item submit items-center">
          {requestSended ? (
            <CircularProgress size={"20px"}  />
          ) : (
            <Button
              variant="text"
              color="success"
              onClick={() => {
                handleSubmit();
              }}
              sx={{ fontWeight: "bold", width: "100%" }}
            >
              Signup
            </Button>
          )}
          </div>
        </form>
        <div className="form-footer">
          <p>
            Forgot Password?<Link to={"/forgot-password"}>Reset it</Link>
          </p>
          <p className="form-foot-right">
            Dont have an account?<Link to={"/signup"}>Create</Link>
          </p>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Login;
