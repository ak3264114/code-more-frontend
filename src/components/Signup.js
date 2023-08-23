import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../Context/DataContext";
import { Link, useHistory } from "react-router-dom";
import "./css/signup.css";
import APIService from "../APIService";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

function Signup() {
  const { isLoggedIn, setSnackType, setSnackMessage, setSnackOpen } =useContext(DataContext);
  const [userData, setUserData] = useState();
  const [requestSended, setRequestSended] = useState(false);
  const history = useHistory();

  const handeleChange = async (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isLoggedIn) history.push("/profile");
  }, [isLoggedIn]);
  const handlesubmit = async () => {
    setRequestSended(true);
    APIService.register(userData)
      .then((response) => {
        setSnackType("success");
        setSnackMessage(response.data.message ||"SignUp SuccessFully , Please Verify your email address :)");
        setSnackOpen(true)
        setRequestSended(false);
      })
      .catch((error) => {
        setSnackType("error");
        setSnackMessage("some eroor occured !");
        setSnackOpen(true)
        setRequestSended(false);
      });
  };

  return (
    <div className="form-body">
      <h2>Welcome to Code-More</h2>
      <form>
        <div className="form-item">
          <input
            type={"text"}
            name="username"
            placeholder={"Username"}
            onChange={(e) => {
              handeleChange(e);
            }}
          />
        </div>
        <div className="form-item">
          <input
            type={"text"}
            name="name"
            placeholder={"Full Name"}
            onChange={(e) => {
              handeleChange(e);
            }}
          />
        </div>
        <div className="form-item">
          <input
            type={"email"}
            name="email"
            placeholder={"Eamil"}
            onChange={(e) => {
              handeleChange(e);
            }}
          />
        </div>
        <div className="form-item">
          <input
            type={"password"}
            name="password"
            placeholder={"Password"}
            onChange={(e) => {
              handeleChange(e);
            }}
          />
        </div>
        <div className="bg-black p-2 rounded-lg">
          {requestSended ? (
            <CircularProgress size={"20px"} />
          ) : (
            <Button
              variant="text"
              color="success"
              onClick={() => {
                handlesubmit();
              }}
              sx={{ fontWeight: "bold", width: "100%" }}
            >
              Signup
            </Button>
          )}
        </div>
      </form>
      <div className="form-footer">
        {/* <p>Forgot Eamil?<Link to={"/forgot-email"}>Click here</Link></p> */}
        <p>
          Already have an account?<Link to={"/login"}>login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
