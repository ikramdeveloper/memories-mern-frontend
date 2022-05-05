import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signUp, login } from "../../actions/auth";

import Icon from "./Icon";
import Input from "./Input";
import useStyles from "./styles";

const Auth = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { paper, avatar, form, submit, googleButton } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => setIsShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
    e.target.reset();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    setIsShowPassword(false);
  };

  const googleSuccess = async (resp) => {
    const result = resp?.profileObj;
    const token = resp?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In Failed, Try Again");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={paper} elevation={3}>
        <Avatar className={avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Login"}</Typography>
        <form className={form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={isShowPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submit}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </Button>
          <GoogleLogin
            clientId="698888216766-fo945j0g1i7sjv6t5m1cam28pvml76n7.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="center">
            <Grid item>
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <Button onClick={switchMode}>
                {isSignUp ? "Login" : "Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
