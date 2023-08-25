import { React, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "../APIService";
import lottie from "lottie-web";
import { CircularProgress } from "@mui/material";
import { DataContext } from "../Context/DataContext";

const VerifyEmail = () => {
  const { setSnackType, setSnackMessage, setSnackOpen } =useContext(DataContext);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedData, setIsVerifiedData] = useState();
  let { token } = useParams();
  useEffect(() => {
    APIService.verifyEmail(token).then(result => {
      setIsVerified(true);
      setIsVerifiedData("verified");
      console.log(result);
      setSnackType("success");
      setSnackMessage(result.data.message ||"Email Verified Succesfully");
      setSnackOpen(true)
      localStorage.setItem('loginToken', result.data.token);
      return result;
    }).catch(e=>{
      setIsVerified(false);
      setSnackType("error");
      setSnackMessage(e.response.data.message ||"Something went wrong");
      setSnackOpen(true)
    })
  }, []);

  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../components/img/emali-verified.json"),
    });
  }, [isVerified]);

  return (
    <>
      {isVerified ? (
        <div className="grid justify-center text-center">
          <h1 className=" text-2xl">
            {isVerifiedData?.message || "Email Verified Succesfully"}
          </h1>
          <div className="" ref={container}></div>
        </div>
      ) : (
        <div className="grid justify-center">
          <CircularProgress size={"100px"} />
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
