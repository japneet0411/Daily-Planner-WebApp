import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();

  function handleSubmit(e) {
    console.log(e.target.username.value);
    e.preventDefault();
    if (e.target.password.value == e.target.confirm_password.value)
      axios
        .post(
          "http://localhost:5000/register",
          {
            username: e.target.username.value,
            password: e.target.password.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.status);
          setMsg(res.data);
          if (res.status === 201) {
            console.log("here");
            history.push("/login");
          }
        })
        .catch((err) => console.log(err));
    else {
      alert("Passwords donot match");
    }
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className="w-full h-screen relative  py-20">
      <div className="relative border-2 border-black h-96   w-96   text-center bg-purple-100 mx-auto rounded-2xl">
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
          Password:{" "}
          <input
            type="password"
            name="password"
            className="border-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <hr />
          confirm Password:
          <input
            type="password"
            name="confirm_password"
            className="border-2"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <hr />
          <button type="submit">Submit</button>
          <p className="text-red-500 p-5 m-5">{msg}</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
