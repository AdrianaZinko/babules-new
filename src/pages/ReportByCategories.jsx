import React, { useEffect } from "react";   
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import PostService from "../API/Service";
import { useFetching } from "../hooks/useFetching"; 
import { Chart } from "react-google-charts";
const options = {
  title: "Розподіл витрат за період", 
  colors:['#2f7ed8','#8bbc21',"#0d233a","#00233a",'#004411','#104511'],
  pieSliceText: "none",
  legend: { position: "labeled", labeledValueText: "none" },
  chartArea: { width: "80%", height: "80%" },


}; 
const ReportByCategories = (props) =>{ 
  const [info, setInfo] = useState([]);
  
  const [fetchPosts] = useFetching(async () => {
    const posts = await PostService.getTransaction();  
    const tempArray=[] 
    posts.forEach(item=>{ 
     if((new Date(item.date) >=d.state.dateStart)&&   (new Date(item.date) <=d.state.dateEnd))
      tempArray.push(item)
    })
    setInfo(tempArray);
  });
  useEffect(() => {
    fetchPosts();
  }, []); 
  const d= useLocation() 
  const objArr = info.map((item) => {
    return {id:item._id, category: item.category, price: item.price };
  });
  const output = objArr.reduce((accumulator, cur) => {
    let date = cur.category;
    let found = accumulator.find((elem) => elem.category === date);
    if (found) found.price += cur.price;
    else accumulator.push(cur);
    return accumulator;
  }, []); 
  const report = [];

  for (let value of Object.values(output)) {
   
    report.push([value.category, value.price]);
  } 
  report.unshift(["Категорія", "Сума"]);


    return ( 
      <section className="section report"> 
      <h1 className="title transactions__title">Звіт за період {d.state.dateStart.toISOString().slice(0, 10)} - {d.state.dateEnd.toISOString().slice(0, 10)}</h1>
      {report.length <= 1 ? (
        <div className="nothing">Нічого нема</div>
      ) :  <div className="report__box">
        <div className="report__inner inner"> 
          <ul className="report__list list">
            <li className="list__item  list__caption"> 
              <div className="list__text report-category__text list__name">Категорія</div> 
              <div className="list__text report-category__text list__price">Сума</div> 
            </li> 
            { 
              output.map(item=>{ 
                 return  <li key={item.id} className="list__item list__item-info"> 
                 <div className="list__text report-category__text list__name">{item.category}</div> 
                 <div className="list__text report-category__text list__price">{item.price}</div>  
               </li> 
              })
            }  
          </ul>
          <div className="report-category__sum">
            Всього: 
            {
              " "+output.reduce((acc,item)=>   acc+=item.price ,0)
            }
              грн.
            
          </div>
        </div>
       <div className="report__block">
       <div className="report__diagram">
        <Chart
      chartType="PieChart"
      data={report}
      options={options}
      className="chart"
      width={"700px"}
      height={"400px"}
    />
        </div>
       </div>
      </div>
}
    </section>
       
    )
}
export default ReportByCategories