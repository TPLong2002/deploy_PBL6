import React, { useEffect, useState } from "react";
import { SaleDataMonth, SaleDataDay, SaleDataYear } from "./data.js";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { format } from "date-fns";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import TopProducts from "./TopProduct.js";

function Analysis() {
  const [selectChart, setSelectChart] = useState(1);
  const [year, setYear] = useState([2021, 2022]);
  if (!year.includes(Number(new Date().getFullYear()))) {
    setYear([...year, new Date().getFullYear()]);
  }
  const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const DAYS = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const [time, setTime] = useState({ year: 2023, month: 12 });

  const [startTime, setStartTime] = useState(new Date("2023-01-01T00:00:00"));
  const [endTime, setEndTime] = useState(new Date("2023-12-31T23:59:59"));

  const [chartMonth, setChartMonth] = useState({
    data: {
      labels: [],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd"],
          data: [],
        },
      ],
    },
    topProducts: [],
  });
  const [chartYear, setChartYear] = useState({
    data: {
      labels: [],
      datasets: [
        {
          label: "year",
          backgroundColor: ["#3e95cd"],
          data: [],
        },
      ],
    },
    topProducts: [],
  });
  const [chartDay, setChartDay] = useState({
    data: {
      labels: [],
      datasets: [
        {
          label: "DAYS",
          backgroundColor: ["#3e95cd"],
          data: [],
        },
      ],
    },
    topProducts: [],
  });
  useEffect(() => {
    SaleDataMonth(
      format(new Date(`${time.year}-01-01T00:00:00`), "yyyy-MM-dd'T'HH:mm:ss"),
      format(new Date(`${time.year}-12-31T23:59:59`), "yyyy-MM-dd'T'HH:mm:ss"),
      MONTHS
    ).then((res) => {
      setChartMonth(res);
    });

    SaleDataDay(
      format(
        new Date(
          `${time.year}-${
            time.month < 10 ? "0" + time.month : time.month
          }-01T00:00:00`
        ),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      format(
        new Date(
          `${time.year}-${
            time.month < 10 ? "0" + time.month : time.month
          }-31T23:59:59`
        ),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      DAYS
    ).then((res) => {
      setChartDay(res);
    });
    SaleDataYear(
      format(new Date(`${year[0]}-01-01T00:00:00`), "yyyy-MM-dd'T'HH:mm:ss"),
      format(
        new Date(`${year.slice(-1)}-12-31T23:59:59`),
        "yyyy-MM-dd'T'HH:mm:ss"
      ),
      year
    ).then((res) => {
      setChartYear(res);
    });
  }, [time, year]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTime({ ...time, [name]: value });
  };
  return (
    <div className="overflow-y-auto scrollbar-hide max-h-[45rem]">
      <div className="text-2xl font-bold">Sales Dashboard</div>
      <div className="flex space-x-1 items-center">
        <div className="w-[9rem] flex items-center space-x-1">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Năm
          </label>
          <select
            name="year"
            id="year"
            value={time.year}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {year.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[9rem] flex items-center space-x-1">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Tháng
          </label>
          <select
            name="month"
            id="month"
            value={time.month}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {MONTHS.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setSelectChart(1)}
          className={`ml-2  text-white px-2 py-2 rounded ${
            selectChart === 1 ? "bg-red-500" : "bg-blue-500"
          } transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 duration-300`}
        >
          Năm
        </button>
        <button
          onClick={() => setSelectChart(2)}
          className={`ml-2  text-white px-2 py-2 rounded ${
            selectChart === 2 ? "bg-red-500" : "bg-blue-500"
          } transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 duration-300`}
        >
          Tháng
        </button>
        <button
          onClick={() => setSelectChart(3)}
          className={`ml-2  text-white px-2 py-2 rounded ${
            selectChart === 3 ? "bg-red-500" : "bg-blue-500"
          } transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-105 duration-300`}
        >
          Ngày
        </button>
        <div className="w-1/2 ">
          <DateTimePicker value={startTime} onChange={setStartTime} />
          <DateTimePicker value={endTime} onChange={setEndTime} />
          <button className="ml-2 bg-blue-500 text-white px-2 py-2 rounded transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300">
            Tìm
          </button>
        </div>
      </div>

      <div className="h-[45rem] flex flex-col mt-2">
        <div className="flex space-x-2">
          <div className="w-2/3">
            {selectChart === 1 && (
              <Bar
                className="border-2 rounded-md shadow-md"
                data={chartYear.data}
              />
            )}

            {selectChart === 2 && (
              <Bar
                className="border-2 rounded-md shadow-md"
                data={chartMonth.data}
              />
            )}

            {selectChart === 3 && (
              <Bar
                className="border-2 rounded-md shadow-md"
                data={chartDay.data}
              />
            )}
            {selectChart === 1 && chartMonth.topProducts.length > 0 && (
              <TopProducts products={chartYear.topProducts} />
            )}
            {selectChart === 2 && chartMonth.topProducts.length > 0 && (
              <TopProducts products={chartMonth.topProducts} />
            )}
            {selectChart === 3 && chartMonth.topProducts.length > 0 && (
              <TopProducts products={chartDay.topProducts} />
            )}
          </div>
          <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
