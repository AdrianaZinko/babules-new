import React, { useEffect, useState } from "react";
import axios from "axios"; 
import PostService from "../API/Service";
import { useForm } from "react-hook-form";
import { useFetching } from "../hooks/useFetching";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTransaction = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [category, setCategory] = useState([]); 
  const [transaction, setTransaction] = useState({
    category: "",
    description: "",
    type: "",
    price: 0,
    date: new Date(),
  });
  const clearInput = (e) => {
    e.preventDefault();
    setTransaction({category: "",
    description: "",
    type: "",
    price: 0,
    date: new Date()  });
  };
  const addTransaction = (e) => { 
    axios.post("http://localhost:5000/transactions/add", transaction);
    setTransaction({ category: "",
    description: "",
    type: "",
    price: 0,
    date: new Date() });
  };
  const [fetchPosts, postError] = useFetching(async () => {
    const response = await PostService.getCategory();
    setCategory(response);
  });
  useEffect(() => {
    fetchPosts();
  }, []);
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

              {category.map( (user)=> {
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
             {...register("description", { required: true })}
              value={transaction.description}
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
              className="form__input form__description"
              type="text"
              placeholder="Велозапчастини, аксесуари, ТО"
            />
          </label>
          {errors.description?.type === "required" && <div>Пусте поле</div>}
          <label className="form__label">
            <div className="form__text">Сума</div>
            <input
             {...register("price", { required: true })}
            
              value={transaction.price || ""}
              onChange={(e) =>
                setTransaction({ ...transaction, price: +e.target.value })
              }
              className="form__input form__price"
              type="number"
              placeholder="Введіть суму"
            />
          </label>
          {errors.price?.type === "required" && <div>Пусте поле</div>}

          <label className="form__label">
            <div className="form__text">Дата YYYY-MM-DD</div>

            <DatePicker
              dateFormat="yyyy-MM-dd"
              className="form__input form__description"
              placeholder="Велозапчастини, аксесуари, ТО"
              selected={transaction.date}
              onChange={(e) => setTransaction({ ...transaction, date: e })}
            />
          </label>
          <div className="form__controls">
            <button
              onClick={handleSubmit(addTransaction)}
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
export default AddTransaction;
