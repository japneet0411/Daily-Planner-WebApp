import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";

const Analysis = () => {
  const [Day, setDay] = useState("");
  const [Time, setTime] = useState("");
  const [Tasks, setTasks] = useState("");
  const [arr, setArr] = useState([]);
  function sendDates(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/tasks", {
        date1: e.target.date1.value,
        date2: e.target.date2.value,
      })
      .then((data) => {
        console.log(data);
        setTasks("Tasks completed in this range is " + data.data.cnt);
      });
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const getDay = await axios.get("http://localhost:5000/weekday", {
          withCredentials: true,
        });

        const getTime = await axios.get("http://localhost:5000/avg", {
          withCredentials: true,
        });
        const recentTasks = await axios.get("http://localhost:5000/recent", {
          withCredentials: true,
        });

        setDay(getDay.data.Pday);
        setTime(getTime.data.diff);
        setArr(getDay.data.days);
        setTasks("Tasks completed in last 7 days is " + recentTasks.data.len);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col  md:flex-row h-screen">
        <div className="flex flex-col mt-10  text-2xl mont ">
          <p className="text-center">Most Productive on : {Day}</p>

          <Chart
            width={"600px"}
            height={"400px"}
            className="mont text-lg"
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["day", "number-of-Tasks"],
              ["Mon", arr[1]],
              ["Tues", arr[2]],
              ["Weds", arr[3]],
              ["Thurs", arr[4]],
              ["Fri", arr[5]],
              ["Sat", arr[6]],
              ["Sun", arr[0]],
            ]}
            options={{
              title: "Daily performance",

              chartArea: { width: "60%" },
              colors: ["#916BBF"],
              hAxis: {
                title: "Tasks done",
                minValue: 0,
              },
              vAxis: {
                title: "Days of week",
              },
            }}
          />
          <p className="text-center">
            Average time to complete a task: {Time}days{" "}
          </p>
        </div>

        <div className="bg-purple-100 md:ml-auto text-center">
          <p className="text-center text-xl m-5 ">Enter Range</p>
          <form onSubmit={sendDates} className="mt-20 ">
            <input
              className="m-2 p-2 purple text-white border-2 border-black"
              type="date"
              name="date1"
            />
            <input
              className="m-2 p-2 purple text-white border-2 border-black"
              type="date"
              name="date2"
            />
            <br />
            <button
              className="submit border-2 border-black purple px-3 py-1 mt-2 text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
          {Tasks}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
