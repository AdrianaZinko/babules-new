import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import sprite from './../images/sprite.svg'

const TransactionItem = (props) =>{
   const router=useNavigate(); 
    return ( 
        <li className="list__item list__item-info">
        <div className="list__text list__number">{props.number}</div>
        <div className="list__text list__name">{props.transaction.category}</div>
        <div className="list__text list__type">{props.transaction.type}</div>
        <div className="list__text list__price">{ props.transaction.price}</div>
        <div className="list__text list__date">{props.transaction.date.substring(0,10)}</div>
        <div className="list__text list__description">{props.transaction.description}</div>
        <div className="list__text list__controls">
        <Link to={"/edit-transaction/"+props.transaction._id }className="list__btn  ">
            <svg >
              <use href={sprite + "#edit"}></use>
            </svg>
            </Link>
            <button onClick={()=>props.remove(props.transaction)}   className="list__btn btn-reset">
            <svg >
              <use href={sprite + "#delete"}></use>
            </svg>
            </button> 
        </div>
      </li>
    )
}

export default TransactionItem