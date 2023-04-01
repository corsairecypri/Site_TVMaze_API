import React, { useState, useEffect } from 'react'

import { useNavigate, useLocation } from "react-router-dom"

//Ces imports servent à utiliser le module React-responsive-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



import moment from 'moment'


export default function Carroussel () {

    const location = useLocation();

    const navigate = useNavigate()


    const [internationalEpisodesList, setInternationalEpisodesList] = useState();


    useEffect(() =>  {

        const date = Date();

        const formatedDate = moment(date).format('YYYY-MM-DD');
        
        //On ommet volontairement le "&country=US" pour avoir des séries du monde entier

        try{
            fetch(`https://api.tvmaze.com/schedule/web?date=${formatedDate}`)
        
            .then(function(response) {
        
            return response.json();
          
            }).then(function(response) {
    

            console.log(response)

            //* Ici on utilise le setter et non un state

            setInternationalEpisodesList(response)
       
    
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


   /*J'ai mis un rythme plus rapide car 
        1) Ce carroussel présente plus de 90 séries
        
        2)  Certaines séries peuvent présenter 15 épisodes à la suite (coucou une série chinoise)*/

    return (
        
        <div>

            <h2 className='h2Carroussel'>New episodes <br/> International catalogue</h2>

            <Carousel 
            className='componentCarousel'
            autoPlay interval={3500} infiniteLoop 
            showIndicators={false} showStatus={false}
            
            showArrows={true} showThumbs={false}>

                {internationalEpisodesList?.map(episode => (

                    <div key={episode.id}>

                        <div className='divResultImage'>
                            <img className="carouselImage carouselImage2" src={episode._embedded.show.image?.medium? episode._embedded.show.image.medium : "/images/image-not-found.jpg" } alt=""/>
                        </div>

                        {/* Il arrive parfois que le num de l'épisode soit inconnu. J'ai dû gérer cette éventualité */}

                        <div className='overlay'>
                            <h2 className='overlay_title'>  {episode.number? `Episode ${episode.number}`: "New episode"} Season {episode.season} of :</h2>
                            <p className='overlay_text'>{episode._embedded.show.name? episode._embedded.show.name : "" }</p>

                            <p className='languageCarrousselInternational'>Language { episode._embedded.show.language? episode._embedded.show.language : "Not known" }</p>

                            <button className="buttonDetailsSeries" onClick={(e) => goToSeriesDetails(e, episode._embedded.show.id)}>Series info</button>
                        </div>
                    </div>
                ))}

            </Carousel>

        </div>
        
    )
}

