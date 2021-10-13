import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const Register = () => {
  const history = useHistory();

  function handleSubmit(e) {
    console.log(e.target.username.value);
    e.preventDefault();
    if (e.target.password.value === e.target.confirm_password.value)
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
            history.push("/login");
          }
        })
        .catch((err) => console.log(err));
    else {
      setMsg("Passwords donot match");
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
          <p className="text-center text-3xl roboto mt-3 mb-5">REGISTER</p>
          <p className="mont space-y-3">
            <input
              type="text"
              name="username"
              className="border-2 px-3 py-2 rounded-lg"
              value={username}
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <hr />
            <input
              placeholder="password"
              type="password"
              name="password"
              className="border-2 px-3 py-2 rounded-lg"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <hr />

            <input
              placeholder="confirm password"
              type="password"
              name="confirm_password"
              className="border-2 px-3 py-2 rounded-lg"
              value={confirmpassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <hr />
            <button
              type="submit"
              className="border-2 border-black px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              Submit
            </button>
            <p className="text-red-500 p-5 m-5">{msg}</p>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
