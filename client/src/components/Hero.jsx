import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

function Hero() {
  const titleRef = useRef(null);
  const locRef = useRef(null);
  const { setsearchFilter, setisSearch } = useContext(AppContext);

  const onSearch = () => {
    setsearchFilter({
      title: titleRef.current.value,
      location: locRef.current.value,
    });
    setisSearch(true);
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="bg-gradient-to-r from-blue-800 to-purple-950 text-white py-10 text-center rounded-xl">
        <h2 className="text-md md:text-3xl lg:text-4xl font-mono">
          Thousands of Jobs Here, Apply now
        </h2>
        <p className="mb-6 text-xs lg:text-xl max-w-xl mx-auto text-gray-300">
          Start Your Career here, Lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>
        <div className="flex flex-col sm:flex-row items-center  justify-between gap-3 sm:bg-white rounded text-gray-700 max-w-2xl mx-auto p-2">
          <div className="flex items-center w-full sm:w-auto">
            <img src={assets.search_icon} alt="" className="mr-2 bg-white p-1" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Find Your Dream Job"
              className="w-full rounded-md sm:w-auto p-2 outline-none text-sm"
            />
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <img src={assets.location_icon} alt="" className="mr-2  bg-white p-1" />
            <input
              ref={locRef}
              type="text"
              placeholder="Enter Location"
              className="w-full sm:w-auto p-2 outline-none rounded-md text-sm"
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-black py-2 px-4 rounded-md text-white text-sm sm:text-base w-full sm:w-auto"
          >
            Find
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center mt-6 gap-5">
        <h2 className="text-lg md:text-xl text-blue-700">Trusted by:</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <img src={assets.adobe_logo} className="h-6" alt="Adobe" />
          <img src={assets.accenture_logo} className="h-6" alt="Accenture" />
          <img src={assets.amazon_logo} className="h-6" alt="Amazon" />
          <img src={assets.microsoft_logo} className="h-6" alt="Microsoft" />
          <img src={assets.samsung_logo} className="h-6" alt="Samsung" />
          <img src={assets.walmart_logo} className="h-6" alt="Walmart" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
