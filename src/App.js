
import './App.css';
import './index.css';


//J'ai créé un router pour gérer les différentes
//"pages" du projet

/*Il faut mettre tous les imports avant la 1ère variable
sinon on a l'erreur "Reorder at top/first" */ 

/*Aujourd'hui on utilise "Routes" à la place de "Switch" */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



//Quand on utilise un composant ("composant-page" ou composant classique)
//avec un "export default", il ne faut pas mettre les {}

import Home  from "./components/Home";
import Header from './components/Header';
import ResultsPage  from "./components/ResultsPage";
import Series from "./components/Series";
import Actor from "./components/Actor";
import Footer from "./components/Footer"
import Favorites from './components/Favorites';


//Pour les images, il faut commencer par /images/ car React cherche dans le dossier "Public"

//?Aussi, dû à un changement de syntaxe, il faut écrire "element" et non plus "composant"


function App() {


  //Le rendu du Routeur

  //Il faut mettre un composant Header au dessus des routes car il doit s'afficher au dessus de toutes les pages du site

  return (

    <div className="App">
    
      <Router>
        
        <Header />
        <Routes>
          <Route path="/" exact element={ <Home/>}/>
          <Route path="/results" exact element={<ResultsPage/>}/>
          <Route path="/series" exact element={<Series/>}/>
          <Route path="/actor" exact element={<Actor/>}/>
          <Route path="/favorites" exact element={<Favorites/>}/>
        </Routes>
        <Footer/>
        
      </Router>

    </div>
  );
}

//Ce tuto Youtube a été très utile pour construire le routeur.
//Il faut juste remplacer "Switch" par "Routes"

//https://www.youtube.com/watch?v=ZfQs-OJScOM

export default App;
