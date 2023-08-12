
import { useNavigate, useLocation } from "react-router-dom"

import { HiHashtag } from 'react-icons/hi'
import { AiOutlineStar } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { SlArrowDown } from 'react-icons/sl'

import { useState } from 'react';


import parse from 'html-react-parser'


export default function Series () {

    //Le state

    const location = useLocation();

    const navigate = useNavigate()



    //*Comme on ne peut pas utiliser la méthode des toggle checkbox id
    //*(car les labels et les checkbox étaient trop éloignés)
    //*on doit créer des states booléens que l'on utilise dans des fonctions

    const [isCastingShowed, setIsCastingShowed ]= useState(false);
    
    const [areSeasonsShowed, setAreSeasonsShowed ]= useState(false);



    //Le comportement


    const goToActorPage = (event, id) => {

        event.preventDefault();

        
        const idActor = id;

        try {
            fetch(
    
              `https://api.tvmaze.com/people/${idActor}?embed=castcredits`

            )
            .then(function(response) {
      
              return response.json();
            
            }).then(function(response) {
  
                navigate("/actor", { state: {actorInfo: response }});
            })

        } catch (err) {
            console.log(err.message)
        } 
    }


    /*
        Pour afficher les sections du Casting et des Saisons, on utilise ces fonctions
        Leur affichage est mutuellement exclusif.
        On utilise ici les setter setIsCastingShowed et setAreSeasonsShowed
    */ 


    function showCasting() {

        const casting = document.querySelector(".sectionCasting");

        const seasons = document.querySelector(".sectionSeasons");

        setAreSeasonsShowed(false)
        seasons.style.display = "none";
        

        setIsCastingShowed((current) => !current)

        (isCastingShowed? casting.style.display = "block" : casting.style.display = "none") 
    }

    function showSeasons() {

        const seasons = document.querySelector(".sectionSeasons");

        const casting = document.querySelector(".sectionCasting");

        setIsCastingShowed(false)
        casting.style.display = "none"
        

        setAreSeasonsShowed((current) => !current)

        (areSeasonsShowed ? seasons.style.display = "block" : seasons.style.display = "none") 
    }


    

    function addFavorite(id, seriesName) {

        //* On stocke dans une variable l'item 'Favorites' du local storage
        //* (Cet item est d'abord de type str)

        const favoritesString = localStorage.getItem('Favorites');

        //* Puis on le parse avec JSON.parse

        const favoritesList = JSON.parse(favoritesString)


        //* Pour éviter les doublons (vérifier qu'un favori n'est pas
        //* déjà présent dans la liste des favoris), il faut
        //* utiliser indexOf()

        /* (et non une structure "if id in list") */

        // Voir cette page StackOverflow pour l'explication
        // https://stackoverflow.com/questions/5864408/javascript-is-in-array


        if(favoritesList.indexOf(id) !== -1 )
        {  
            alert("Vous avez déjà cette série dans vos favoris");
            return;
        }

        //* Ensuite on push l'id, on modifie l'item 'Favorites' pour qu'il
        //* contienne la nouvelle valeur de la liste (qu'on transforme en str)

        // Puis on envoie un message d'information

        favoritesList.push(id)

        localStorage.setItem('Favorites', JSON.stringify(favoritesList))

        alert(`Série ${seriesName} ajoutée`);
    }


    //*Ce tutoriel est utile pour comprendre les props
    //Voir ce tutoriel https://fr.reactjs.org/docs/conditional-rendering.html


    //Le rendu

    return (

        <div> 
            

            {/* //* Quand on manipule un objet seul on n'utilise pas .map(),
            //*on affiche directement les infos  */}

            {/* J'ai globalement gardé des classes similaires à celles de la classe ResultPage
            pour des raisons de cohérence esthétique avec CSS */}

                
            <section className="resultsSection">


                <div className='result result2' id={location.state.seriesInfo.id}>
                        
                        
                    <div className='divResultImage divResultImage2'>

                        <p class="titreSeries">{ location.state.seriesInfo.name }</p>

                        <div className='divResultImage'>
                            <img className="resultImage ImageRecadrage"  src={location.state.seriesInfo.image.medium ? location.state.seriesInfo.image.medium : "/images/image-not-found.jpg"} /> <br/>
                        </div>

                        <p className="ratings"> <b>Ratings:</b> <u className="note">{ location.state.seriesInfo.rating.average? location.state.seriesInfo.rating.average + "/10" : "No rates yet"  } </u> <AiOutlineStar class="starRatings"/></p>
                    </div>

                    <div className='resultInfos'>

                        <div class="genres">

                            {location.state.seriesInfo.genres.map((genre) => {
                                return (
                                    <div className="genre"><HiHashtag class="hashtag"/> {genre}  </div>
                                );
                            })}

                        </div>



                        {/* //* Ne pas hésiter à mettre des ? car dans la partie network le pays n'est pas toujours renseigné */}


                        <p className="countryOfOrigine"> Origine : {location.state.seriesInfo.network?.country.name ? location.state.seriesInfo.network?.country.name : "No information"}</p> 

                        <p className="firstDiffusion">Original diffusion : {location.state.seriesInfo.status ? location.state.seriesInfo.status : "Still running"}</p>

                        <p className="firstEpisode"> Date of first episode : {location.state.seriesInfo.premiered? location.state.seriesInfo.premiered : "Not found" }</p>

                        <p className="lastEpisode">Date of last episode : {location.state.seriesInfo.ended? location.state.seriesInfo.ended : "Still running"}</p>  


                        <p className="seriesSummary">{location.state.seriesInfo.summary? parse(location.state.seriesInfo.summary) : "No summary yet..."}</p>
                    
                        <div className="FavoritesButtonToRight">

                            <button className="addFavoritesButton" 
                            onClick={(e) => addFavorite(location.state.seriesInfo.id, location.state.seriesInfo.name)}>

                                Add to favorites <FaRegHeart className="heart"/>

                            </button>

                        </div>
                    </div>

                    
                </div>  
               
            </section>



            <div className="choixInfos">
                           
                <button className="buttonCasting" onClick={showCasting}>Casting</button>

                {/* J'ai donné la balise button au séparateur pour que
                justify-content space-between fonctionne également sur lui */}

                <button className="separator">/</button>


                <button className="buttonSeasons" onClick={showSeasons}>Seasons</button>
            </div>

    

            <section className="gridSection sectionCasting">

                <h2 className="h2Casting">The cast of the series</h2>


                <div className='actorList'>
 
                {

                    location.state.seriesInfo._embedded?.cast?.map((actor) => {

                        return (
                            
                                <div className="actorFichette"  id={actor.person.id}>

                                    <p className="actorName"><b><u>{actor.person.name}</u></b></p>

                                    <div className='divResultImage'>
                                        <img className="actorImage" src={actor.person.image?.medium ? actor.person.image.medium : "/images/image-not-found.jpg" }></img>
                                    </div>

                                    <p className="actorRole">Playing the role of <br/> <u>{actor.character?.name ? actor.character.name : "Character unknown"}</u> </p>

                                    <div className="divButtonActor">
                                        <button className="buttonActor" onClick={(e) => goToActorPage(e, actor.person.id)}>Get info</button>
                                    </div>

                                </div>
                                 
                        )
                        
                    })

                }

                </div>

            </section>



            <section className="gridSection sectionSeasons">

                <h2 className="h2Seasons">The episodes of the series</h2>

                {/* //*On affiche d'abord les saisons */}

                {
                    /*Comme on ne peut pas utiliser la méthode classique toggle id,
                    on est obligé d'auto-incrémenter l'id avec l'index de la méthode map */
                    
                    location.state.seriesInfo._embedded?.seasons.map((season, index) => {


                        return (

                            <div className="resultSeasons">
                                

                                <div className='divResultImage divResultImage3'>
                                    
                                    <img className="resultImage" src={season.image?.medium ? season.image.medium : "/images/image-not-found.jpg"} />
                                
                                </div>


                                <div className="menuDeroulant">  

                                    {/* Ce qui a provoqué le bug, c'est la présence simultanée d'un id avec l'index du .map()
                                    et du season.number donnant le même chiffre pour l'id d'une autre balise */}

                                    <label for={index} className="toggle"><div className="boutonMenuDeroulant">

                                        <h2 className="seasonNumber">Season {season.number}</h2> <SlArrowDown className="flecheMenuDeroulant"/> 
                                    </div></label>

                                    <input type="checkbox" id={index} className="toggle"/>

                                    {/* //*Puis on affiche les épisodes */}

                                    <div className='resultInfos InfosSeason'>


                                        {season.summary?  <div><h2 className="h2SummarySeason">Summary </h2> <p className="SummarySeason">{parse(season.summary)}</p></div> : "" }

                                        <h2 className="h2ListEpisodes">Episode list</h2>

                                        {
   
                                            location.state.seriesInfo._embedded.episodes.map((episode) => {
                                                if (episode.season === season.number) {
                                                    return (
                                                        <div>
                                                            {/* //J'avais besoin d'une ), j'ai donc cherché le code ISO sur Internet */}

                                                            <p className="episodeTitle"> {episode.number} &#41; {episode.name}</p>


                                                        </div>
                                                    )
                                                    
                                                }
    
                                            })
                                        }

                                    </div> 
 
                                </div>

                            </div>
                        )
                          
                    })

                }

            </section>

        </div>
    )
}



