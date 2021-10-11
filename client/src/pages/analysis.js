import React, { useEffect } from "react";
import axios from "axios";
const Analysis = () => {
  useEffect(() => {
    axios
      .get("http://localhost:5000/analyse", { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
  });
  return <div>hello</div>;
};

export default Analysis;
