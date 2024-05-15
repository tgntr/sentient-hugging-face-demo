import { useEffect } from "react";
import { useStore } from "./store";
import { oauthHandleRedirectIfPresent, oauthLoginUrl } from "@huggingface/hub";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";

export default function Login() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const state = queryParams.get("state");

  const handleHfLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    const oauthUrl = await oauthLoginUrl({
      clientId: "0d66271c-c71e-449b-8003-c97dbb822427",
      redirectUrl: "http://localhost:3000/login",
      scopes: "profile email read-repos",
    });
    window.location.href = oauthUrl;
  };

  const handleHfLoginCallback = async () => {
    const res = await oauthHandleRedirectIfPresent();
    if (res) {
      setUser(res);
      navigate("/");
      return;
    }
  };

  useEffect(() => {
    if (!user && code && state) {
      handleHfLoginCallback();
    }
  }, [user, code, state]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5vh",
      }}
    >
      {!user && !code && !state ? (
        <Button variant="contained" onClick={handleHfLogin}>
          <img
            src="https://huggingface.co/datasets/huggingface/badges/resolve/main/sign-in-with-huggingface-lg.svg"
            alt="Sign in with Hugging Face"
          />
        </Button>
      ) : (
        <Typography>
          Authenticating... <CircularProgress />
        </Typography>
      )}
    </Box>
  );
}
