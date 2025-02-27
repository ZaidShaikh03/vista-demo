import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import LinchartCustom from "./LineChart";
const data = [
  {
    name: "python",
    student: 3,
    price: 12000,
    fees: 10000,
  },
  {
    name: "Javascript",
    student: 4,
    price: 14000,
    fees: 20000,
  },
  {
    name: "Java",
    student: 6,
    price: 20000,
    fees: 30000,
  },
  {
    name: "React",
    student: 8,
    price: 12000,
    fees: 15000,
  },
];
const Timelapse = () => {
  return (
    <div>
      {/* <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={data} width={500} height={300}>
          <XAxis dataKey="name" />
          <Line dataKey="fees" />
        </LineChart>
      </ResponsiveContainer> */}
      <LinchartCustom />
    </div>
  );
};

export default Timelapse;
