import { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const {
    appBar,
    heading,
    image,
    brandContainer,
    toolbar,
    profile,
    purple,
    userName,
    logout,
  } = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem("Profile")));
  }, [location]);

  return (
    <AppBar className={appBar} position="static" color="inherit">
      <div className={brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar className={toolbar}>
        {user ? (
          <div className={profile}>
            <Avatar
              className={purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={logout}
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
