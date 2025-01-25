import React from "react";
import PropTypes from "prop-types";

const Backpack = ({ closeBackpack, items }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-11/12 sm:w-3/4 lg:w-1/2 bg-white rounded-xl p-6 shadow-lg">
        <h1 className="flex justify-center text-3xl font-bold py-5 font-mono text-gray-800">
          Backpack
        </h1>
        <ul className="flex justify-center pb-4">
          <li className="w-24 h-10 mx-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-400 cursor-pointer flex items-center justify-center">
            All Items
          </li>
          <li className="w-24 h-10 mx-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-400 cursor-pointer flex items-center justify-center">
            Shoes
          </li>
          <li className="w-24 h-10 mx-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-400 cursor-pointer flex items-center justify-center">
            Clothes
          </li>
          <li className="w-24 h-10 mx-2 rounded-3xl bg-blue-500 text-white hover:bg-blue-400 cursor-pointer flex items-center justify-center">
            Pants
          </li>
          <li className="absolute top-2 right-2 hover:opacity-80 cursor-pointer">
            <img
              className="w-8 h-8"
              src="/src/assets/img/eyebrow.png"
              onClick={closeBackpack}
              alt="Close"
            />
          </li>
        </ul>
        
        {/* Items grid */}
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg shadow-md transform transition-transform duration-200 hover:scale-110 hover:bg-gray-200"
              >
                <p className="text-gray-800">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Navigation button */}
        <div className="absolute rounded-full bg-blue-50 right-4 bottom-4 p-2 hover:cursor-pointer shadow-lg">
          <img
            className="w-5 h-5"
            src="/src/assets/img/next_arrow.png"
            alt="Next"
          />
        </div>
      </div>
    </div>
  );
};
// Define PropTypes
Backpack.propTypes = {
  closeBackpack: PropTypes.func.isRequired, // closeBackpack must be a function
  items: PropTypes.arrayOf(PropTypes.string).isRequired, // items should be an array of strings
};

export default Backpack;
