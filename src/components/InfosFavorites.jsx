
import React, { useState, useEffect } from 'react'

import { HiHashtag } from 'react-icons/hi'
import { AiOutlineStar } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'


import parse from 'html-react-parser'

export default function InfosFavorites ({favoriteId}) {

    const [data, setData] = useState();



    useEffect(() =>  {

        const id = favoriteId;
        
        try{
            fetch(
                `https://api.tvmaze.com/shows/${id}`
            )
        
            .then(function(response) {
        
            return response.json();
          
            }).then(function(response) {
    

            setData(response)
    
        })
    
        } catch (err) {
            console.log(err.message)
        }

    }, []);

      

    function removeFavorite(id, seriesName) {

        //* On choisit l'item 'Favorites' et on le parse
        //* directement (car c'est une liste)

        const favoritesString = localStorage.getItem('Favorites');

        const favoritesList = JSON.parse(favoritesString)

        //* Pour la suppression on récupère l'index de
        //* l'objet à supprimer
        //* Puis on utilise splice() sur favoritesList

        const index = favoritesList.indexOf(id)

        favoritesList.splice(index, 1)


        //* On modifie la valeur de localStorage pour que sa valeur devienne
        //* le nouveau contenu de favoritesList (et on doit la stringifier)

        //*  Enfin cette ligne permet de recharger la page

        localStorage.setItem('Favorites', JSON.stringify(favoritesList))

        alert(`Série ${seriesName} supprimée`);

        window.location.reload(true)
    }



    //* J'ai choisi l'esthétique de la page Series, j'ai juste remplacé
    //* les location.state.seriesInfo par data

    
    return (
        <div className='result result2 favoritesMarginTop'>

             <div className='divResultImage divResultImage2'>

                <p class="titreSeries">{ data?.name }</p>

                <div className='divResultImage'>
                    <img className="resultImage ImageRecadrage"  src={data?.image?.medium ? data.image.medium : "/images/image-not-found.jpg"} /> <br/>
                </div>

                <p className="ratings"> <b>Ratings:</b> <u className="note">{ data?.rating?.average? data.rating.average + "/10" : "No rates yet"  } </u> <AiOutlineStar class="starRatings"/></p>

            </div>


               <div className='resultInfos'>

                    <div class="genres">

                        {data?.genres?.map((genre) => {
                            return (
                            <div className="genre"><HiHashtag class="hashtag"/> {genre}  </div>
                            );
                        })}

                    </div>

                    <p className="countryOfOrigine"> Origine : {data?.network?.country?.name ? data.network.country.name : "No information"}</p> 

                    <p className="firstDiffusion">Original diffusion : {data?.status ? data.status : "Still running"}</p>

                    <p className="firstEpisode"> Date of first episode : {data?.premiered? data.premiered : "Not found" }</p>

                    <p className="lastEpisode">Date of last episode : {data?.ended? data.ended : "Still running"}</p>  



                    <p className="seriesSummary">{data?.summary? parse(data.summary) : "No summary yet..."}</p>


                    <div className="FavoritesButtonToRight">

                        <button className="removeFavoritesButton" 
                        onClick={(e) => removeFavorite(data.id, data.name)}>

                        Remove to favorites <FaRegHeart className="heart"/>

                        </button>

                    </div>
              </div>
            
        </div>


        
    )
}