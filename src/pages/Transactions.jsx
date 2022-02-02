import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostService from "../API/Service";
import Loader from "../components/Loader/Loader";
import TransactionItem from "../components/TransactionItem";
import { useFetching } from "../hooks/useFetching";
import { useSortedPosts } from "../hooks/useFilter";

const Transactions = () => {
  const [transaction, setTransaction] = useState([]);
  const [sort, setSort] = useState("");
  const sortedPosts = useSortedPosts(transaction, sort);
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getTransaction();
    setTransaction(response);
  });
  const removePost = (deleteTransaction) => {
    setTransaction(transaction.filter((p) => p._id !== deleteTransaction._id));
    PostService.removeTransaction(deleteTransaction._id);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="section transactions">
      <h1 className="title transactions__title">Транзакції</h1>
      {postError && <h1>Error {postError}</h1>}
      <div className="transactions__inner inner">
        <select
          value={sort || "filter"}
          onChange={(e) => setSort(e.target.value)}
          name="type"
          id=""
          className="select transactions__select"
        >
          <option value="filter" disabled> 
            Фільтр 
          </option>

          <option key="category" value="category">
            Фільтр по категорії
          </option>
          <option key="price" value="price">
            Фільтр по сумі
          </option>
        </select>
        <ul className="transactions__list list">
          <li className="list__item  list__caption">
            <div className="list__text list__number">#</div>
            <div className="list__text list__name">Категорія</div>
            <div className="list__text list__type">Тип операції</div>
            <div className="list__text list__price">Сума</div>
            <div className="list__text list__date">Дата</div>
            <div className="list__text list__description">Опис</div>
            <div className="list__text list__controls">Управління</div>
          </li>

          {isPostLoading ? (
            <Loader />
          ) : sortedPosts.length ? (
            sortedPosts.map((transaction, index) => (
              <TransactionItem
                remove={removePost}
                number={index + 1}
                transaction={transaction}
                key={transaction._id}
              />
            ))
          ) : (
            <div>Нічого не знайдено</div>
          )}
        </ul>
      </div>
      <Link to="/add-transaction" className="button transactions__button">
        Додати нову транзакцію
      </Link>
    </section>
  );
};

export default Transactions;
