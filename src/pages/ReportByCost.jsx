import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import PostService from "../API/Service";
import { useFetching } from "../hooks/useFetching";
import { Chart } from "react-google-charts";
const options2 = {
  title: "Розподіл витрат за період [по датам]",
  legend: {
    position: "none",
  },
  titlePosition: "none",
  vAxis: { minValue: 0 },
  chartArea: { width: "80%", height: "80%" },
};
const ReportByCost = () => {
  const [info, setInfo] = useState([]);

  const [fetchPosts] = useFetching(async () => {
    const posts = await PostService.getTransaction();
    const tempArray = [];
    posts.forEach((item) => {
      if (
        new Date(item.date) >= d.state.dateStart &&
        new Date(item.date) <= d.state.dateEnd
      )
        tempArray.push(item);
    });
    setInfo(tempArray);
  });
  useEffect(() => {
    fetchPosts();
  }, []);
  const d = useLocation();
  const objArr = info.map((item) => {
    return {
      id: item._id,
      category: item.category,
      price: item.price,
      date: new Date(item.date),
    };
  });
  const output = objArr.reduce((accumulator, cur) => {
    let date = cur.date;

    let found = accumulator.find(
      (elem) => elem.date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)
    );

    if (found) found.price += cur.price;
    else accumulator.push(cur);
    return accumulator;
  }, []);
  const report = [];
  output.sort(function (a, b) {
    var c = new Date(a.date);
    var d = new Date(b.date);
    return c - d;
  });
  for (let value of Object.values(output)) {
    report.push([value.date.toISOString().slice(0, 10), value.price]);
  }
  report.unshift(["Дата", "Сума"]);

  return (
    <section className="section report">
      <h1 className="title transactions__title visually-hidden">Звіт</h1>
      <h2 className="report__caption">Розподіл витрат за період [по датам]</h2>

      {report.length <= 1 ? (
        <div className="nothing">Нічого нема</div>
      ) : (
        <div className="report__box report-cost__box">
          <div className="report__legend">Values</div>
          <div className="report__diagram">
            <Chart
              chartType="AreaChart"
              width="100%"
              height="400px"
              data={report}
              options={options2}
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default ReportByCost;
