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
      .post("http://localhost:5000/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => console.log(err));

    setUsername("");
    setPassword("");
  }

  return (
    <div className="w-full h-screen relative  py-20">
      <div className="relative border-2 border-black h-96   w-96   text-center bg-purple-100 mx-auto rounded-2xl">
        <p>LOGIN </p>
        <form onSubmit={handleSubmit}>
          Username:
          <input
            type="text"
            name="username"
            className="border-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <hr />
          Password:
          <input
            type="password"
            name="password"
            className="border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <hr />
          <button className="border-2" type="submit">
            Submit
          </button>
          <p className="text-red-500 p-5 m-5">{msg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
