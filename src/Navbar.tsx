import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "./store";
import { oauthLoginUrl } from "@huggingface/hub";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Sentient HuggingFace Demo
        </Typography>
        {user ? (
          <>
            <Button color="inherit" onClick={() => navigate("/check-dataset")}>
              Check Dataset
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
