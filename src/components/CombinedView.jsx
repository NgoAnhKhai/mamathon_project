import React from "react";
import Room from "../pages/Room";
import AvatarStatus from "../components/AvatarStatus";
import Coin from "../components/Coin";
import Menu from "../components/Menu";

const CombinedView = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Giao diện 3D */}
      <Room />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          pointerEvents: "auto", // Cho phép tương tác
        }}
      >
        {/* Avatar + Status */}
        <AvatarStatus />

        {/* Coin */}
        <Coin />

        {/* Menu */}
        <Menu />
      </div>
    </div>
  );
};

export default CombinedView;
