import React, { useEffect, useState } from "react";    
import { useFetching } from "./../hooks/useFetching"; 
import Loader from "./../components/Loader/Loader";
import { Link } from "react-router-dom"; 
import CategoryItem from "../components/CategoryItem";
import PostService from "../API/Service";
import { useSearched } from "../hooks/useFilter";

const Categories = () =>{
  const [searchQuery, setSearchQuery]=useState('')
  const [category,setCategory]=useState([])  
  const searchedCategories = useSearched(category, searchQuery); 

  const removePost=(categoryy)=>{ 
    setCategory(category.filter(p=>p._id!==categoryy._id)) 
      PostService.removeCategory(categoryy._id)
  }  
  const [fetchPosts,isPostLoading,postError]=useFetching(async()=>{
    const response= await PostService.getCategory()
    setCategory(response)  
 })  
useEffect(() => {  
  fetchPosts()
}, []);  
    return ( 
        <section className="section categories">
        <h1 className="title categories__title">Категорії витрат / доходів</h1>
        <div className="categories__inner inner">
          <input  value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}  type="text" className="categories__input" placeholder="Введіть перші літери назви категорії"/>
          {postError && <h1>Error {postError}</h1>}
          <ul className="transactions__list list"> 
            <li className="list__item  list__caption">
                <div className="list__text list__number">#</div>
                <div className="list__text list__name">Назва</div>
                <div className="list__text list__description">Опис</div>
                <div className="list__text list__controls">Управління</div>
              </li>  
              {
            isPostLoading
            ?<Loader/>
            : searchedCategories.length ?
               searchedCategories.map((category,index)=> <CategoryItem  remove={removePost}  number={index+1} category={category} key={category._id}/>)
                :<div>Нічого не знайдено</div>
              }    
            </ul> 
        </div>
        <Link  to="/add-category"   className=" button categories__button">Додати нову категорію</Link>
      </section>
    )
}
export default Categories