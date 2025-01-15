import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WalletConnect from "../components/WalletConnecting";
import IntroPage from "../pages/IntroPage";
import MainBoundary from "../components/MainBoundary";
import Backpack from "../components/Backpack";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<WalletConnect />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/main" element={<MainBoundary/>} />
        <Route path="/backpack" element={<Backpack/>} />
      </Routes>
    </>
  );
};

export default Router;
