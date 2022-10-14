import React from "react";
import OtpInput from "react18-input-otp";
import "./OTPInput.css";

// component

// interface
interface OTPInputProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp }) => {
  return (
    <div className="otp-input-wrapper flex justify-center">
      <OtpInput
        id="otp-input"
        autoComplete="one-time-code"
        inputStyle="otp-input"
        value={otp}
        onChange={(otp: string) => setOtp(otp)}
        numInputs={6}
      />
    </div>
  );
};

export default OTPInput;
