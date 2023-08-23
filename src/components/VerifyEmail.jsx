import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APIService from "../APIService";

const VerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifiedData, setIsVerifiedData] = useState();
  let { token } = useParams();
  useEffect(() => {
    APIService.verifyEmail(token).then((result) => {
      console.log("result", result);
      setIsVerified(true);
      setIsVerifiedData(result.data);
      return result;
    });
  }, []);
  console.log(token)
  return (
    <div>
      <>
        "Hello"
        {isVerified ? isVerifiedData : ""}
      </>
    </div>
  );
};

export default VerifyEmail;
