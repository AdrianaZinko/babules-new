import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import PostService from "../API/Service";
import { useFetching } from "../hooks/useFetching";

const Report = () => {
  const [category, setCategory] = useState([]);
  const [report, setReport] = useState({
    dateStart: new Date(),
    dateEnd: new Date(),
    type: "",
    category: "",
  });
  const [fetchPosts, postError] = useFetching(async () => {
    const response = await PostService.getCategory();
    setCategory(response);
  });
  useEffect(() => {
    fetchPosts();
  }, []);
  const clearInputs = (e) => {
    e.preventDefault();
    setReport({
      dateStart: new Date(),
      dateEnd: new Date(),
      type: "",
      category: "",
    });
  };
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  function randomDate() {
    let date1 = new Date("2018-01-01").getTime();
    let date2 = new Date().getTime();
    return Math.random() * (date2 - date1) + date1;
  }

  const generate = (e) => {
    e.preventDefault();
    const typeOption = document.querySelectorAll(".option");
    setReport({
      dateStart: new Date(randomDate()),
      dateEnd: new Date(),
      category: category[getRandomInt(category.length)].name,
      type: typeOption[getRandomInt(typeOption.length)].value,
    });
  };

  return (
    <section className="section report">
      <h1 className="title report__title">Генератор звітів</h1>
      {postError && <h1>Error {postError}</h1>}
      <div className="report__inner inner">
        <form className="form" action="">
          <label className="form__label">
            <div className="form__text">Дата YYYY-MM-DD</div>
            <DatePicker
              className="form__input form__date "
              dateFormat="yyyy-MM-dd"
              placeholder="Дата транзакції"
              selected={report.dateStart}
              onChange={(e) => setReport({ ...report, dateStart: e })}
            />
          </label>
          <label className="form__label">
            <div className="form__text">Дата YYYY-MM-DD</div>
            <DatePicker
              className="form__input form__date "
              dateFormat="yyyy-MM-dd"
              placeholder="Дата транзакції"
              selected={report.dateEnd}
              onChange={(e) => setReport({ ...report, dateEnd: e })}
            />
          </label> 
          <label className="form__label">
            <div className="form__text">Тип операції</div>
            <select
              value={report.type || "all"}
              onChange={(e) => setReport({ ...report, type: e.target.value })}
              name="type"
              id="type"
              className="select "
            >
              <option value="all" disabled>
                Тип 
              </option>
              <option className="option" key="Витрати" value="Витрати">
                Витрати
              </option>
            </select>
          </label>
          <label className="form__label">
            <div className="form__text">Назва категорії</div>
            <select
              value={report.category || "category"}
              onChange={(e) =>
                setReport({ ...report, category: e.target.value })
              }
              name="category"
              id="category"
              className="select "
            >
              <option disabled value="category">
                Назва категорії
              </option>

              {category.map(function (user) {
                return (
                  <option key={user.name} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>
          <div className="form__controls">
            <button onClick={generate} className="btn-reset button form__button">
              Згенерувати
            </button>
            <button
              onClick={clearInputs}
              className="btn-reset button form__button"
            >
              Очистити
            </button>
            <Link
              to={"/report-by-cost"}
              state={report}
              className="btn-reset button form__button form__button--shedule "
            >
              Графік
            </Link>
            <Link
              to={"/report-by-categories"}
              state={report}
              className="button form__button form__button--date"
            >
              По датам
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Report;
