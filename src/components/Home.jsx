
/*React Icons peut être assez casse-pied, (surtout si ta loupe est dans la partie 2 de hi) */

import { HiMagnifyingGlass} from 'react-icons/hi2'


import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom"

import Carroussel from "../components/Carroussel"
import CarrousselInternational from "../components/CarrousselInternational"




export default function Home () {

    //Le state

    const [query, setQuery] = useState("");

    const navigate = useNavigate()

    const location = useLocation();

   
    //Le comportement

    useEffect(() => {
        goToResultsPage();
    }, []);



    //* S'il n'existe pas d'objet 'Favorites' dans le localStorage
    //* ce useEffect le crée

    useEffect(()  => {

      if (!localStorage.getItem('Favorites')) {

        localStorage.setItem('Favorites', "[]")
      }
        
    })
    
    

    const goToResultsPage = async (event) => {

        //1) On exécute d'abord la requête 
    
         event.preventDefault();


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


            navigate("./results", { state: {series: response }})

          })
    
        } catch (err) {
          console.log(err.message)
        }
     
    }



    const handleChange = (event) => {

      const valueAfterChange = event.target.value;
  
      console.log(valueAfterChange);
      setQuery(valueAfterChange);
  
    }



    //Le rendu

    return (
       

        <section className="mainPageSection">

            <p className="catchphrase">Dive into the endless world of entertainement: find your next favorites series with FilmFlow</p>


              <form className="formSearchMainPage" action="submit" onSubmit={goToResultsPage}>

                <input type="text" 
                className="searchMainPage"
                value={query}
                placeholder="Search a show..."
                onChange = {handleChange} /> 
                

                <button><HiMagnifyingGlass class="glass"/> </button>

                  
              </form>
              

            <Carroussel/>

            <CarrousselInternational/>
              


        </section>

        
    )

}





