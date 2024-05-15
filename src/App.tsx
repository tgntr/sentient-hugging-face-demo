import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CheckDataset from "./CheckDataset";
import Navbar from "./Navbar";
import Login from "./Login";
import StoreProvider, { useStore } from "./store";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/check-dataset" element={<CheckDataset />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}

function HomeRedirect() {
  const { user } = useStore();
  return user ? <Navigate to="/check-dataset" replace /> : <Navigate to="/login" replace />;
}
