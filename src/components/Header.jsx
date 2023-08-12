
import { HiMagnifyingGlass} from 'react-icons/hi2'
import { BiBookmarkHeart } from 'react-icons/bi'


import { useState, useEffect } from 'react';

import { useNavigate, useLocation } from "react-router-dom"


export default function Header () {

    //Le state

    const [query, setQuery] = useState("");

    const navigate = useNavigate()

    const location = useLocation();

    

    //Le comportement

    useEffect(() => () => {
        goToResultsPage();
    }, []);


    //On utilise ce useEffect pour cacher la navbar uniquement sur la page d'accueil
    //Pour le rendre visible, il faut survoler la zone de la navbar


    useEffect(() => {

     const navbar = document.querySelector(".searchNavbar");

     const formNavbar = document.querySelector(".formSearchNavbar");

     
      if (location.pathname === "/") {

        navbar.style.visibility = "hidden";
        

        formNavbar.addEventListener('mouseover', function(e) {

          navbar.style.visibility = "visible"
        })



      } else {
        navbar.style.visibility = "visible";
      }
    })




    const goToResultsPage = async (event) => {

        //1) On exécute d'abord la requête 
    
         event.preventDefault();
    
        
        //Il faut copier le state "query" pour éviter que la "query"
        //soit "undefined"
    
        const queryCopy = [...query]
        

        if (queryCopy.length === 0) {
          alert("Please write something !!");
          return;
        }  
        
        

        try {
          fetch(
            `https://api.tvmaze.com/search/shows?q=${queryCopy}&limit=10`
          )
          .then(function(response) {
    
            return response.json();
          
          }).then(function(response) {


            //Il faut faire un console.log de response car les setters
            //sont asynchrones et mettent du temps à répondre

            // console.log(response);

            //2) Puis on réalise la redirection
    
          /*On peut ajouter des options à useNavigate en transférant
          un state stockant le contenu de la recherche */
    

            navigate("./results", { state: {series: response }})

          })
    
        } catch (err) {
          console.log(err.message)
        }

           
    }

    //Cette fonction sert pour la redirection du lien du logo

    const goToMainPage = () => {
        navigate("/")
    }

    const goToFavorites = () => {
      navigate("/favorites")
    }



    
    const handleChange = (event) => {

        const valueAfterChange = event.target.value;
    
        console.log(valueAfterChange);
        setQuery(valueAfterChange);
    }
    
    {/* //Le logo permet de revenir sur la homepage */}

    return (
        <header>
        
          <a className="logoLink" onClick={goToMainPage}>
            <img className="logo" src="/images/FilmFlowLogo.png" alt="logo"/>
          </a>


          <form className="formSearchNavbar"
          action="submit" onSubmit={goToResultsPage} >

            <input type="text" 
            className="searchNavbar"
            value={query}
            placeholder="Search a show..."
            onChange = {handleChange}  /> 


            <button><HiMagnifyingGlass className="glass"/> </button>

          </form>

          <a className="favoritesLink" onClick={goToFavorites}>
            
            <BiBookmarkHeart className="favorites"/>
          </a>

                
        </header>
    )
}



