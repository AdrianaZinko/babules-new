import React from 'react'; 
import Header from "./components/Header"; 
import AppRouter from "./components/AppRouter";
import './styles/normalize.css'
import './styles/App.css'


function App() { 
  return (
    <div className="App">  
      <Header/>
    <main className="main">
      <div className="container">  
  <AppRouter/>
        
  </div>
  </main>
 </div>
  );
}

export default App;
