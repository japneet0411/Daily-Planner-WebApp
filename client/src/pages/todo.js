import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Landing from "../components/landing";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";

import axios from "axios";
const Todolist = () => {
  function addItem(e) {
    e.preventDefault();
    // console.log(data);

    axios.post("http://localhost:5000/", {
      name: data,
      create: Date(),
      status: false,
      complete: null,
    });
    setData("");
  }
  function deleteItem(item, e) {
    var link = "http://localhost:5000/" + item._id;
    axios.delete(link).then((data) => console.log(data));
  }

  function CrossOver(id, sts) {
    var complete;
    var link = "http://localhost:5000/" + id;
    complete = !sts ? Date() : null;

    axios
      .get(link)
      .then((response) => {
        axios
          .put("http://localhost:5000/", {
            id,
            status: !response.data.data.status,
            complete,
          })
          .then(() => {
            console.log("updated");
          });
      })
      .catch((err) => console.log(err));
  }

  const [List, setList] = useState([]);
  const [data, setData] = useState("");

  // const [checked, setChecked] = useState([]);
  const [loggedIn, login] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        // console.log(res);
        if (res.data) {
          login(true);
          axios.get("http://localhost:5000/").then((response) => {
            let data = [];
            for (var i = 0; i < response.data.data.length; i++) {
              data.push(response.data.data[i]);
            }
            setList(data);
          });
        } else {
          login(false);
        }
      });
  }, []);
  return (
    <div className=" w-full h-screen relative py-6 ">
      {loggedIn && (
        <div className="border-2 border-black h-auto min-h-full  w-96   text-center bg-purple-200 mx-auto rounded-2xl ">
          <p className="roboto text-3xl  mt-3 mb-4">TODO LIST</p>
          <hr className="bg-black h-0.5 mb-5"></hr>
          <ul className="list-outside text-lg mont">
            {List.map((item, index) => (
              <li key={item._id}>
                <input
                  type="checkbox"
                  checked={item.status ? "checked" : ""}
                  className="m-2 checkbox-round"
                  onClick={() => {
                    CrossOver(item._id, item.status);
                  }}
                ></input>
                <p
                  className="inline-block w-16"
                  style={{
                    textDecoration: item.status ? "line-through" : "none",
                  }}
                >
                  {item.name}
                </p>
                <button
                  className=" m-4  p-1 hover:opacity-60 "
                  type="submit"
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  <FaTrash size={15} />
                </button>
              </li>
            ))}
            <li>
              <input
                className="border-2 w-44 m-2 text-lg "
                type="text"
                name="data"
                value={data}
                onChange={(e) => setData(e.target.value)}
              ></input>
              <button
                type="submit"
                className="absolute mt-2 hover:opacity-60 text-black"
                onClick={addItem}
              >
                <AiFillPlusCircle size={30} />
              </button>
            </li>
          </ul>
          <p>
            <Link
              className="absolute text-xl bottom-2  underline right-10 "
              to="/analyse"
            >
              <span className="flex flex-row justify-between">
                Analysis page
                <HiArrowSmRight className="ml-2 mt-2" size={20} />
              </span>
            </Link>
          </p>
        </div>
      )}
      {!loggedIn && <Landing />}
    </div>
  );
};

export default Todolist;
