import React, { useState, useEffect } from 'react'

import { useNavigate, useLocation } from "react-router-dom"

import { HiHashtag } from 'react-icons/hi'

import parse from 'html-react-parser'

export default function InfosSeries ({seriesInfo}) {


    const [data, setData] = useState();


    const location = useLocation();

    const navigate = useNavigate()


    /* Dans le return un bouton permet d'aller vers la page Série */

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

    
    /* Le useEffect qui exécute la requête se trouve ici */

    useEffect(() =>  {
        
        try{
            fetch(seriesInfo)
        
            .then(function(response) {
        
            return response.json();
          
            }).then(function(response) {
    

            //* Ici on utilise le setter et non un state

            setData(response)  
    
        })
    
        } catch (err) {
            console.log(err.message)
        }

    }, []);



    //*On affiche le contenu du state data à chaque intération (voir le bas de la page Actor)

    
    return (
        <div className='divInfosSeriesComponent'>

            <div className='divImageSeriesComponent'>

                <p className='seriesLineComponent'>in the series <br/> <b className='seriesNameComponent'> {data?.name} </b> </p>

                <img className="resultImage actorImageSeriesComponent" src={data?.image.medium}/>
            </div>

            <div className='divDataSeriesComponent'>

                <h3 className='h3SeriesInfoComponent'>Series info</h3>

                <div class="genres genresComponent">

                    {data?.genres?.map((genre) => {
                        return (
                            <div className="genre"><HiHashtag class="hashtag"/> {genre}  </div>
                        );
                    })}

                </div>

                <p className='premiereSeriesComponent'> <b><u>Premiere </u></b> : {data?.premiered}</p>
                <p className='endSeriesComponent'> <b><u>End of series </u></b> : {data?.ended ? data.ended : "Still running"}</p>

                <p className='summarySeriesComponent'> <b><u> Summary</u></b> : {data?.summary ? parse(data.summary) : "No summary yet"}</p>

                <button className="buttonDetailsSeries buttonInfosSeriesComponent" onClick={(e) => goToSeriesDetails(e, data?.id)}>Series info</button>
            </div>

        </div>
    )


}