import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/Service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFetching } from "../hooks/useFetching";

const TransactionId = () => {
  const params = useParams();

  const [transaction, setTransaction] = useState({
    category: "",
    description: "",
    type: "",
    price: 0,
    date: new Date(),
  });

  const [category, setCategory] = useState([]);

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await PostService.getCategory();
    setCategory(response);
    const response2 = await await PostService.getTransactionById(params.id);
    setTransaction(response2);
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const clearInput = (e) => {
    e.preventDefault();
    setTransaction({
      category: "",
      description: "",
      type: "",
      price: 0,
      date: new Date(),
    });
  };

  const editTransaction = (e) => {
    e.preventDefault();
    PostService.updateTransaction(transaction, params.id);
    window.location = "/";
  };

  return (
    <section className="section add-transactions">
      <h1 className="title add-transactions__title">
        Реєстрація/Редагування інформації про транзакції
      </h1>
      {postError && <h1>Error {postError}</h1>}
      <div className="add-transactions__inner inner">
        <form className="form" action="">
          <label className="form__label">
            <div className="form__text">Назва категорії</div>
            <select
              value={transaction.category || "category"}
              onChange={(e) =>
                setTransaction({ ...transaction, category: e.target.value })
              }
              name="category"
              id="category"
              className="select "
            >
              <option value="category" disabled>
                Категорія
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
          <label className="form__label">
            <div className="form__text">Тип операції</div>
            <select
              value={transaction.type || "type"}
              onChange={(e) =>
                setTransaction({ ...transaction, type: e.target.value })
              }
              name="type"
              id="type"
              className="select "
            >
              <option value="type" disabled>
                Тип операції
              </option>
              <option key="Витрати" value="Витрати">
                Витрати
              </option>
            </select>
          </label>

          <label className="form__label">
            <div className="form__text">Короткий опис</div>
            <input
              value={transaction.description}
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
              className="form__input form__description"
              type="text"
              placeholder="Велозапчастини, аксесуари, ТО"
            />
          </label>
          <label className="form__label">
            <div className="form__text">Сума</div>
            <input
              value={transaction.price || ""}
              onChange={(e) =>
                setTransaction({ ...transaction, price: +e.target.value })
              }
              className="form__input form__price"
              type="text"
              placeholder="Введіть суму"
            />
          </label>
          <label className="form__label">
            <div className="form__text">Дата YYYY-MM-DD</div>

            <DatePicker
              dateFormat="yyyy-MM-dd"
              className="form__input form__description"
              placeholder="Велозапчастини, аксесуари, ТО"
              selected={new Date(transaction.date)}
              onChange={(e) => setTransaction({ ...transaction, date: e })}
            />
          </label>
          <div className="form__controls">
            <button
              onClick={editTransaction}
              className="btn-reset button form__button"
            >
              Зберегти
            </button>
            <button
              onClick={clearInput}
              className="btn-reset button form__button"
            >
              Очистити
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default TransactionId;
