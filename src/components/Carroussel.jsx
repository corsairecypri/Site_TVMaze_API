import React, { useState, useEffect } from 'react'

import { useNavigate, useLocation } from "react-router-dom"

//Ces imports servent à utiliser le module React-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


//? Le module "moment" marche pour moi (même s'il est déprécié)

import moment from 'moment'




export default function Carroussel () {


    const location = useLocation();

    const navigate = useNavigate()


    const [episodesList, setEpisodesList] = useState();


    useEffect(() =>  {

        const date = Date();

        const formatedDate = moment(date).format('YYYY-MM-DD');
        

        try{
            fetch(`https://api.tvmaze.com/schedule/web?date=${formatedDate}&country=US`)
        
            .then(function(response) {
        
            return response.json();
          
            }).then(function(response) {
    


            //* Ici on utilise le setter et non un state

            setEpisodesList(response)
       
        })
    
        } catch (err) {
            console.log(err.message)
        }

    }, []);



    //  On utilise la fonction goToSeriesDetails pour le bouton qui redirige
    //  vers la série sélectionnée

    const goToSeriesDetails = (event, id) => {

        event.preventDefault();

        
        const idSeries = id;

        try {
            fetch(

              `https://api.tvmaze.com/shows/${idSeries}?embed[]=seasons&embed[]=episodes&embed[]=cast`

            )
            .then(function(response) {
      
              return response.json();
            
            }).then(function(response) {
  
                navigate("/series", { state: {seriesInfo: response }});
            })

        
        } catch (err) {
            console.log(err.message)
        }  
    }


    //On utilise la classe Carousel du module React-responsive-carousel


    //Dans les options du module, on choisit de créer un autoplay
    //avec un interval défini et un loop infini

    //L'option showIndicators={false} permet d'éviter d'afficher les "boules" de sélection d'image

    //L'option showStatus={false} permet d'éviter d'afficher le numéro des images

    //? Lien du tutoriel : https://www.youtube.com/watch?v=fjsJLcGWjcU 

   

    return (
        
        <div>

            <h2 className='h2Carroussel'>New episodes <br/> US catalogue</h2>

            <Carousel 
            className='componentCarousel'
            autoPlay interval={5000} infiniteLoop 
            showIndicators={false} showStatus={false}
            
            showArrows={true} showThumbs={false}>

                {episodesList?.map(episode => (

                    <div key={episode.id}>

                        <div className='divResultImage'>
                            <img className="carouselImage carouselImage2" src={episode._embedded.show.image.medium? episode._embedded.show.image.medium : "/images/image-not-found.jpg" } alt=""/>
                        </div>

                        {/* Il arrive parfois que le num de l'épisode soit inconnu. J'ai dû gérer cette éventualité */}

                        <div className='overlay'>
                            <h2 className='overlay_title'>  {episode.number? `Episode ${episode.number}`: "New episode"} Season {episode.season} of :</h2>
                            <p className='overlay_text'>{episode._embedded.show.name? episode._embedded.show.name : "" }</p>


                            <button className="buttonDetailsSeries" onClick={(e) => goToSeriesDetails(e, episode._embedded.show.id)}>Series info</button>
                        </div>
                    </div>
                ))}

            </Carousel>

        </div>
        
    )
}

