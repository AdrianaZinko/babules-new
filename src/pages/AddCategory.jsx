import React, {  useState } from "react"; 
import PostService from "../API/Service";
import { useForm } from "react-hook-form";

const AddCategories = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const clearInput = (e) => {
    e.preventDefault();
    setCategory({ name: "", description: "" });
  };
  const addCategory = (e) => {
    PostService.addCategory(category);
    setCategory({ name: "", description: "" });
  };
  return (
    <section className="section add-categories">
      <h1 className="title add-categories__title">
        Реєстрація/Редагування інформації про категорію доходів / витрат
      </h1>
      <div className="add-categories__inner inner">
        <form className="form" action="">
          <label className="form__label">
            <div className="form__text">Назва категорії</div>
            <input
              value={category.name}
              {...register("ex", { required: true })}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="form__input form__name"
              type="text"
              placeholder="Велоаксесуари"
            />
          </label>
          {errors.ex?.type === "required" && <div>Пусте поле</div>}

          <label className="form__label">
            <div className="form__text">Короткий опис</div>
            <input
              value={category.description}
              {...register("example", { required: true })}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              className="form__input form__description"
              type="text"
              placeholder="Велозапчастини, аксесуари, ТО"
            />
          </label>
          {errors.example?.type === "required" && <div>Пусте поле</div>}
          <div className="form__controls">
            <button
              onClick={handleSubmit(addCategory)}
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
export default AddCategories;
