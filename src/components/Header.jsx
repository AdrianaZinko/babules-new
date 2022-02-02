import React from "react";  
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const Header = () =>{  
const [isActive, setActive] = useState( false); 
 
const buttonActive=(value)=> {
    if(isActive===false){

        setActive(+value) 
    }else{
        setActive(false)
    } 

  } 

    return (  
    <header className="header">
        <div className="container">
            <div className="header__inner">
                <Link to="/" className="header__logo">Babules</Link>
               <nav className="nav header__nav">
                <ul className="nav__list ">
                    <li className="nav__item">
                        <button value={1} onClick={e => buttonActive(e.target.value)}  className="btn-reset nav__link nav__link--drop  ">Categories</button> 
                            <ul className={isActive===1 ? "active nav__list nav__list--dropdown dropdown-list" :"nav__list nav__list--dropdown dropdown-list"}> 
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/categories" className="dropdown-list__link">Categories</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/" className="dropdown-list__link">Transactions</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-category" className="dropdown-list__link">Add category</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-transaction" className="dropdown-list__link">Add transaction</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/report" className="dropdown-list__link">Report</Link></li>
                                
                            </ul> 
                    </li> 
                    <li className="nav__item">
                        <button value={2} onClick={e => buttonActive(e.target.value)}  className="btn-reset nav__link nav__link--drop  ">Activites</button> 
                            <ul className={isActive===2 ? "active nav__list nav__list--dropdown dropdown-list" :"nav__list nav__list--dropdown dropdown-list"}> 
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/categories" className="dropdown-list__link">Categories</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/" className="dropdown-list__link">Transactions</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-category" className="dropdown-list__link">Add category</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-transaction" className="dropdown-list__link">Add transaction</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/report" className="dropdown-list__link">Report</Link></li>
                                
                            </ul> 
                    </li>
                    <li className="nav__item">
                        <button value={3} onClick={e => buttonActive(e.target.value)}  className="btn-reset nav__link nav__link--drop  ">Help</button> 
                            <ul className={isActive===3 ? "active nav__list nav__list--dropdown dropdown-list" :"nav__list nav__list--dropdown dropdown-list"}> 
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/categories" className="dropdown-list__link">Categories</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/" className="dropdown-list__link">Transactions</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-category" className="dropdown-list__link">Add category</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-transaction" className="dropdown-list__link">Add transaction</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/report" className="dropdown-list__link">Report</Link></li>
                                
                            </ul> 
                    </li>
                    <li className="nav__item">
                        <button value={4} onClick={e => buttonActive(e.target.value)}  className="btn-reset nav__link nav__link--drop  ">admin</button> 
                            <ul className={isActive===4 ? "active nav__list nav__list--dropdown dropdown-list" :"nav__list nav__list--dropdown dropdown-list"}> 
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/categories" className="dropdown-list__link">Categories</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/" className="dropdown-list__link">Transactions</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-category" className="dropdown-list__link">Add category</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/add-transaction" className="dropdown-list__link">Add transaction</Link></li>
                                <li className="dropdown-list__item"><Link onClick={()=>setActive(false)} to="/report" className="dropdown-list__link">Report</Link></li>
                                
                            </ul> 
                    </li>  
                   
                </ul>
               </nav>
               <button   className="burger btn-reset" aria-label="Открыть меню">
                <span></span>
              </button>
            </div>
        </div>
    </header>  
    )
}

export default Header