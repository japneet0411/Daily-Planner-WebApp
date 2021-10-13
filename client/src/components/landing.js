import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-purple-100 w-full h-screen">
      <p className="pt-32 roboto text-5xl text-center ">TODOLIST APP </p>
      <div className="mont flex flex-row justify-center text-center mt-20 gap-10 text-xl">
        <Link
          className="border-2 rounded-lg border-black pt-1  h-10 w-32 hover:bg-gray-300"
          to="/register"
        >
          Register
        </Link>
        <Link
          className="border-2 rounded-lg border-black pt-1 h-10 w-32 hover:bg-gray-300"
          to="/login"
        >
          LogIn
        </Link>
      </div>
    </div>
  );
};

export default Landing;
