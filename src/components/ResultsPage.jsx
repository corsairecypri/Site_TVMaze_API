import { useNavigate, useLocation } from "react-router-dom"

//La fonction parse du module html-react-parser
//permet de ne pas affcher le html de la réponse de l'API

import parse  from 'html-react-parser'

export default function ResultsPage () {

    //Le state


    //*useLocation permet de récupérer les infos venant d'un
    //*autre composant (où d'une autre "page" si vous préférez)

    const location = useLocation();

    const navigate = useNavigate()


    //Le comportement


    
    const goToSeriesDetails = (event, id) => {

        event.preventDefault();

        
        const idSeries = id;

        try {
            fetch(

                //*Pour pouvoir utiliser 2 "embed" (ou plus) dans la requête, il faut utiliser la 
                //*syntaxe des []
                //*(voir https://www.tvmaze.com/api#embedding)

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



    //Le rendu


    return (
        <div>


            <section className="resultsSection">

  
                    {

                        location.state.series.map((element)=> {

                            console.log(element.show)


                            return (

                                <div>

                                {/* //*On envoie un id pour que React sache quel objet on manipule */}

                                {/* (Je sais que ce n'ai pas la méthode optimale mais j'ai eu 
                                des difficultés à transformer mon code en composant (en raison
                                de la dépendance du code de l'API difficilement remplaçable)) */}


                                <div className='result' id={element.show.id}>


                                    {/* //Cette div réserve un emplacement à l'image et si elle est trop grande
                                    //elle limite sa taille pour éviter d'altérer la présentation générale */}


                                    <div className='divResultImage divResultImage1'>
                                        <img className="resultImage"  src={element.show.image?.medium? element.show.image.medium : "/images/image-not-found.jpg" } alt="Not image found"/> <br/>
                                    </div>
                                    
                                    
                                    <div className='resultInfos'>

                                        <h2 className='seriesName'>{element.show.name}</h2> 


                                        {/* //Parfois le résumé n'est pas encore écrit. On utilise donc un ternaire pour gérer ce cas*/}

                                        <p className="seriesSummary">{element.show.summary? parse(element.show.summary): "No summary yet..."}</p>

                                        

                                        {/* //*Dans goToSeriesDetails, on envoie l'événement et element.show.id
                                        //*Element.show.id deviendra "id" (car "id" est le 2ème paramètre de goToSeriesDetails) */}

                                        <button className="buttonDetailsSeries" onClick={(e) => goToSeriesDetails(e, element.show.id)}>Discovering this series...</button>


                                    </div>
                                    
                             
                                </div>


                                </div>
                                
                            )

                            
                        })
                    }
                
                {/* //Comme location.state est un objet, React ne sait pas comment l'afficher
              //Pour remédier à cette situation, il faut utiliser JSON.stringify() 
              
              néanmoins il faut enlever JSON.stringify pour intéragir avec l'API car stringify
              transforme le JSON en string et car .map() a besoin d'un tableau pour fonctionner*/}

                {/* <p>
                    {JSON.stringify.location.state.series}
                </p> */}




                {/* <p>{location.pathname}</p> */}

                
            </section>

            

        </div>
    )
}

