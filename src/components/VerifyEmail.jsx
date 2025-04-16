import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import APIService from "../APIService";
import { DataContext } from "../Context/DataContext";

// Import icons from lucide-react instead of using lottie
import { CheckCircle, XCircle, Loader } from "lucide-react";

const VerifyEmail = () => {
  const { setSnackOpen } = useContext(DataContext);
  const [verificationStatus, setVerificationStatus] = useState({
    isLoading: true,
    isSuccess: false,
    message: ""
  });
  const history = useHistory();
  const { token } = useParams();

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const result = await APIService.verifyEmail(token);
        
        setVerificationStatus({
          isLoading: false,
          isSuccess: true,
          message: result.data.message || "Email verified successfully!"
        });
        
        setSnackOpen({
          type: "success", 
          message: result.data.message || "Email verified successfully!"
        });
        
        // Store token and prepare for redirect
        if (result.data.token) {
          localStorage.setItem('loginToken', result.data.token);
          // Redirect after 3 seconds
          setTimeout(() => {
            history.push('/dashboard');
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus({
          isLoading: false,
          isSuccess: false,
          message: error.response?.data?.message || "Verification failed. The link may be expired or invalid."
        });
        
        setSnackOpen({
          type: "error", 
          message: error.response?.data?.message || "Verification failed"
        });
      }
    };

    verifyUserEmail();
  }, [token, setSnackOpen, history]);

  const renderVerificationContent = () => {
    if (verificationStatus.isLoading) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader className="h-16 w-16 text-blue-500 animate-spin" />
          <p className="text-lg text-gray-600">Verifying your email address...</p>
        </div>
      );
    }

    if (verificationStatus.isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4">
          <CheckCircle className="h-24 w-24 text-green-500" />
          <h1 className="text-2xl font-semibold text-gray-800">{verificationStatus.message}</h1>
          <p className="text-gray-600">You'll be redirected to your dashboard shortly.</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <XCircle className="h-24 w-24 text-red-500" />
        <h1 className="text-2xl font-semibold text-gray-800">{verificationStatus.message}</h1>
        <button 
          onClick={() => history.push('/login')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Login
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Email Verification</h2>
          {renderVerificationContent()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;