import { useState } from "react";
import Backpack from "./Backpack";

const Menu = () => {
    const [isBackpackOpen, setBackpackOpen] = useState(false);
    
    const openStore = () => {
        window.alert("hihi");
    }; 

    const closeBackpack = () => {
      setBackpackOpen(false);
    };
  
    const openBackpack = () => {
      console.log("status change!!");
      setBackpackOpen(true);
    };
  
    const items = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <div className="flex flex-col ml-4 mt-14 space-y-1">
    <div
      className="flex flex-col py-2 w-fit hover:cursor-pointer"
      onClick={openStore}
    >
      <img
        className="w-11 h-11"
        src="/src/assets/img/store.png"
        alt="Store"
      />
      <span>Store</span>
    </div>
      {/* Backpack */}
      <div
        className="flex flex-col py-2 w-fit hover:cursor-pointer"
        onClick={openBackpack}
      >
        <img
          className="w-11 h-11"
          src="/src/assets/img/military.png"
          alt="Backpack"
        />
        <span>Backpack</span>
      </div>

      {/* Missions */}
      <div className="flex flex-col py-2 w-fit">
        <img
          className="w-11 h-11"
          src="/src/assets/img/planner.png"
          alt="Missions"
        />
        <span>Missions</span>
      </div>

      {/* Lucky Spin */}
      <div className="flex flex-col py-2 w-fit">
        <img
          className="w-11 h-11"
          src="/src/assets/img/lottery.png"
          alt="Lucky Spin"
        />
        <span>Good luck !!!!</span>
      </div>
      {/* Backpack Overlay */}
      {isBackpackOpen && (
        <Backpack closeBackpack={closeBackpack} items={items} />
      )}
    </div>
  );
};

export default Menu;
