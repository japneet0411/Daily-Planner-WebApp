import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    // console.log(e.target.username.value);
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/login",
        {
          username: e.target.username.value,
          password: e.target.password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "success") {
          history.push("/");
        } else {
          setMsg(res.data);
        }
      })
      .catch((err) => console.log(err));

    setUsername("");
    setPassword("");
  }

  return (
    <div className="w-full h-screen relative  py-20">
      <div className="relative border-2 border-black h-96   w-96   text-center bg-purple-100 mx-auto rounded-2xl">
        <p className="text-center text-3xl roboto mt-3 mb-5">LOGIN </p>
        <form className="mont space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="border-2 px-3 py-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <hr />

          <input
            type="password"
            name="password"
            placeholder="password"
            className="border-2 px-3 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <hr />
          <button
            type="submit"
            className="border-2 border-black px-5 py-2 rounded-lg hover:bg-gray-300"
          >
            Submit
          </button>
          <p className="text-red-500 p-5 m-5">{msg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
