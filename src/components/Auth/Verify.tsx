import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Verify.css";

// components
import Button from "../Button/Button";
import OTPInput from "../Input/OTPInput";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks";

// reducers
import { verifyOtp } from "../../store/auth/authSlice";

// interface
interface VerifyProps {
  provider: "email" | "mobile";
  setProvider: React.Dispatch<React.SetStateAction<"email" | "mobile">>;
  stage: "authenticate" | "verify" | "signup";
  setStage: React.Dispatch<
    React.SetStateAction<"authenticate" | "verify" | "signup">
  >;
  email: string;
  mobile: string;
}

interface LocationProps {
  state: {
    from: {
      pathname: string;
    };
  };
}

const Verify: React.FC<VerifyProps> = ({
  provider,
  setProvider,
  stage,
  setStage,
  email,
  mobile,
}) => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  // state
  const [otp, setOtp] = React.useState("");
  // function
  React.useEffect(() => {
    if (loggedIn) {
      const from = (location?.state && location?.state?.from?.pathname) || "/";
      navigate(from, { replace: true });
    }
  }, [loggedIn, location, navigate]);

  const handleVerifyOtp = async () => {
    const data: any = {
      code: otp,
    };
    if (provider === "email") data.email = email;
    else data.mobileNumber = mobile;
    const res = await dispatch(verifyOtp(data));
    if (typeof res.payload !== "string") setStage("signup");
  };
  return (
    <div>
      <div className="verify-input-header mt_20">Confirm your {provider}</div>
      <div className="verify-input-subheader mt_20">
        Please enter the OTP sent to your {provider}
      </div>
      <div className="verify-input text-center my_32">
        <OTPInput otp={otp} setOtp={setOtp} />
      </div>
      {/* @TODO - Implement Resend OTP */}
      <div className="verify-input-cta p-2">
        <Button label={"Verify"} onClick={handleVerifyOtp} fullWidth />
      </div>
      {/* @TODO -  Implement More Options */}
    </div>
  );
};

export default Verify;
