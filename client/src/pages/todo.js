import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

import axios from "axios";
const Todolist = () => {
  function addItem(e) {
    e.preventDefault();
    console.log(data);
    setChecked([...checked, false]);
    axios.post("http://localhost:5000/", {
      name: data,
      create: Date(),
      status: false,
    });
    setData("");
    window.location.reload();
  }
  function deleteItem(item, e) {
    var link = "http://localhost:5000/" + item._id;
    axios.delete(link).then((data) => console.log(data));
    window.location.reload();
  }

  function CrossOver(id, index) {
    console.log(checked);
    var link = "http://localhost:5000/" + id;

    axios
      .get(link)
      .then((response) => {
        console.log(response.data);
        setChecked((checked) => ({
          ...checked,
          [index]: !response.data.status,
        }));
      })
      .catch((err) => console.log(err));

    axios.put(link).then(() => {
      console.log("updated");
    });
  }

  const [List, setList] = useState([]);
  const [data, setData] = useState("");
  const [length, setLength] = useState(0);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/").then((response) => {
      console.log(response.data.data);
      let data = [];
      setLength(response.data.data.length);
      for (var i = 0; i < response.data.data.length; i++) {
        data.push(response.data.data[i]);
      }
      setList(data);
    });
  }, [length]);
  return (
    <div className=" w-full h-screen relative  py-20">
      <div className="relative border-2 border-black h-96   w-96   text-center bg-purple mx-auto rounded-2xl ">
        <p className="text-3xl underline mb-2">TODO LIST</p>
        <hr></hr>
        <ul className="list-outside text-lg">
          {List.map((item, index) => (
            <li key={item._id}>
              <input
                type="checkbox"
                className="m-2"
                onChange={() => {
                  CrossOver(item._id, index);
                }}
              ></input>
              <p
                className="inline-block"
                style={{
                  textDecoration: checked[index] ? "line-through" : "none",
                }}
              >
                {item.name}
              </p>
              <button
                className=" m-2  p-1 hover:opacity-60 "
                type="submit"
                onClick={() => {
                  deleteItem(item);
                }}
              >
                <FaTrash size={15} />
              </button>
              <hr></hr>
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
              className="border-2 m-2 rounded-xl hover:bg-black hover:text-white p-1"
              onClick={addItem}
            >
              Add Item
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
