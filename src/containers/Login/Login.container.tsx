import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

// components
import Layout from "../../components/Layout/Layout";
import Authenticate from "../../components/Auth/Authenticate";
import Verify from "../../components/Auth/Verify";
import Signup from "../../components/Auth/Signup";

// hooks
import { useAppSelector } from "../../hooks";
import { GoogleOAuthProvider } from "@react-oauth/google";

// constants
import { GOOGLE_CLIENT_ID } from "../../constants";

// interface
interface LocationProps {
  state: {
    from: {
      pathname: string;
    };
  };
}

const Login = () => {
  const { loggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  // state
  const [stage, setStage] = React.useState<
    "authenticate" | "verify" | "signup"
  >("authenticate");
  const [provider, setProvider] = React.useState<"email" | "mobile">("mobile");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  // function
  React.useEffect(() => {
    if (loggedIn) {
      const from = (location?.state && location?.state?.from?.pathname) || "/";
      navigate(from, { replace: true });
    }
  }, [loggedIn, location, navigate]);
  return (
    <Layout pageTitle="Login or Signup">
      <div className="container-xxl login-container">
        <div className="login-form-wrapper">
          <div className="login-form-heading">
            {stage === "authenticate"
              ? `Login or Signup`
              : stage === "verify"
              ? `Verify your ${provider}`
              : `Complete your profile`}
          </div>
          {/* Login Component Based on Stage */}
          <div className="login-form-stage-wrapper">
            {stage === "authenticate" && GOOGLE_CLIENT_ID ? (
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Authenticate
                  provider={provider}
                  setProvider={setProvider}
                  stage={stage}
                  setStage={setStage}
                  setEmail={setEmail}
                  setMobile={setMobile}
                />
              </GoogleOAuthProvider>
            ) : stage === "verify" ? (
              <Verify
                provider={provider}
                setProvider={setProvider}
                stage={stage}
                setStage={setStage}
                email={email}
                mobile={mobile}
              />
            ) : stage === "signup" ? (
              <Signup provider={provider} email={email} mobile={mobile} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
