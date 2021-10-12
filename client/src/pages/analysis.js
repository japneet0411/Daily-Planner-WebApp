import React, { useEffect } from "react";
import axios from "axios";
const Analysis = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/weekday", { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
    axios
      .get("http://localhost:5000/avg", { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
  });
  return <div>hello</div>;
};

export default Analysis;
