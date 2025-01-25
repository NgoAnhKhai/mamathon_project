import { useState } from "react";
import Backpack from "./Backpack";

const Menu = () => {
  const [isBackpackOpen, setBackpackOpen] = useState(false);
  const [isStoreOpen, setStoreOpen] = useState(false);
  const [isMissionOpen, setMissionOpen] = useState(false);
  const [isSpinOpen, setSpinOpen] = useState(false);

  const closeBackpack = () => setBackpackOpen(false);
  const openBackpack = () => setBackpackOpen(true);

  const openStore = () => setStoreOpen(true);
  const closeStore = () => setStoreOpen(false);

  const openMission = () => setMissionOpen(true);
  const closeMission = () => setMissionOpen(false);

  const openSpin = () => setSpinOpen(true);
  const closeSpin = () => setSpinOpen(false);

  const items = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div className="flex flex-col ml-4 mt-14 space-y-1">
      {/* Store */}
      <div
        className="flex flex-col py-2 w-fit hover:cursor-pointer"
        onClick={openStore}
      >
        <img className="w-11 h-11" src="/src/assets/img/store.png" alt="Store" />
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
      <div
        className="flex flex-col py-2 w-fit hover:cursor-pointer"
        onClick={openMission}
      >
        <img
          className="w-11 h-11"
          src="/src/assets/img/planner.png"
          alt="Missions"
        />
        <span>Missions</span>
      </div>

      {/* Lucky Spin */}
      <div className="flex flex-col py-2 w-fit hover:cursor-pointer" onClick={openSpin}>
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

      {/* Store Overlay */}
      {isStoreOpen && <Store closeStore={closeStore} />}

      {/* Missions Overlay */}
      {isMissionOpen && <Missions closeMission={closeMission} />}

      {/* Spin Overlay */}
      {isSpinOpen && <LuckySpin closeSpin={closeSpin} />}
    </div>
  );
};
const LuckySpin = ({ closeSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinStyle, setSpinStyle] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

  // Danh sách phần thưởng
  const items = [
    { id: 1, name: "E-Voucher 10K", color: "#FF0000" },
    { id: 2, name: "E-Voucher 20K", color: "#FFFF00" },
    { id: 3, name: "Mất Lượt", color: "#FF5733" },
    { id: 4, name: "Máy Trộn KitchenAid", color: "#FFC300" },
    { id: 5, name: "Tủ Lạnh Mini", color: "#33FF57" },
    { id: 6, name: "Mất Lượt", color: "#33C3FF" },
    { id: 7, name: "Đồ Ăn Pet", color: "#FF33FF" },
    { id: 8, name: "Bộ Đồ Sơ Mi", color: "#C70039" },
  ];

  const startSpin = () => {
    setIsSpinning(true);
    setSelectedItem(null);

    const randomIndex = Math.floor(Math.random() * items.length);
    const randomDegree = 360 * 5 + (360 / items.length) * randomIndex;

    setSpinStyle({
      transform: `rotate(${randomDegree}deg)`,
      transition: "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)",
    });

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedItem(items[randomIndex]);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/5 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">🎡 Lucky Spin</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={closeSpin}
          >
            ❌ Close
          </button>
        </div>

        {/* Vòng quay */}
        <div className="relative w-80 h-80 mx-auto">
          <div
            className="absolute w-full h-full rounded-full border-4 border-gray-300 shadow-lg"
            style={spinStyle}
          >
            {items.map((item, index) => (
              <div
                key={item.id}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${(360 / items.length) * index}deg)`,
                  clipPath: "polygon(50% 50%, 100% 0, 0 0)",
                  backgroundColor: item.color,
                }}
              >
                <div
                  className="absolute w-full h-full flex justify-center items-center text-center"
                  style={{
                    transform: `rotate(-${(360 / items.length) * index}deg)`,
                  }}
                >
                  <span className="text-xs font-bold text-white">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Kim chỉ vòng quay */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-red-600 shadow-lg rounded-full"></div>
        </div>

        {/* Nút bắt đầu */}
        <button
          className={`mt-6 px-6 py-3 text-lg text-white rounded-lg ${
            isSpinning ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"
          }`}
          onClick={startSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Start Spin"}
        </button>

        {/* Hiển thị phần thưởng */}
        {selectedItem && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-gray-800">🎉 You won!</h2>
            <div className="flex flex-col items-center mt-2">
              <p className="text-lg font-semibold mt-2">{selectedItem.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const Missions = ({ closeMission }) => {
  const [missions, setMissions] = useState([
    { id: 1, title: "Feed Your Goat", reward: 10, completed: false },
    { id: 2, title: "Play with Goat", reward: 15, completed: false },
    { id: 3, title: "Give Goat a Bath", reward: 20, completed: false },
  ]);

  const completeMission = (id) => {
    setMissions((prevMissions) =>
      prevMissions.map((mission) =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-2/5 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">📜 Missions</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={closeMission}
          >
            ❌ Close
          </button>
        </div>

        <div className="space-y-4">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`p-4 border rounded-lg shadow-md flex justify-between items-center ${
                mission.completed ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {mission.title} {mission.completed ? "✔" : ""}
                </h3>
                <p className="text-gray-600">Reward: {mission.reward} Coins</p>
              </div>
              <button
                className={`px-4 py-2 text-white rounded-lg ${
                  mission.completed
                    ? "bg-gray-500"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
                onClick={() => completeMission(mission.id)}
                disabled={mission.completed}
              >
                {mission.completed ? "Completed" : "Not Completed"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Store = ({ closeStore }) => {
  const items = [
    { id: 1, name: "Goat Feed", price: 5, img: "/src/assets/img/goat_feed.png" },
    { id: 2, name: "Chew Toy", price: 10, img: "/src/assets/img/chew_toy.jpg" },
    { id: 3, name: "Collar", price: 8, img: "/src/assets/img/collar.jpg" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-3/5 h-3/5 bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🐐 Pet Store</h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            onClick={closeStore}
          >
            ❌ Close
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <h3 className="text-2xl font-semibold mt-3">{item.name}</h3>
              <p className="text-gray-700 text-lg">{item.price} Coins</p>
              <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 text-lg">
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
