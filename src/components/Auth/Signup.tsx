import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Signup.css";

// components
import Input from "../Input/Input";
import Button from "../Button/Button";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks";

// reducers
import { signupUser } from "../../store/auth/authSlice";

// interface
interface SignupProps {
  provider: "email" | "mobile";
  email?: string;
  mobile?: string;
}

interface LocationProps {
  state: {
    from: {
      pathname: string;
    };
  };
}

const Signup: React.FC<SignupProps> = ({
  provider,
  email: emailProp,
  mobile,
}) => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  // state
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState(
    provider === "email" && emailProp ? emailProp : ""
  );

  // function
  React.useEffect(() => {
    if (loggedIn) {
      const from = (location?.state && location?.state?.from?.pathname) || "/";
      navigate(from, { replace: true });
    }
  }, [loggedIn, location, navigate]);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const data: any = { firstName, lastName, email };
    if (provider === "mobile") data.mobileNumber = mobile;
    await dispatch(signupUser({ ...data }));
  };
  return (
    <div>
      <div className="signup-input-header mt_20">Complete your profile</div>
      <form className="signup" onSubmit={handleSignup}>
        <div className="signup-input-wrapper mt_20">
          <div className="signup-input">
            <Input
              fullWidth
              name={"firstName"}
              type={"text"}
              placeholder={"First Name"}
              value={firstName}
              onChange={(value) => setFirstName(value || "")}
            />
          </div>
          <div className="signup-input">
            <Input
              fullWidth
              name={"lastName"}
              type={"text"}
              placeholder={"Last Name"}
              value={lastName}
              onChange={(value) => setLastName(value || "")}
            />
          </div>
          <div className="signup-input">
            <Input
              fullWidth
              name={"email"}
              type={"text"}
              placeholder={"Email"}
              value={email}
              disabled={provider === "email"}
              onChange={(value) => setEmail(value || "")}
            />
          </div>
        </div>
        <div className="signup-input-cta p-2">
          <Button type={"submit"} label={"Continue"} fullWidth />
        </div>
      </form>
    </div>
  );
};

export default Signup;
