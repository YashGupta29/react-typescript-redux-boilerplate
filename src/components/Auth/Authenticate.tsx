import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";
import "./Authenticate.css";

// components
import Input from "../Input/Input";
import Button from "../Button/Button";

// hooks
import { useAppDispatch, useAppSelector } from "../../hooks";

// reducers
import {
  authenticateUser,
  googleAuthentication,
  facebookAuthentication,
} from "../../store/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";

// constants
import { FACEBOOK_APP_ID } from "../../constants";

// icons
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsPhone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

// interface
interface LocationProps {
  state: {
    from: {
      pathname: string;
    };
  };
}
interface AuthenticateProps {
  provider: "email" | "mobile";
  setProvider: React.Dispatch<React.SetStateAction<"email" | "mobile">>;
  stage: "authenticate" | "verify" | "signup";
  setStage: React.Dispatch<
    React.SetStateAction<"authenticate" | "verify" | "signup">
  >;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setMobile: React.Dispatch<React.SetStateAction<string>>;
}

const Authenticate: React.FC<AuthenticateProps> = ({
  provider,
  setProvider,
  stage,
  setStage,
  setEmail: setParentEmail,
  setMobile: setParentMobile,
}) => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation() as LocationProps;
  // state
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");
  const [isMobileValid, setIsMobileValid] = React.useState<boolean>(false);

  // function
  React.useEffect(() => {
    if (loggedIn) {
      const from = (location?.state && location?.state?.from?.pathname) || "/";
      navigate(from, { replace: true });
    }
  }, [loggedIn, location, navigate]);

  const handleAuthenticate = async () => {
    const data: any = {};
    if (provider === "email") {
      data.email = email;
      setParentEmail(email);
    } else {
      data.mobileNumber = `+${countryCode}-${mobile
        .replace(countryCode, "")
        .trim()}`;
      setParentMobile(data.mobileNumber);
    }
    const res = await dispatch(authenticateUser(data));
    if (res.type === "auth/authenticateUser/fulfilled") setStage("verify");
    else console.log("Error ->", res.payload);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (resp) =>
      await dispatch(googleAuthentication(resp.access_token)),
    onError: (error) => console.log("Error ->", error),
  });

  return (
    <div>
      <div className="authenticate-input-header mt_20">Welcome Back!</div>
      <form className="authenticate">
        <div className="authenticate-input mt_20">
          {provider === "mobile" ? (
            <Input
              fullWidth
              name={"mobile"}
              type={"mobile"}
              placeholder={"Mobile Number"}
              onChange={(value, country) => {
                setMobile(value || "");
                setCountryCode((country as any).dialCode);
              }}
              value={mobile}
              isNumberValid={(isValid) => setIsMobileValid(isValid)}
              // error={!isMobileValid ? "Invalid Mobile" : ""}
            />
          ) : (
            <Input
              fullWidth
              name={"email"}
              type={"email"}
              placeholder={"Email"}
              value={email}
              onChange={(value) => setEmail(value || "")}
            />
          )}
        </div>
        <div className="authenticate-input-cta p-2">
          <Button label={"Continue"} fullWidth onClick={handleAuthenticate} />
        </div>
      </form>
      <div className="seperator">or</div>
      <div className="authenticate-options-cta p-2">
        <Button
          iconOptions={{ showStartIcon: true, startIcon: <FcGoogle /> }}
          label={"Continue with Google"}
          variant={"outlined"}
          fullWidth
          onClick={handleGoogleLogin}
        />
      </div>
      <div className="authenticate-options-cta p-2">
        {FACEBOOK_APP_ID && (
          <FacebookLogin
            appId={FACEBOOK_APP_ID}
            onSuccess={async (resp) =>
              await dispatch(facebookAuthentication(resp?.accessToken))
            }
            onFail={(error) => console.log("Login Failed!", error)}
            render={({ onClick }) => (
              <Button
                iconOptions={{ showStartIcon: true, startIcon: <BsFacebook /> }}
                label={"Continue with Facebook"}
                variant={"outlined"}
                fullWidth
                onClick={onClick}
              />
            )}
          />
        )}
      </div>
      <div className="authenticate-options-cta p-2">
        {provider === "mobile" ? (
          <Button
            iconOptions={{ showStartIcon: true, startIcon: <MdOutlineEmail /> }}
            label={"Continue with Email"}
            variant={"outlined"}
            fullWidth
            onClick={() => setProvider("email")}
          />
        ) : (
          <Button
            iconOptions={{ showStartIcon: true, startIcon: <BsPhone /> }}
            label={"Continue with Mobile"}
            variant={"outlined"}
            fullWidth
            onClick={() => setProvider("mobile")}
          />
        )}
      </div>
    </div>
  );
};

export default Authenticate;
