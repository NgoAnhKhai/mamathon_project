import { useState, useEffect } from "react";

const AvatarStatus = () => {
  // Initial EXP and level setup
  const [currentExp, setCurrentExp] = useState(250); // Example: More EXP than required
  const [requiredExp, setRequiredExp] = useState(200);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showUpgradeArrow, setShowUpgradeArrow] = useState(false);

  const expPercentage = (currentExp / requiredExp) * 100;

  // Automatically show level-up popup when EXP reaches required
  useEffect(() => {
    if (currentExp >= requiredExp) {
      setShowLevelUp(true);
      setShowUpgradeArrow(false);
    }
  }, [currentExp, requiredExp]);

  // Handle Level Up Logic
  const handleLevelUp = () => {
    let excessExp = currentExp - requiredExp; // Carry over extra EXP
    let newLevel = level + 1;
    let newRequiredExp = requiredExp + 100;

    while (excessExp >= newRequiredExp) {
      // If we have enough EXP to level up again
      excessExp -= newRequiredExp;
      newLevel++;
      newRequiredExp += 100;
    }

    setLevel(newLevel);
    setCurrentExp(excessExp);
    setRequiredExp(newRequiredExp);
    setShowLevelUp(false);

    // If still enough EXP, show upgrade arrow
    if (excessExp >= newRequiredExp) {
      setShowUpgradeArrow(true);
    }
  };

  return (
    <div className="flex relative">
      {/* Avatar */}
      <div className="w-24 h-24 bg-emerald-200 rounded-full mx-4 my-2">
        <img className="w-24 h-24 rounded-full" src="/src/assets/img/goat.png" alt="Avatar" />
      </div>

      {/* Status + EXP Bar */}
      <div className="flex flex-col my-3 pt-1">
        <div className="w-fit h-8 bg-teal-200 rounded-xl pr-2">
          <p className="ml-2 pt-1">kangourou</p>
        </div>
        <div className="w-fit h-8 bg-teal-200 rounded-xl mt-2 pr-2">
          <p className="ml-2 pt-1">Happy</p>
        </div>

        {/* EXP Bar */}
        <div className="w-40 mt-2 bg-gray-300 rounded-xl overflow-hidden">
          <div className="bg-blue-500 h-4 transition-all duration-300" style={{ width: `${expPercentage}%` }}></div>
        </div>
        <p className="text-sm text-gray-700 mt-1">Level {level} - {currentExp} / {requiredExp} EXP</p>
      </div>

      {/* Settings Icon */}
      <div>
        <img className="w-6 h-6 mt-10 mx-2" src="/src/assets/img/settings.png" alt="Settings" />
      </div>

      {/* Floating Upgrade Arrow */}
      {showUpgradeArrow && (
        <div 
          className="absolute top-4 right-10 animate-bounce cursor-pointer"
          onClick={() => setShowLevelUp(true)}
        >
          <img src="/src/assets/img/updated.png" alt="Upgrade" className="w-8 h-8" />
        </div>
      )}

      {/* Full-Screen Overlay with Centered Popup */}
      {showLevelUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
            <p className="text-lg font-semibold">🎉 Do you want to upgrade your pet?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700" onClick={handleLevelUp}>
                Yes
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700" onClick={() => setShowLevelUp(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarStatus;
