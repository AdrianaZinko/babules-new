import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/Service";
import { useFetching } from "../hooks/useFetching";

const CategoryId = () => {
  const params = useParams();

  const [category, setCategory] = useState({ name: "", description: "" });

  const [fetchPosts, postError] = useFetching(async () => {
    const response = await PostService.getCategoryById(params.id);
    setCategory(response);
  });

  useEffect(() => {
    fetchPosts();
  }, []);
  const clearInput = (e) => {
    e.preventDefault();
    setCategory({ name: "", description: "" });
  };
  const editCategory = (e) => {
    e.preventDefault();
    PostService.updateCategory(category, params.id);
    window.location = "/categories";
  };
  return (
    <section className="section add-categories">
      <h1 className="title add-categories__title">
        Реєстрація/Редагування інформації про категорію доходів / витрат
      </h1>
      {postError && <h1>Error {postError}</h1>}
      <div className="add-categories__inner inner">
        <form className="form" action="">
          <label className="form__label">
            <div className="form__text">Назва категорії</div>

            <input
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="form__input form__name"
              type="text"
              placeholder="Велоаксесуари"
            />
          </label>
          <label className="form__label">
            <div className="form__text">Короткий опис</div>
            <input
              value={category.description}
              onChange={(e) =>
                setCategory({ ...category, description: e.target.value })
              }
              className="form__input form__description"
              type="text"
              placeholder="Велозапчастини, аксесуари, ТО"
            />
          </label>

          <div className="form__controls">
            <button
              onClick={editCategory}
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

export default CategoryId;
