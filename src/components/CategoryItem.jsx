import React from "react";
import { Link } from 'react-router-dom';
import sprite from './../images/sprite.svg'

const CategoryItem = (props) =>{ 
    return ( 
        <li className="list__item list__item-info ">
        <div className="list__text list__number">{props.number}</div>
        <div className="list__text list__name">{props.category.name}</div>
        <div className="list__text list__description"> {props.category.description}</div> 
        <div className="list__text list__controls">
          <Link to={"/edit/"+props.category._id }className="list__btn  ">
            <svg >
              <use href={sprite + "#edit"}></use>
            </svg>
            </Link>
            <button onClick={()=>props.remove(props.category)}   className="list__btn btn-reset">
            <svg >
              <use href={sprite + "#delete"}></use>
            </svg>
            </button>
        </div>
      </li>
    )
}

export default CategoryItem