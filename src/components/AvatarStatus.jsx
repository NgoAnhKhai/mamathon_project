const AvatarStatus = () => {
    return (
      <div className="flex">
        {/* Avatar */}
        <div className="w-24 h-24 bg-emerald-200 rounded-full mx-4 my-2">
          <img
            className="w-24 h-24 rounded-full"
            src="/src/assets/img/goat.png"
            alt="Avatar"
          />
        </div>
  
        {/* Status + Name */}
        <div className="flex-col my-3 pt-1">
          <div className="w-fit h-8 bg-teal-200 rounded-xl pr-2">
            <p className="ml-2 pt-1">kangourou</p>
          </div>
          <div className="w-fit h-8 bg-teal-200 rounded-xl mt-2 pr-2">
            <p className="ml-2 pt-1">Happy</p>
          </div>
        </div>
  
        {/* Settings */}
        <div>
          <img
            className="w-6 h-6 mt-10 mx-2"
            src="/src/assets/img/settings.png"
            alt="Settings"
          />
        </div>
      </div>
    );
  };
  
  export default AvatarStatus;
  